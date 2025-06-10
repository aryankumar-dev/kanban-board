import { Task } from "../models/task.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { Project } from "../models/project.models.js";
import { SubTask } from "../models/subtask.models.js"
import { ProjectMember } from "../models/projectmember.models.js";


const getTasks = asyncHandler(async (req, res) => {
  const { projectid } = req.params;
  const taskexits = await Project.findById(projectid);
  if (!taskexits) {
    return res.status(400).json(new ApiResponse(400, { message: "task not exists" }));
  }

  const alltaskdata = await Task.find({ project: projectid });
  return res.status(201).json(new ApiResponse(201, { message: " all task data getted successfully", alltaskdata }));
});


const getTaskById = asyncHandler(async (req, res) => {
  const { taskid } = req.params;
  const taskexits = await Task.findById(taskid);
  if (!taskexits) {
    return res.status(400).json(new ApiResponse(400, { message: "task not exists" }));
  }

  const taskdata = await Task.findById(taskid);
  return res.status(201).json(new ApiResponse(201, { message: " task data getted successfully", taskdata }));
});

// create task
const createTask = asyncHandler(async (req, res) => {
  console.log("task controller");
  const { projectid } = req.params;
  const projectexits = await Project.findById(projectid);

  if (!projectexits) {
    return res.status(400).json(new ApiResponse(400, { message: "project not exists" }));
  }

  const userId = projectexits.createdBy;
  const { title, status } = req.body;


  if (!title  || !status) {
    return res.status(400).json(new ApiResponse(400, { message: "Missing required fields" }));
  }


  const creatednote = await Task.create({
    title,
    
    project: projectid,
   
    assignedBy: userId,
    status
  });


  return res.status(201).json(new ApiResponse(201, { message: " Note created successfully", creatednote }));

});

// update task
const updateTask = asyncHandler(async (req, res) => {
  const { taskid } = req.params;
  const taskexits = await Task.findById(taskid);
  if (!taskexits) {
    return res.status(400).json(new ApiResponse(400, { message: "task not exists" }));
  }
  const userId = taskexits.createdBy;
  const { title, description, assignedTo, status, attachments } = req.body;
  const isuservalid = await ProjectMember.findById(assignedTo);

  if (!title || !description || !status || isuservalid) {
    return res.status(400).json(new ApiResponse(400, { message: "Missing required fields" }));
  }

  const newtaskdata = await Task.findByIdAndUpdate(taskid, { title, description, assignedTo: userId, status, attachments }, { new: true });
  return res.status(201).json(new ApiResponse(201, { message: " task data getted successfully", newtaskdata }));
});

// delete task
const deleteTask = asyncHandler(async (req, res) => {
  const { taskid } = req.params;
  const taskexits = await Task.findById(taskid);
  if (!taskexits) {
    return res.status(400).json(new ApiResponse(400, { message: "task not exists" }));
  }

  const taskdata = await Task.findByIdAndDelete(taskid);

  return res.status(201).json(new ApiResponse(201, { message: " task data deleted" }));

});

// create subtask
const createSubTask = asyncHandler(async (req, res) => {
  const { taskid } = req.params;
  const taskexits = await Task.findById(taskid);
  if (!taskexits) {
    return res.status(400).json(new ApiResponse(400, { message: "task not exists" }));
  }
  const { title, isCompleted, createdBy } = req.body;
  const createdbyrightuser = await ProjectMember.findOne({ user: createdBy });



  if (!createdbyrightuser) {
    return res.status(400).json(new ApiResponse(400, { message: "Missing required fields" }));
  }




  const createsubtask = await SubTask.create({
    title,

    task: taskid,
    isCompleted,
    createdBy,

  });

  return res.status(201).json(new ApiResponse(201, { message: " subtask created successfully", createsubtask }));
});

// update subtask
const updateSubTask = asyncHandler(async (req, res) => {
  const { subtaskid } = req.params;

  if (!subtaskid) {
    return res.status(400).json(new ApiResponse(400, { message: "sub task not exists" }));
  }



  const { title, isCompleted, createdBy } = req.body;
  const createdbyrightuser = await ProjectMember.findOne({ user: createdBy });



  if (!createdbyrightuser) {
    return res.status(400).json(new ApiResponse(400, { message: "Missing required fields" }));
  }

  const newsubtaskdata = await SubTask.findByIdAndUpdate(subtaskid, { title, isCompleted, createdBy }, { new: true });


  return res.status(201).json(new ApiResponse(201, { message: " task data getted successfully", newsubtaskdata }));

});

// delete subtask
const deleteSubTask = asyncHandler(async (req, res) => {
  const { subtaskid } = req.params;

  if (!subtaskid) {
    return res.status(400).json(new ApiResponse(400, { message: "sub task not exists" }));
  }


  const subtaskdata = await SubTask.findByIdAndDelete(subtaskid);

  return res.status(201).json(new ApiResponse(201, { message: " task data deleted" }, subtaskdata));


});

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};