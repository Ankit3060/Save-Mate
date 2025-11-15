import React, { useState, useEffect } from "react";
import {
  Calendar,
  DollarSign,
  Hash,
  FileText,
  Tag,
  Clock,
  Loader2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import { useTheme } from "../Context/themeContext";
import { toast } from "react-toastify";

function EditTransaction() {
  const { accessToken } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const softDark = theme === "dark";

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState({ income: [], expense: [] });

  useEffect(() => {
    if (accessToken) {
      fetchTransaction();
      fetchCategories();
    }
  }, [accessToken]);

  // Fetch Transaction
  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/v1/transaction/get-transaction/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        const tx = res.data.data;
        // Keep amount as string to avoid float precision loss
        tx.amount =
          tx.amount !== undefined && tx.amount !== null
            ? String(tx.amount)
            : "";
        setTransaction(tx);
      } else {
        toast.error("Failed to load transaction");
      }
    } catch {
      toast.error("Failed to load transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/categories`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleBack = () => window.history.back();

  // Handle input change safely
  const handleChange = (e) => {
    const { name, value } = e.target;

    // For amount: only digits allowed, keep as string
    if (name === "amount") {
      const sanitized = String(value).replace(/[^\d]/g, ""); // only digits
      setTransaction((prev) => ({ ...prev, amount: sanitized }));
      return;
    }

    setTransaction((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" ? { category: "" } : {}),
    }));
  };

  // Handle update transaction
  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);

      const amountStr = transaction.amount ?? "";
      if (!/^\d+$/.test(amountStr) || amountStr === "") {
        toast.error("Please enter a valid amount (digits only).");
        setUpdateLoading(false);
        return;
      }

      // Safe conversion
      const amountNum = Number(amountStr);

      const payload = {
        date: transaction.date,
        type: transaction.type,
        category: transaction.category,
        amount: amountNum,
        description: transaction.description,
      };

      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/v1/transaction/update-transaction/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.data.success) {
        toast.success("Transaction updated successfully");
        navigate("/transaction/view");
      } else {
        toast.error("Failed to update transaction");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update transaction. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || !transaction) {
    return (
      <div
        className={`min-h-screen -mb-10 flex items-center justify-center transition-all duration-300
          ${
            softDark
              ? "bg-gray-800"
              : "bg-linear-to-br from-blue-50 to-indigo-100"
          }
        `}
      >
        <div className="text-center">
          <Loader2
            className={`w-12 h-12 animate-spin mx-auto mb-4 
              ${softDark ? "text-indigo-400" : "text-indigo-600"}`}
          />
          <p className={softDark ? "text-gray-300" : "text-gray-600"}>
            Loading transaction...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300
          ${
            softDark
              ? "bg-gray-800"
              : "bg-linear-to-br from-blue-50 to-indigo-100"
          }
        `}
      >
        <div
          className={`rounded-2xl shadow-xl p-8 max-w-md w-full
            ${softDark ? "bg-gray-900 border border-gray-700" : "bg-white"}`}
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2
            className={`text-2xl font-bold text-center mb-2
              ${softDark ? "text-gray-100" : "text-gray-900"}`}
          >
            Error
          </h2>
          <p
            className={`text-center mb-6
              ${softDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {error}
          </p>
          <button
            onClick={handleBack}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 -mb-10 transition-all duration-300
        ${
          softDark
            ? "bg-gray-800"
            : "bg-linear-to-br from-blue-50 to-indigo-100"
        }
      `}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className={`flex items-center gap-2 cursor-pointer font-medium mb-6 transition duration-200
            ${
              softDark
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-700"
            }
          `}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Transactions
        </button>

        <div
          className={`rounded-2xl shadow-xl overflow-hidden
            ${softDark ? "bg-gray-900 border border-gray-700" : "bg-white"}`}
        >
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Edit Transaction
            </h2>
            <p className="text-indigo-100">
              Modify the transaction details below
            </p>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Date */}
            <div
              className={`rounded-xl p-6 border-2 shadow-sm
                ${
                  softDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-linear-to-br from-blue-50 to-blue-100 border-blue-200"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium uppercase tracking-wide
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Date
                </span>
              </div>
              <input
                type="date"
                name="date"
                max={new Date().toISOString().split("T")[0]}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                value={transaction.date?.split("T")[0]}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 cursor-pointer focus:ring-2 focus:outline-none
                  ${
                    softDark
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                      : "border-blue-300 text-gray-900 focus:ring-blue-400"
                  }
                `}
              />
            </div>

            {/* Amount */}
            <div
              className={`rounded-xl p-6 border-2 shadow-sm
                ${
                  softDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-linear-to-br from-green-50 to-green-100 border-green-200"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium uppercase tracking-wide
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Amount
                </span>
              </div>
              <input
                type="text"
                name="amount"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Enter amount"
                value={transaction.amount}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none
                  ${
                    softDark
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-500"
                      : "border-green-300 text-gray-900 focus:ring-green-400"
                  }
                `}
              />
            </div>

            {/* Transaction ID */}
            <div
              className={`rounded-xl p-6 border-2 shadow-sm
                ${
                  softDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-linear-to-br from-purple-50 to-purple-100 border-purple-200"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium uppercase tracking-wide
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Transaction ID
                </span>
              </div>
              <input
                type="text"
                value={transaction._id}
                disabled
                className={`w-full border rounded-lg px-3 py-2 cursor-not-allowed
                  ${
                    softDark
                      ? "bg-gray-700 border-gray-600 text-gray-400"
                      : "bg-gray-100 border-purple-300 text-gray-600"
                  }
                `}
              />
            </div>

            {/* Type */}
            <div
              className={`rounded-xl p-6 border-2 shadow-sm
                ${
                  softDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-linear-to-br from-red-50 to-red-100 border-red-200"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium uppercase tracking-wide
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Type
                </span>
              </div>
              <select
                name="type"
                value={transaction.type}
                onChange={handleChange}
                className={`w-full cursor-pointer border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none
                  ${
                    softDark
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-red-500"
                      : "border-red-300 text-gray-900 focus:ring-red-400"
                  }
                `}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div
              className={`rounded-xl p-6 border-2 shadow-sm
                ${
                  softDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-linear-to-br from-yellow-50 to-yellow-100 border-yellow-200"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium uppercase tracking-wide
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Category
                </span>
              </div>
              <select
                name="category"
                value={transaction.category}
                onChange={handleChange}
                className={`w-full cursor-pointer border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none
                  ${
                    softDark
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-yellow-500"
                      : "border-yellow-300 text-gray-900 focus:ring-yellow-400"
                  }
                `}
              >
                <option value="">Select Category</option>
                {(transaction.type === "Income"
                  ? categories.income
                  : categories.expense
                ).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Created At */}
            <div
              className={`rounded-xl p-6 border-2 shadow-sm
                ${
                  softDark
                    ? "bg-gray-800 border-gray-600"
                    : "bg-linear-to-br from-indigo-50 to-indigo-100 border-indigo-200"
                }
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium uppercase tracking-wide
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  Created At
                </span>
              </div>
              <input
                type="text"
                value={formatDateTime(transaction.createdAt)}
                disabled
                className={`w-full border rounded-lg px-3 py-2 cursor-not-allowed
                  ${
                    softDark
                      ? "bg-gray-700 border-gray-600 text-gray-400"
                      : "bg-gray-100 border-indigo-300 text-gray-600"
                  }
                `}
              />
            </div>
          </div>

          {/* Description */}
          <div
            className={`rounded-xl p-6 border-2 shadow-sm mb-8 mx-8
              ${
                softDark
                  ? "bg-gray-800 border-gray-600"
                  : "bg-linear-to-br from-gray-50 to-gray-100 border-gray-200"
              }
            `}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-500 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-sm font-medium uppercase tracking-wide
                  ${softDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Description
              </span>
            </div>
            <textarea
              name="description"
              value={transaction.description || ""}
              onChange={handleChange}
              rows={4}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none
                ${
                  softDark
                    ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-gray-500"
                    : "border-gray-300 text-gray-900 focus:ring-gray-400"
                }
              `}
            />
          </div>

          {/* Update Button */}
          <div className="px-8 pb-8">
            <button
              onClick={handleUpdate}
              disabled={updateLoading}
              className="w-full bg-indigo-600 cursor-pointer text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Updating Transaction...
                </>
              ) : (
                "Update Transaction"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTransaction;