import {
    addNewTransaction,
    getTransactionCategories,
    getAllTransactions,
    getTransactionById,
    updateTransactionById,
    permanentDeleteTransaction,
    restoreTransactionFromTrash,
    getTrashedTransactions,
    moveTransactionToTrash,
    getDashboardStats,
    getMonthlyBreakdown,
    getYearlyBreakdown,
    getOverallBreakdown
} from "../Controller/transactionController.js";
import express from "express";

import { isAuthenticated } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Add and Update Routes
router.post("/add", isAuthenticated, addNewTransaction);
router.put("/update-transaction/:id", isAuthenticated, updateTransactionById);


// Get Routes
router.get("/categories", isAuthenticated, getTransactionCategories);
router.get("/all", isAuthenticated, getAllTransactions);
router.get("/get-transaction/:id", isAuthenticated, getTransactionById);


// Delete Routes
router.delete("/delete-transaction/:id", isAuthenticated, permanentDeleteTransaction);
router.patch('/restore/:id',isAuthenticated, restoreTransactionFromTrash);
router.patch('/delete-temp/:id',isAuthenticated , moveTransactionToTrash);
router.get('/trash',isAuthenticated, getTrashedTransactions);


// Stats Routes
router.get("/dashboard-stats", isAuthenticated, getDashboardStats);
router.get("/monthly-breakdown", isAuthenticated, getMonthlyBreakdown);
router.get("/yearly-breakdown", isAuthenticated, getYearlyBreakdown);
router.get("/overall-breakdown", isAuthenticated, getOverallBreakdown);



export default router;