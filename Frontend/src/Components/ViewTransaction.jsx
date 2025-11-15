import React, { useState, useEffect } from "react";
import {Eye,Edit,Trash2,Download,ChevronLeft,ChevronRight,Loader2,AlertCircle,ArrowLeft,} from "lucide-react";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import { useTheme } from "../Context/themeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ViewTransaction() {
  const { accessToken } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const softDark = theme === "dark";

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    if (accessToken) {
      fetchTransactions();
    } else if (!loading) {
      setLoading(false);
      setError("Please log in to view transactions.");
    }
  }, [currentPage, accessToken]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/all?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;

      if (data.success) {
        setTransactions(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      } else {
        toast.error("Failed to load transactions");
      }
    } catch (err) {
      toast.error("Failed to load transactions. Please try again.");
      setError("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(id);
      const response = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/v1/transaction/delete-temp/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Transaction moved to trash successfully");
        await fetchTransactions();
      } else {
        toast.error("Failed to delete transaction. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to delete transaction. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleView = (id) => {
    navigate(`/transaction/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/transaction/edit/${id}`);
  };

  const downloadCSV = () => {
    const headers = [
      "Date",
      "TxnId",
      "Type",
      "Category",
      "Amount",
      "Description",
    ];
    const csvData = transactions.map((txn) => [
      formatDate(txn.date),
      txn._id,
      txn.type,
      txn.category,
      txn.amount,
      `"${txn.description || ""}"`,
    ]);

    const csv = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
    if (softDark) {
      return type === "Income"
        ? "text-green-400 bg-green-900/30"
        : "text-red-400 bg-red-900/30";
    }
    return type === "Income"
      ? "text-green-600 bg-green-50"
      : "text-red-600 bg-red-50";
  };

  if (loading) {
    return (
      <div className={`min-h-screen -mb-10 flex items-center justify-center transition-all duration-300
        ${softDark ? "bg-gray-800" : "bg-linear-to-br from-blue-50 to-indigo-100"}`}
      >
        <div className="text-center">
          <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4
            ${softDark ? "text-indigo-400" : "text-indigo-600"}`} 
          />
          <p className={softDark ? "text-gray-300" : "text-gray-600"}>
            Loading transactions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 -mb-10 transition-all duration-300
      ${softDark ? "bg-gray-800" : "bg-linear-to-br from-blue-50 to-indigo-100"}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`rounded-2xl shadow-xl overflow-hidden
          ${softDark ? "bg-gray-900 border border-gray-700" : "bg-white"}`}
        >
          <div className={`p-6 border-b flex justify-between items-center flex-wrap gap-4
            ${softDark ? "border-gray-700" : "border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className={`p-2 cursor-pointer rounded-lg border transition-colors
                  ${softDark 
                    ? "bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700" 
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                aria-label="Back to Homepage"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className={`text-3xl font-bold
                  ${softDark ? "text-gray-100" : "text-gray-900"}`}
                >
                  Transactions
                </h2>
                <p className={`mt-1
                  ${softDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  Total {total} transactions
                </p>
              </div>
            </div>

            <button
              onClick={downloadCSV}
              disabled={transactions.length === 0}
              className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Download CSV
            </button>
          </div>

          {error && (
            <div className={`mx-6 mt-6 p-4 border rounded-lg flex items-center gap-3
              ${softDark 
                ? "bg-red-900/20 border-red-500 text-red-300" 
                : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <AlertCircle className={`w-5 h-5
                ${softDark ? "text-red-400" : "text-red-600"}`} 
              />
              <p>{error}</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={softDark ? "bg-gray-800" : "bg-gray-50"}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Date
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    TxnId
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Type
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Category
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Desc
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Amount
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider
                    ${softDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y
                ${softDark ? "divide-gray-700" : "divide-gray-200"}`}
              >
                {transactions.length === 0 && !error ? (
                  <tr>
                    <td
                      colSpan="7"
                      className={`px-6 py-12 text-center
                        ${softDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((txn) => (
                    <tr
                      key={txn._id}
                      className={`transition duration-150
                        ${softDark ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}
                    >
                      <td className={`px-6 py-4 whitespace-nowrap text-sm
                        ${softDark ? "text-gray-200" : "text-gray-900"}`}
                      >
                        {formatDate(txn.date)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono
                        ${softDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {txn._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                            txn.type
                          )}`}
                        >
                          {txn.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm
                        ${softDark ? "text-gray-200" : "text-gray-900"}`}
                      >
                        {txn.category}
                      </td>
                      <td className={`px-6 py-4 text-sm max-w-xs truncate
                        ${softDark ? "text-gray-400" : "text-gray-600"}`}
                        title={txn.description}
                      >
                        {txn.description || "-"}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold
                        ${softDark ? "text-gray-200" : "text-gray-900"}`}
                      >
                        ₹{txn.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(txn._id)}
                            className={`p-2 cursor-pointer rounded-lg transition duration-150
                              ${softDark 
                                ? "text-blue-400 hover:bg-blue-900/30" 
                                : "text-blue-600 hover:bg-blue-50"
                              }`}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(txn._id)}
                            className={`p-2 cursor-pointer rounded-lg transition duration-150
                              ${softDark 
                                ? "text-green-400 hover:bg-green-900/30" 
                                : "text-green-600 hover:bg-green-50"
                              }`}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(txn._id)}
                            disabled={deleteLoading === txn._id}
                            className={`p-2 cursor-pointer rounded-lg transition duration-150 disabled:opacity-50
                              ${softDark 
                                ? "text-red-400 hover:bg-red-900/30" 
                                : "text-red-600 hover:bg-red-50"
                              }`}
                            title="Delete"
                          >
                            {deleteLoading === txn._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {transactions.length > 0 && totalPages > 1 && ( 
            <div className={`px-6 py-4 border-t flex items-center justify-between flex-wrap gap-4
              ${softDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className={`text-sm
                ${softDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Page {currentPage} of {totalPages} (Total: {total} transactions)
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed
                    ${softDark 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed
                    ${softDark 
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTransaction;