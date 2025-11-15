import React, { useState, useEffect } from "react";
import axios from "axios";
import {DollarSign,Calendar,Tag,FileText,Plus,Loader2,ArrowLeft,} from "lucide-react";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

function AddTransaction() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "Expense",
    category: "",
    amount: "",
    description: "",
  });

  const [categories, setCategories] = useState({ income: [], expense: [] });
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (accessToken) {
      fetchCategories();
    }
  }, [accessToken]);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/categories`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data?.income && data?.expense) {
        setCategories({
          income: data.income,
          expense: data.expense,
        });
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      toast.error("Failed to load categories. Please check your connection.");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Transaction added successfully");
        setFormData({
          date: new Date().toISOString().split("T")[0],
          type: "Expense",
          category: "",
          amount: "",
          description: "",
        });
        navigate("/");
      } else {
        toast.error(data.message || "Failed to add transaction");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while adding transaction."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories =
    formData.type === "Income" ? categories.income : categories.expense;

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 -mb-10 transition-all duration-300
      ${
        softDark
          ? "bg-gray-800 text-gray-100"
          : "bg-linear-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header Row */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className={`p-2 cursor-pointer rounded-lg border transition-colors
              ${
                softDark
                  ? "bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft size={20} />
            </button>
            <h2
              className={`text-3xl font-bold ${
                softDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Add Transaction
            </h2>
          </div>
        </div>

        {/* Form Container */}
        <div
          className={`rounded-2xl shadow-xl p-8 transition-all
          ${
            softDark
              ? "bg-gray-700 border border-gray-600 text-gray-100"
              : "bg-white"
          }`}
        >
          <p
            className={`mb-8 ${
              softDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Keep track of your finances by adding a new transaction
          </p>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? softDark
                    ? "bg-green-900 text-green-200 border border-green-700"
                    : "bg-green-50 text-green-800 border border-green-200"
                  : softDark
                  ? "bg-red-900 text-red-200 border border-red-700"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-2 ${
                  softDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                className={`w-full px-4 py-3 cursor-pointer rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
                ${
                  softDark
                    ? "bg-gray-600 border border-gray-500 text-gray-100"
                    : "bg-white border border-gray-300 text-gray-800"
                }`}
                required
              />
            </div>

            {/* Type (Income / Expense) */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-2 ${
                  softDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <Tag className="w-4 h-4 mr-2 text-indigo-500" />
                Type
              </label>

              <div className="grid grid-cols-2 gap-4">
                {/* Expense */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: "Expense",
                      category: "",
                    }))
                  }
                  className={`px-4 py-3 cursor-pointer rounded-lg font-medium transition duration-200 ${
                    formData.type === "Expense"
                      ? "bg-red-500 text-white shadow-md"
                      : softDark
                      ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Expense
                </button>

                {/* Income */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: "Income",
                      category: "",
                    }))
                  }
                  className={`px-4 py-3 cursor-pointer rounded-lg font-medium transition duration-200 ${
                    formData.type === "Income"
                      ? "bg-green-500 text-white shadow-md"
                      : softDark
                      ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-2 ${
                  softDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <Tag className="w-4 h-4 mr-2 text-indigo-500" />
                Category
              </label>

              {categoriesLoading ? (
                <div className="flex items-center justify-center py-3">
                  <Loader2
                    className={`w-5 h-5 animate-spin ${
                      softDark ? "text-gray-200" : "text-indigo-600"
                    }`}
                  />
                </div>
              ) : (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
                  ${
                    softDark
                      ? "bg-gray-600 border border-gray-500 text-gray-100"
                      : "bg-white border border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Amount */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-2 ${
                  softDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
                Amount
              </label>
              <input
                type=""
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
                ${
                  softDark
                    ? "bg-gray-600 border border-gray-500 text-gray-100"
                    : "bg-white border border-gray-300 text-gray-800"
                }`}
              />
            </div>

            {/* Description */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-2 ${
                  softDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add a note about this transaction..."
                rows="4"
                className={`w-full px-4 py-3 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
                ${  
                  softDark
                    ? "bg-gray-600 border border-gray-500 text-gray-100"
                    : "bg-white border border-gray-300 text-gray-800"
                }`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || categoriesLoading}
              className={`w-full py-4 cursor-pointer rounded-lg font-semibold flex items-center justify-center transition-all shadow-lg
              ${
                softDark
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300"
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Adding Transaction...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Transaction
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;