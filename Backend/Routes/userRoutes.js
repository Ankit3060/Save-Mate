import {
    updateUserDetails,
    updatePassword,
    getAllUsers,
    getCurrentUser,
    getUserById
} from "../Controller/userController.js";
import express from "express";

import { isAuthenticated, isAuthorized } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.put("/update", isAuthenticated, updateUserDetails);
router.put("/update-password", isAuthenticated, updatePassword);
router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);
router.get("/me", isAuthenticated, getCurrentUser);
router.get("/:id", isAuthenticated, getUserById);

export default router;