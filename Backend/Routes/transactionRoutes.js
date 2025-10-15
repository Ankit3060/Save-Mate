import {
    addNewTransaction,
    getTransactionCategories,
    getAllTransactions,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById,
    getDashboardStats,
    getMonthlyBreakdown,
    getYearlyBreakdown,
    getOverallBreakdown
} from "../Controller/transactionController.js";
import express from "express";

const router = express.Router();

router.post("/add", addNewTransaction);
router.get("/categories", getTransactionCategories);
router.get("/all", getAllTransactions);
router.get("/get-transaction/:id", getTransactionById);
router.put("/update-transaction/:id", updateTransactionById);
router.delete("/delete-transaction/:id", deleteTransactionById);
router.get("/dashboard-stats", getDashboardStats);
router.get("/monthly-breakdown", getMonthlyBreakdown);
router.get("/yearly-breakdown", getYearlyBreakdown);
router.get("/overall-breakdown", getOverallBreakdown);


export default router;