import express from "express";
import isAdmin from "../auth/isAdmin.js";
import { 
    getAllUsers, 
    deleteUser, 
    getAllJobs, 
    deleteJob, 
    getSystemStats 
} from "../controllers/admin.controller.js";

const router = express.Router();

// All routes are protected by isAdmin middleware
router.use(isAdmin);

router.route("/users").get(getAllUsers);
router.route("/user/:id").delete(deleteUser);

router.route("/jobs").get(getAllJobs);
router.route("/job/:id").delete(deleteJob);

router.route("/stats").get(getSystemStats);

export default router;
