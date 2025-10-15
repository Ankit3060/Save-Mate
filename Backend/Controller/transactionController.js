import { Transaction } from "../Model/transactionModel.js";
import { User } from "../Model/userModel.js";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../Constant/category.js";


export const addNewTransaction = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Unauthorized",
            });
        }

        const { date, type, category, amount, description } = req.body;

        if (!date || !type || !category || !amount) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Missing required fields",
            });
        }

        const transaction = await Transaction.create({
            user: userId,
            date,
            type,
            category,
            amount,
            description,
        });

        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: "Transaction added successfully",
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};



export const getTransactionCategories = (req, res) => {
    try {
        res.status(200).json({
            income: INCOME_CATEGORIES,
            expense: EXPENSE_CATEGORIES,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};



export const getAllTransactions = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Unauthorized",
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const transactions = await Transaction.find({ user: userId })
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Transaction.countDocuments({ user: userId });

        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: transactions,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};



export const getTransactionById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Unauthorized",
            });
        }
        const transactionId = req.params.id;
        if (!transactionId) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Transaction ID is required",
            });
        }

        const transaction = await Transaction.findOne({ _id: transactionId, user: userId });
        if (!transaction) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Transaction not found",
            });
        }

        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};



export const updateTransactionById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Unauthorized",
            });
        }
        const transactionId = req.params.id;
        if (!transactionId) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Transaction ID is required",
            });
        }
        const { date, type, category, amount, description } = req.body;
        if (!date || !type || !category || !amount) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Missing required fields",
            });
        }

        const transaction = await Transaction.findOneAndUpdate(
            { _id: transactionId, user: userId },
            { date, type, category, amount, description },
            { new: true, runValidators: true }
        );

        if (!transaction) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Transaction not found",
            });
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Transaction updated successfully",
            data: transaction,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};



export const deleteTransactionById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                statusCode: 401,
                success: false,
                message: "Unauthorized",
            });
        }
        const transactionId = req.params.id;
        if (!transactionId) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "Transaction ID is required",
            });
        }

        const transaction = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });

        if (!transaction) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Transaction not found or you do not have permission to delete it.",
            });
        }

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Transaction deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        })
    }
};




export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user?.id;
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const month = parseInt(req.query.month) || new Date().getMonth() + 1;

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

        const result = await Transaction.aggregate([
            {
                // Step 1: Filter documents to the requested user, year, and month
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                // Step 2: Use $facet to run multiple aggregations at once
                $facet: {
                    // Pipeline 1: Calculate total income, expense, and balance
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalIncome: { $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] } },
                                totalExpense: { $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] } }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                totalIncome: 1,
                                totalExpense: 1,
                                balance: { $subtract: ["$totalIncome", "$totalExpense"] }
                            }
                        }
                    ],
                    // Pipeline 2: Group income by category
                    incomeBreakdown: [
                        { $match: { type: 'Income' } },
                        { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
                        { $project: { _id: 0, category: "$_id", totalAmount: 1 } }
                    ],
                    // Pipeline 3: Group expenses by category
                    expenseBreakdown: [
                        { $match: { type: 'Expense' } },
                        { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
                        { $project: { _id: 0, category: "$_id", totalAmount: 1 } }
                    ]
                }
            }
        ]);

        // The DB only returns categories with data. We'll merge these with our
        // constant lists to ensure all categories (even with 0) are present.

        const finalIncomeBreakdown = INCOME_CATEGORIES.map(category => {
            const found = result[0]?.incomeBreakdown.find(item => item.category === category);
            return { category, totalAmount: found?.totalAmount || 0 };
        });

        const finalExpenseBreakdown = EXPENSE_CATEGORIES.map(category => {
            const found = result[0]?.expenseBreakdown.find(item => item.category === category);
            return { category, totalAmount: found?.totalAmount || 0 };
        });


        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                summary: result[0]?.summary[0] || { totalIncome: 0, totalExpense: 0, balance: 0 },
                incomeBreakdown: finalIncomeBreakdown,
                expenseBreakdown: finalExpenseBreakdown
            }
        });

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message
        });
    }
};




export const getMonthlyBreakdown = async (req, res) => {
    try {
        const userId = req.user?.id;
        // Default to the current year and month if not provided
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const month = parseInt(req.query.month) || new Date().getMonth() + 1;

        // Create start and end dates for the given month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const breakdown = await Transaction.aggregate([
            {
                // Step 1: Find all transactions for the user within the specified month
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                // Step 2: Group transactions by the week number of the month
                $group: {
                    _id: { $ceil: { $divide: [{ $dayOfMonth: "$date" }, 7] } }, // Week 1, 2, 3, 4, or 5
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] }
                    }
                }
            },
            {
                // Step 3: Sort the results by week number
                $sort: { _id: 1 }
            },
            {
                // Step 4: Make the output cleaner
                $project: {
                    _id: 0,
                    week: `Week ${_id}`,
                    totalIncome: 1,
                    totalExpense: 1
                }
            }
        ]);

        return res.status(200).json({ 
            statusCode: 200,
            success: true, 
            data: breakdown 
        });

    } catch (error) {
        return res.status(500).json({ 
            statusCode: 500,
            success: false, 
            message: error.message 
        });
    }
};




export const getYearlyBreakdown = async (req, res) => {
    try {
        const userId = req.user?.id;
        const year = parseInt(req.query.year) || new Date().getFullYear();
        
        const startDate = new Date(year, 0, 1); // January 1st
        const endDate = new Date(year + 1, 0, 1); // January 1st of next year

        const breakdown = await Transaction.aggregate([
            {
                // Step 1: Match transactions for the user within the specified year
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    date: { $gte: startDate, $lt: endDate }
                }
            },
            {
                // Step 2: Group by the month number
                $group: {
                    _id: { $month: "$date" }, // Group by month (1-12)
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] }
                    }
                }
            },
            {
                // Step 3: Sort by month
                $sort: { _id: 1 }
            },
            {
                // Step 4: Make the output cleaner
                $project: {
                    _id: 0,
                    month: `$_id`, // Keep month as a number for easier frontend mapping
                    totalIncome: 1,
                    totalExpense: 1
                }
            }
        ]);

        return res.status(200).json({ 
            statusCode: 200,
            success: true, 
            data: breakdown 
        });

    } catch (error) {
        return res.status(500).json({ 
            statusCode: 500,
            success: false, 
            message: error.message 
        });
    }
};




export const getOverallBreakdown = async (req, res) => {
    try {
        const userId = req.user?.id;

        const breakdown = await Transaction.aggregate([
            {
                // Step 1: Match all transactions for the logged-in user
                $match: {
                    user: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                // Step 2: Group by the year
                $group: {
                    _id: { $year: "$date" }, // Group by year
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] }
                    }
                }
            },
            {
                // Step 3: Sort by year
                $sort: { _id: 1 }
            },
            {
                // Step 4: Make the output cleaner
                $project: {
                    _id: 0,
                    year: `$_id`,
                    totalIncome: 1,
                    totalExpense: 1,
                    netBalance: { $subtract: ["$totalIncome", "$totalExpense"] }
                }
            }
        ]);

        return res.status(200).json({
            statusCode: 200,
            success: true, 
            data: breakdown 
        });

    } catch (error) {
        return res.status(500).json({ 
            statusCode: 500,
            success: false, 
            message: error.message 
        });
    }
};
