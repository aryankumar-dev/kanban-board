import React from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  { name: 'ID', selector: row => row.id, sortable: true },
  { name: 'Title', selector: row => row.title, sortable: true },
  { name: 'Year', selector: row => row.year, sortable: true, right: true },
];

const data = [
  { id: 1, title: 'Shawshank Redemption', year: 1994 },
  { id: 2, title: 'The Godfather', year: 1972 },
  { id: 3, title: 'Dark Knight', year: 2008 },
];

function MyTable() {
  return (
    <DataTable
      title="Movies"
      columns={columns}
      data={data}
      pagination
      highlightOnHover
    />
  );
}

export default MyTable;
