import {
    updateUserDetails,
    updatePassword,
    getAllUsers,
    getCurrentUser,
    getUserById
} from "../Controller/userController.js";
import express from "express";

const router = express.Router();

router.put("/update", updateUserDetails);
router.put("/update-password", updatePassword);
router.get("/all", getAllUsers);
router.get("/me", getCurrentUser);
router.get("/:id", getUserById);

export default router;