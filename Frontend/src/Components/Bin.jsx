import React, { useState, useEffect } from "react";
import {Trash2,RotateCcw,Loader2,AlertCircle,Calendar,Hash,Tag,FileText,AlertTriangle,ArrowLeft,} from "lucide-react";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Bin() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (accessToken) {
      fetchTrashData();
    }
  }, [accessToken]);

  const fetchTrashData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/trash`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setTransactions(response.data.data || []);
      } else {
        toast.error("Failed to load trash data");
      }
    } catch (err) {
      console.error("Error fetching trash data:", err);
      toast.error("Failed to load trash data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      setActionLoading(id);
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/restore/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Transaction restored successfully");
        setTransactions(transactions.filter((txn) => txn._id !== id));
      } else {
        toast.error("Failed to restore transaction");
      }
    } catch (err) {
      console.error("Error restoring transaction:", err);
      toast.error("Failed to restore transaction. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      setActionLoading(id);
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/v1/transaction/delete-transaction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Transaction permanently deleted");
        setTransactions(transactions.filter((txn) => txn._id !== id));
      } else {
        toast.error("Failed to delete transaction");
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      toast.error("Failed to delete transaction. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getTypeColor = (type) => {
    return type === "Income"
      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
      : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center ">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading trash...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 -mb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-linear-to-r from-red-500 to-orange-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="p-2 cursor-pointer rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                  aria-label="Back to Homepage"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                  <Trash2 className="w-8 h-8 text-white" />
                  <div>
                    <h1 className="text-3xl font-bold text-white">Trash Bin</h1>
                    <p className="text-red-100 mt-1">
                      Deleted transactions • {transactions.length} item(s)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {transactions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Trash2 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Trash is Empty
            </h2>
            <p className="text-gray-600">
              No deleted transactions found. Your trash bin is clean!
            </p>
          </div>
        ) : (
          <>
            {/* Warning Message */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">
                    Warning: Transaction will be permanently deleted after 30
                    days
                  </p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-linear-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        TxnId
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((txn) => (
                      <tr
                        key={txn._id}
                        className="hover:bg-gray-50 transition duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(txn.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-gray-400" />
                            <span
                              className="truncate max-w-[120px]"
                              title={txn._id}
                            >
                              {txn._id.substring(0, 8)}...
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getTypeColor(txn.type)}>
                            {txn.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-400" />
                            {txn.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2 max-w-[200px]">
                            <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="truncate" title={txn.description}>
                              {txn.description || "No description"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm items-center font-semibold text-gray-900">
                          <div className="flex items-center justify-end gap-2">
                            ₹{Number(txn.amount).toLocaleString("en-IN")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleRestore(txn._id)}
                              disabled={actionLoading === txn._id}
                              className="inline-flex cursor-pointer items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Restore transaction"
                            >
                              {actionLoading === txn._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <RotateCcw className="w-4 h-4" />
                              )}
                              <span className="text-xs font-semibold">
                                Restore
                              </span>
                            </button>
                            <button
                              onClick={() => handlePermanentDelete(txn._id)}
                              disabled={actionLoading === txn._id}
                              className="inline-flex cursor-pointer items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Permanently delete transaction"
                            >
                              {actionLoading === txn._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                              <span className="text-xs font-semibold">
                                Delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  <span>
                    Total transactions in trash: {transactions.length}
                  </span>
                </div>
                <div className="text-gray-500">
                  Use restore to recover or permanently delete to remove forever
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Bin;