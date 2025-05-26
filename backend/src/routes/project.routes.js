import { Router } from "express";
import { createProject, updateProject, getProjectById, deleteProject ,addMemberToProject} from "../controllers/project.controllers.js";
import isLoggedIn from "../middlewares/checkuser.middleware.js";
const router = Router();



router.route("/createProject")
  .post(isLoggedIn, createProject);

router.route('/getProjectById/:id')
  .get(getProjectById);


router.route('/deleteProject/:id')
  .delete(deleteProject);

router.route('/updateProject/:id')
  .put(updateProject);

router.route('/addMemberToProject/:projectId')
  .post(addMemberToProject);


export default router