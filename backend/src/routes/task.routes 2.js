import { Router } from "express";
import {
    createSubTask,
    createTask,
    deleteSubTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateSubTask,
    updateTask
} from "../controllers/task.controllers.js";
import isLoggedIn from "../middlewares/checkuser.middleware.js";
const router = Router()

router.route('/createTask/:projectid')
    .post(isLoggedIn, createTask);

router.route('/getTaskById/:taskid')
    .get(isLoggedIn, getTaskById);


router.route('/deleteTask/:taskid')
    .delete(isLoggedIn, deleteTask);

router.route('/updateTask/:taskid')
    .post(isLoggedIn, updateTask);

router.route('/getTasks/:projectid')
    .get( getTasks);



router.route('/createSubTask/:taskid')
    .post(isLoggedIn, createSubTask);




router.route('/deleteSubTask/:subtaskid')
    .delete(isLoggedIn, deleteSubTask);

router.route('/updateSubTask/:subtaskid')
    .post(isLoggedIn, updateSubTask);



export default router