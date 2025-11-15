import React, { useState, useEffect } from "react";
import {
  Calendar,
  DollarSign,
  Hash,
  FileText,
  Tag,
  Clock,
  Trash2,
  Loader2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

function ViewParticularTransaction() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const softDark = theme === "dark";

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (accessToken) {
      fetchTransaction();
    }
  }, [accessToken]);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/v1/transaction/get-transaction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setTransaction(response.data.data);
      } else {
        toast.error("Failed to load transaction");
      }
    } catch (err) {
      toast.error("Failed to load transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/delete-temp/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Transaction deleted successfully");
        navigate("/transaction/view");
      } else {
        toast.error("Failed to delete transaction");
      }
    } catch (err) {
      toast.error("Failed to delete transaction. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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

  const getTypeColor = (type) => {
    if (!softDark) {
      return type === "Income"
        ? "bg-green-100 text-green-700 border-green-300"
        : "bg-red-100 text-red-700 border-red-300";
    }

    return type === "Income"
      ? "bg-green-900/30 text-green-300 border-green-700"
      : "bg-red-900/30 text-red-300 border-red-700";
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center -mb-10 justify-center ${
          softDark
            ? "bg-gray-900 text-gray-200"
            : "bg-linear-to-br from-blue-50 to-indigo-100"
        }`}
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mx-auto mb-4" />
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
        className={`min-h-screen flex items-center justify-center p-4 ${
          softDark
            ? "bg-gray-900 text-gray-200"
            : "bg-linear-to-br from-blue-50 to-indigo-100"
        }`}
      >
        <div
          className={`rounded-2xl shadow-xl p-8 max-w-md w-full ${
            softDark ? "bg-gray-800 text-gray-100" : "bg-white"
          }`}
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-2">Error</h2>
          <p className="text-center mb-6">{error}</p>
          <button
            onClick={handleBack}
            className={`w-full py-3 rounded-lg font-semibold transition cursor-pointer ${
              softDark
                ? "bg-indigo-700 hover:bg-indigo-800 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen -mb-10  py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        softDark
          ? "bg-gray-900 text-gray-100"
          : "bg-linear-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className={`flex items-center gap-2 mb-6 font-medium cursor-pointer transition ${
            softDark
              ? "text-indigo-400 hover:text-indigo-300"
              : "text-indigo-600 hover:text-indigo-700"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Transactions
        </button>

        <div
          className={`rounded-2xl shadow-xl overflow-hidden ${
            softDark ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Transaction Details
            </h2>
            <p className="text-indigo-100">
              View complete transaction information
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Date */}
              <div
                className={`rounded-xl p-6 shadow-sm border-2 ${
                  softDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-linear-to-br from-blue-50 to-blue-100 border-blue-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium uppercase ${
                      softDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Date
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  {formatDate(transaction.date)}
                </p>
              </div>

              {/* Amount */}
              <div
                className={`rounded-xl p-6 shadow-sm border-2 ${
                  softDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-linear-to-br from-green-50 to-green-100 border-green-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium uppercase ${
                      softDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Amount
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </p>
              </div>

              {/* TXN ID */}
              <div
                className={`rounded-xl p-6 shadow-sm border-2 ${
                  softDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-linear-to-br from-purple-50 to-purple-100 border-purple-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium uppercase ${
                      softDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Transaction ID
                  </span>
                </div>
                <p className="text-lg font-mono break-all font-semibold">
                  {transaction._id}
                </p>
              </div>

              {/* Type */}
              <div
                className={`rounded-xl p-6 shadow-sm border-2 ${getTypeColor(
                  transaction.type
                )}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "Income"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Type
                  </span>
                </div>
                <p className="text-2xl font-bold">{transaction.type}</p>
              </div>

              {/* Category */}
              <div
                className={`rounded-xl p-6 shadow-sm border-2 ${
                  softDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-linear-to-br from-yellow-50 to-yellow-100 border-yellow-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium uppercase ${
                      softDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Category
                  </span>
                </div>
                <p className="text-xl font-bold">{transaction.category}</p>
              </div>

              {/* Created At */}
              <div
                className={`rounded-xl p-6 shadow-sm border-2 ${
                  softDark
                    ? "bg-gray-700 border-gray-600"
                    : "bg-linear-to-br from-indigo-50 to-indigo-100 border-indigo-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium uppercase ${
                      softDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Created At
                  </span>
                </div>
                <p className="text-lg font-semibold">
                  {formatDateTime(transaction.createdAt)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div
              className={`rounded-xl p-6 shadow-sm border-2 mb-8 ${
                softDark
                  ? "bg-gray-700 border-gray-600"
                  : "bg-linear-to-br from-gray-50 to-gray-100 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-500 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium uppercase ${
                    softDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Description
                </span>
              </div>
              <p className="text-lg leading-relaxed">
                {transaction.description || "No description provided"}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center transition shadow-lg cursor-pointer disabled:opacity-50 ${
                softDark
                  ? "bg-red-700 hover:bg-red-800 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Deleting Transaction...
                </>
              ) : (
                <>
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Transaction
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewParticularTransaction;
