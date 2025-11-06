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

function ViewParticularTransaction() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

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
      const data = response.data;

      if (data.success) {
        setTransaction(data.data);
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
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/delete-temp/${id}`,{},
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
      console.error("Error deleting transaction:", err);
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
    return type === "Income"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading transaction...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Error
          </h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
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
    <div className="min-h-screen bg-linearar-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium mb-6 transition duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Transactions
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Date
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatDate(transaction.date)}
                </p>
              </div>

              <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Amount
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Transaction ID
                  </span>
                </div>
                <p className="text-lg font-mono font-semibold text-gray-900 break-all">
                  {transaction._id}
                </p>
              </div>

              <div
                className={`rounded-xl p-6 border-2 shadow-sm ${getTypeColor(
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

              <div className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Category
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {transaction.category}
                </p>
              </div>

              <div className="bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Created At
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDateTime(transaction.createdAt)}
                </p>
              </div>
            </div>

            <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-500 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Description
                </span>
              </div>
              <p className="text-lg text-gray-900 leading-relaxed">
                {transaction.description || "No description provided"}
              </p>
            </div>

            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="w-full bg-red-600 cursor-pointer text-white py-4 rounded-xl font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition duration-200 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
