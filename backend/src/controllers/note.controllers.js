// boilderplate code
import { asyncHandler } from "../utils/async-handler.js";
import { ProjectNote } from "../models/note.models.js";
import { Project } from "../models/project.models.js";
import { ApiResponse } from "../utils/api-response.js";
const getNotes = asyncHandler(async (req, res) => {
  const { projectid } = req.params;
  const projectexits = await Project.findById(projectid);

  if (!projectexits) {
    return res.status(400).json(new ApiResponse(400, { message: "project not exists" }));
  }

  const notes = await ProjectNote.find();

  return res.status(200).json(new ApiResponse(200, { message: "Notes are fetched ", notes }));

  // find all notes in this porohject and return 

});

const getNoteById = asyncHandler(async (req, res) => {
  const { noteid } = req.params;
  if (!noteid) {
    return res.status(400).json(new ApiResponse(400, { message: "Note not exists" }));
  }

  const note = await ProjectNote.findById(noteid);
  return res.status(200).json(new ApiResponse(200, { message: 'Note fetched', data: note }));


  return res.status(200).json(new ApiResponse(200, { message: 'Note is Updated', data: product }));
});

const createNote = asyncHandler(async (req, res) => {
  const { projectid } = req.params;
 
  const projectexits = await Project.findById(projectid);
     
  if (!projectexits) {

    return res.status(400).json(new ApiResponse(400, { message: "project not exists" }));
  }

  const userId = projectexits.createdBy;

  const { content } = req.body;

  if ((!userId) || (!content)) {
   
    return res.status(400).json(new ApiResponse(400, { message: "user or content missing " }));
  }
   
  const creatednote = await ProjectNote.create({
    project: projectid,
    createdBy: userId,
    content: content,
  });


  return res.status(201).json(new ApiResponse(201, { message: " Note created successfully", creatednote }));



});

const updateNote = asyncHandler(async (req, res) => {
  const { noteid } = req.params;
  if (!noteid) {
    return res.status(400).json(new ApiResponse(400, { message: "Note not exists" }));
  }
  const { content } = req.body;

  const updatednote = await ProjectNote.findByIdAndUpdate(noteid, { content }, { new: true });



  return res.status(200).json(new ApiResponse(200, { message: 'Note is Updated', data: updatednote }));
});

const deleteNote = asyncHandler(async (req, res) => {

  const { noteid } = req.params;
  if (!noteid) {
    return res.status(400).json(new ApiResponse(400, { message: "Note not exists" }));
  }

  await ProjectNote.findByIdAndDelete(noteid);

  return res.status(200).json(new ApiResponse(200, { message: 'Note is deleted' }));
});

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
