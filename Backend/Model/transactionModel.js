import mongoose from "mongoose";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../Constant/category.js";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true
    },
    category: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (this.type === 'Income') {
                    return INCOME_CATEGORIES.includes(value);
                } else if (this.type === 'Expense') {
                    return EXPENSE_CATEGORIES.includes(value);
                }
                return false;
            },
            message: props => `${props.value} is not a valid category for type ${props.path}`
        }
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
}, { timestamps: true });


export const Transaction = mongoose.model('Transaction', transactionSchema);