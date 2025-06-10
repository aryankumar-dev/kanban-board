import { Router } from "express";
import {createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controllers.js";
import isLoggedIn from "../middlewares/checkuser.middleware.js";
const router = Router()

router.route('/createNote/:projectid')
  .post(isLoggedIn,createNote);

  router.route('/deleteNote/:noteid')
  .delete(isLoggedIn,deleteNote);

  router.route('/getNoteById/:noteid')
  .get(isLoggedIn,getNoteById);


  router.route('/getNotes/:projectid')
  .get(isLoggedIn,getNotes);


  router.route('/updateNote/:noteid')
  .post(isLoggedIn,updateNote);

export default router