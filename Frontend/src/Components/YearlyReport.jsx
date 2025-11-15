import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {ArrowLeft,Loader2,AlertCircle,TrendingUp,Inbox,Banknote,CalendarCheck2,ArrowUpRight,ArrowDownLeft,} from "lucide-react";
import { useAuth } from "../Context/authContext";
import { useTheme } from "../Context/themeContext";
import { toast } from "react-toastify";

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

// --- Helper Functions ---

/**
 * Formats a number as Indian Rupees (₹)
 * @param {number} value - The number to format
 * @returns {string} - The formatted currency string
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

// --- Sub-Components ---

/**
 * A simple card for displaying key yearly stats
 * @param {{ title: string, value: string | number, icon: React.ReactNode, colorClass: string, softDark: boolean }} props
 */
const StatBox = ({ title, value, icon, colorClass, softDark }) => (
  <div className={`rounded-xl shadow-sm border p-5 transition-all duration-300
    ${softDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-100"}`}
  >
    <div className="flex items-center justify-between mb-2">
      <span className={`text-sm font-medium
        ${softDark ? "text-gray-400" : "text-gray-500"}`}
      >
        {title}
      </span>
      <div className={`p-2 rounded-full ${colorClass}`}>{icon}</div>
    </div>
    <p className={`text-2xl font-bold
      ${softDark ? "text-gray-100" : "text-gray-800"}`}
    >
      {value}
    </p>
  </div>
);

// --- Main YearlyReport Component ---
function YearlyReport() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const { theme } = useTheme();
  const navigateTo = useNavigate();
  const softDark = theme === "dark";

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      setError("Please log in to view the report.");
      return;
    }

    const controller = new AbortController();

    const fetchYearlyReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/overall-breakdown`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setReportData(
            Array.isArray(response.data.data) ? response.data.data : []
          );
        } else {
          setError(response.data.message || "Failed to fetch report");
          toast.error(response.data.message || "Failed to fetch report");
          setReportData([]);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Request was cancelled, do nothing
        } else {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "An unknown error occurred";
          console.error("Error fetching yearly report:", err);
          setError(errorMessage);
          toast.error(errorMessage);
          setReportData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchYearlyReport();

    return () => {
      controller.abort();
    };
  }, [accessToken]); // Re-fetch only when accessToken changes

  // --- Chart.js Data & Options ---

  // Memoize chart data to prevent re-rendering
  const chartData = useMemo(() => {
    const labels = reportData.map((d) => d.year);
    const incomeColor = "#60a5fa";
    const expenseColor = "#fb7185";

    return {
      labels,
      datasets: [
        {
          label: "Total Income",
          data: reportData.map((d) => d.totalIncome),
          backgroundColor: incomeColor,
          hoverBackgroundColor: incomeColor,
          borderRadius: 4,
          maxBarThickness: 80,
        },
        {
          label: "Total Expense",
          data: reportData.map((d) => d.totalExpense),
          backgroundColor: expenseColor,
          hoverBackgroundColor: expenseColor,
          borderRadius: 4,
          maxBarThickness: 80,
        },
      ],
    };
  }, [reportData]);

  // Memoize chart options with theme support
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: softDark ? "#e5e7eb" : "#333333",
          },
        },
        tooltip: {
          backgroundColor: softDark ? "#374151" : "#ffffff",
          titleColor: softDark ? "#f9fafb" : "#333333",
          bodyColor: softDark ? "#f9fafb" : "#333333",
          borderColor: softDark ? "#4b5563" : "#dddddd",
          borderWidth: 1,
          interaction: {
            mode: "point",
            intersect: true,
          },
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || "";
              const value = context.parsed.y;
              return `${label}: ${formatCurrency(value)}`;
            },
          },
        },
      },
      hover: {
        mode: "point",
        intersect: true,
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => formatCurrency(value),
            color: softDark ? "#9ca3af" : "#6b7280",
          },
          grid: {
            color: softDark ? "#374151" : "#e0e0e0",
            borderDash: [3, 3],
          },
        },
        x: {
          ticks: {
            color: softDark ? "#9ca3af" : "#6b7280",
          },
          grid: {
            display: false,
          },
        },
      },
    }),
    [softDark]
  );

  // --- End Chart.js ---

  return (
    <div className={`min-h-screen -mb-10 p-4 md:p-8 font-inter transition-all duration-300
      ${softDark ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              onClick={()=>navigateTo('/')}
              className={`p-2 cursor-pointer rounded-lg border transition-colors
                ${softDark 
                  ? "bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600" 
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              aria-label="Back to Homepage"
            >
              <ArrowLeft size={20} />
            </a>
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-7 h-7 
                ${softDark ? "text-blue-400" : "text-blue-600"}`} 
              />
              <h1 className={`text-3xl font-bold
                ${softDark ? "text-gray-100" : "text-gray-900"}`}
              >
                Overall Report
              </h1>
            </div>
          </div>
        </header>

        {/* --- Content --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader2 className={`w-12 h-12 animate-spin
              ${softDark ? "text-blue-400" : "text-blue-500"}`} 
            />
            <p className={`ml-3 mt-3
              ${softDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Loading Report...
            </p>
          </div>
        )}

        {error && !loading && (
          <div
            className={`border-l-4 p-6 rounded-lg flex items-start h-96
              ${softDark 
                ? "bg-red-900/20 border-red-500 text-red-300" 
                : "bg-red-100 border-red-500 text-red-700"
              }`}
            role="alert"
          >
            <AlertCircle className={`w-6 h-6 mr-3
              ${softDark ? "text-red-400" : "text-red-500"}`} 
            />
            <div>
              <strong className="font-bold text-lg">Error</strong>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && reportData.length > 0 && (
          <div className="space-y-6">
            {/* --- Stat Boxes --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {reportData.map((data) => (
                <React.Fragment key={data.year}>
                  <StatBox
                    title="Year"
                    value={data.year}
                    icon={
                      <CalendarCheck2 size={18} className="text-blue-800" />
                    }
                    colorClass="bg-blue-100"
                    softDark={softDark}
                  />
                  <StatBox
                    title="Total Income"
                    value={formatCurrency(data.totalIncome)}
                    icon={<ArrowUpRight size={18} className="text-green-800" />}
                    colorClass="bg-green-100"
                    softDark={softDark}
                  />
                  <StatBox
                    title="Total Expense"
                    value={formatCurrency(data.totalExpense)}
                    icon={<ArrowDownLeft size={18} className="text-red-800" />}
                    colorClass="bg-red-100"
                    softDark={softDark}
                  />
                  <StatBox
                    title="Net Balance"
                    value={formatCurrency(data.netBalance)}
                    icon={<Banknote size={18} className="text-indigo-800" />}
                    colorClass="bg-indigo-100"
                    softDark={softDark}
                  />
                </React.Fragment>
              ))}
            </div>

            {/* --- Chart --- */}
            <div className={`rounded-2xl shadow-sm border p-6 transition-all duration-300
              ${softDark 
                ? "bg-gray-900 border-gray-700" 
                : "bg-white border-gray-100"
              }`}
            >
              <div className="h-96 w-full">
                <h3 className={`text-xl font-semibold mb-6
                  ${softDark ? "text-gray-100" : "text-gray-800"}`}
                >
                  Overall Income vs. Expense
                </h3>
                <Bar options={chartOptions} data={chartData} />
              </div>
            </div>
          </div>
        )}

        {!loading && !error && reportData.length === 0 && (
          <div className={`flex flex-col items-center justify-center h-96 rounded-2xl shadow-sm border transition-all duration-300
            ${softDark 
              ? "bg-gray-900 border-gray-700" 
              : "bg-white border-gray-100"
            }`}
          >
            <Inbox size={48} className={softDark ? "text-gray-600" : "text-gray-300"} />
            <h3 className={`text-xl font-semibold mt-3
              ${softDark ? "text-gray-300" : "text-gray-700"}`}
            >
              No Data Available
            </h3>
            <p className={`mt-1
              ${softDark ? "text-gray-400" : "text-gray-500"}`}
            >
              There is no report data available at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default YearlyReport;