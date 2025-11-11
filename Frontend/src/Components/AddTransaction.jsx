import React, { useState, useEffect } from "react";
import axios from "axios";
import {DollarSign,Calendar,Tag,FileText,Plus,Loader2,ArrowLeft,} from "lucide-react";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function AddTransaction() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
                Authorization: `Bearer ${accessToken}`
            } 
        }
      );

      if (data.success || data.message?.toLowerCase().includes("success")) {
        toast.success(data.message || "Transaction added successfully");
        setFormData({
          date: new Date().toISOString().split("T")[0],
          type: "Expense",
          category: "",
          amount: "",
          description: "",
        });
        navigate('/');
      } else {
        toast.error(data.message || "Failed to add transaction");
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred while adding transaction.");
    }finally {
      setLoading(false);
    }
  };

  
  const filteredCategories =
    formData.type === "Income" ? categories.income : categories.expense;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 -mb-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Back to Homepage"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-3xl font-bold text-gray-900">
              Add Transaction
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Keep track of your finances by adding a new transaction
            </p>
          </div>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                required
                className="w-full px-4 py-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 mr-2 text-indigo-600" />
                Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: "Expense",
                      category: "",
                    }))
                  }
                  className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${
                    formData.type === "Expense"
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: "Income",
                      category: "",
                    }))
                  }
                  className={`px-4 py-3 rounded-lg font-medium transition duration-200 ${
                    formData.type === "Income"
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 mr-2 text-indigo-600" />
                Category
              </label>
              {categoriesLoading ? (
                <div className="flex items-center justify-center py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                </div>
              ) : (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 bg-white"
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-indigo-600" />
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none duration-200"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add a note about this transaction..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || categoriesLoading}
              className="w-full bg-indigo-600 text-white cursor-pointer py-4 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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