import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
const getProjects = async (req, res) => {
  const { name, description, createdBy } = req.body;
};

const getProjectById = async (req, res) => {

  try {
    const { id } = req.params;

    const product = await Project.findById(id);
    if (!product) {
      return res.status(404).json(new ApiResponse(404, { message: 'Project not found' }));
    }
    return res.status(200).json(new ApiResponse(200, { message: 'Project fetched', data: product }));


  }
  catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json(new ApiResponse(500, { message: 'Internal server error' }));
  }





};

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user && req.user._id; // ✅ Get user from middleware
    console.log(req.user.username); // 👈 returns the logged-in user's username


    if (!createdBy) {

      return res.status(401).json(new ApiResponse(401, { message: "Unauthorized. User not found in request." }));

    }

    const newProject = await Project.create({
      name,
      description,
      createdBy, // ✅ Set required field
    });


    return res.status(201).json(new ApiResponse(401, { message: "Project created successfully" }));



  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json(new ApiResponse(401, { message: "Internal server error" }));
  }
};


const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    console.log('Updating project ID:', id);


    const updatedProject = await Project.findByIdAndUpdate(id, { name, description }, { new: true });


    if (!updatedProject) {
      return res.status(404).json(new ApiResponse(404, { message: 'Project not found' }));
    }

    return res.status(200).json(new ApiResponse(200, { message: 'Project is updated', data: updatedProject }));
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json(new ApiResponse(500, { message: 'Internal server error' }));
  }
};



const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Project.findById(id);
    if (!product) {
      return res.status(404).json(new ApiResponse(404, { message: 'Project not found' }));
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, { message: 'Project is deleted', data: product }));


  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json(new ApiResponse(500, { message: 'Internal server error' }));
  }
};

const getProjectMembers = async (req, res) => {
  // get project members
};

const addMemberToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, role } = req.body;

 

    if (!projectId || !userId) {
      return res.status(400).json({ message: "Project ID and User ID are required." });
    }

    const newMember = new ProjectMember({
      user: userId,
      project: projectId,
      role: role || UserRolesEnum.MEMBER,
    });

    await newMember.save();

    return res.status(201).json({ message: "Member added", data: newMember });
  } catch (error) {
    console.error("Error adding member:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteMember = async (req, res) => {
  // delete member from project
};

const updateMemberRole = async (req, res) => {
  // update member role
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
