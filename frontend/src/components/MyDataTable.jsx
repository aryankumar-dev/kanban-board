import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

function MyTable({refresh}) {
  const [projectMembers, setProjectMembers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const columns = [
    {
      name: 'Index',
      cell: (row, index) => index + 1,
      width: '70px',
    },
    {
      name: 'Admin Name',
      selector: row => row.fullNames || 'N/A',
      sortable: true,
    },
    {
      name: 'Project Name',
      selector: row => row.projectName || 'N/A',
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role || 'N/A',
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <button
          onClick={() => navigate(`/singleproject/${row.project}`)}
          className="btn btn-sm btn-primary"
        >
          View More
        </button>


      ),


      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
     {
    name: 'Delete',
    cell: row => (
      <button
       onClick={() => handleDelete(row.project)}

        className="btn btn-sm btn-danger"
      >
        Delete
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getCurrentUser`, {
          method: 'GET',
          credentials: 'include',
        });
        const userData = await userRes.json();

        if (userData.status && userData.userdata && userData.userdata._id) {
          const userId = userData.userdata._id;

          const projectRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getProjectMembersbyuserid/${userId}`, {
            method: 'GET',
            credentials: 'include',
          });
          const projectMembersData = await projectRes.json();

          if (projectMembersData.success && Array.isArray(projectMembersData.data)) {
            const membersWithNames = await Promise.all(
              projectMembersData.data.map(async (member) => {
                const userDetailRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getCurrentUserbyid/${member.user}`);
                const userDetailData = await userDetailRes.json();

                const projectDetailRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getProjectById/${member.project}`);
                const projectDetailData = await projectDetailRes.json();

                return {
                  ...member,
                  fullNames: userDetailData?.userdata?.fullName || 'Unknown User',
                  projectName: projectDetailData?.data?.data?.name || 'Unknown Project',
                };
              })
            );

            setProjectMembers(membersWithNames);
          } else {
            setError('No project members found.');
          }
        } else {
          setError('User not authenticated.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [refresh]);


  const handleDelete = async (projectId) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/deleteProject/${projectId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      setProjectMembers(prev => prev.filter(member => member.project !== projectId));
    } else {
      alert('Failed to delete project');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while deleting the project.');
  }
};


  if (error) return <div style={{ color: 'red' }}>{error}</div>;


  return (
    <DataTable
      title="Project Members"
      columns={columns}
      data={projectMembers}
      pagination
      highlightOnHover
      dense
    />
  );
}

export default MyTable;
