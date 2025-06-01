import { Router } from "express";
import { createProject, updateProject, getProjectById, deleteProject, addMemberToProject, deleteMember, getProjectMembersbyuserid, updateMemberRole, getProjects, getProjectMembers } from "../controllers/project.controllers.js";
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



router.route('/deleteMember/:id')
  .delete(deleteMember);

router.route('/projects')
  .get(isLoggedIn, getProjects);

router.route('/getProjectMembers/:id')
  .get(isLoggedIn, getProjectMembers);


router.route('/getProjectMembersbyuserid/:id')
    .get(isLoggedIn, getProjectMembersbyuserid
    );

router.route('/updateMemberRole/:id')
  .post(updateMemberRole);

export default router