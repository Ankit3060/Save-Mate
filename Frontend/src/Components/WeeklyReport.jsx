import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";
import { Bar } from "react-chartjs-2";
import {ArrowLeft,ChevronDown,Calendar,Loader2,AlertCircle,TrendingUp,Inbox,} from "lucide-react";
import { useAuth } from "../Context/authContext";
import { useTheme } from "../Context/themeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

// --- Constants ---
const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

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
 * A custom select dropdown component
 * @param {{ value: any, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: Array<{value: any, label: string}>, icon: React.ReactNode, id: string, softDark: boolean }} props
 */
const FilterSelect = ({ value, onChange, options, icon, id, softDark }) => (
  <div className="relative">
    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
      ${softDark ? "text-gray-400" : "text-gray-400"}`}
    >
      {icon}
    </div>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`appearance-none w-full border rounded-lg py-2.5 pl-10 pr-10 font-medium focus:outline-none focus:ring-2 transition-all
        ${softDark 
          ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500" 
          : "bg-white border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
        }`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className={`absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none
      ${softDark ? "text-gray-400" : "text-gray-400"}`}
    >
      <ChevronDown size={18} />
    </div>
  </div>
);

// --- Main WeeklyReport Component ---
function WeeklyReport() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
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

    const fetchWeeklyReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/monthly-breakdown`,
          {
            params: { month },
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
        } else {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "An unknown error occurred";
          console.error("Error fetching weekly report:", err);
          setError(errorMessage);
          toast.error(errorMessage);
          setReportData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyReport();

    return () => {
      controller.abort();
    };
  }, [month, accessToken]);

  // Memoize chart data to prevent re-rendering
  const chartData = useMemo(() => {
    const labels = reportData.map((d) => d.week);
    return {
      labels,
      datasets: [
        {
          label: "Total Income",
          data: reportData.map((d) => d.totalIncome),
          backgroundColor: "#60a5fa",
          borderRadius: 4,
          maxBarThickness: 80,
        },
        {
          label: "Total Expense",
          data: reportData.map((d) => d.totalExpense),
          backgroundColor: "#fb7185",
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
          position: "bottom",
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
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || "";
              const value = context.parsed.y;
              return `${label}: ${formatCurrency(value)}`;
            },
          },
        },
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


  return (
    <div className={`min-h-screen -mb-10  p-4 md:p-8 font-inter transition-all duration-300
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
                Weekly Report
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FilterSelect
              id="month-filter"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              options={MONTHS}
              icon={<Calendar size={18} />}
              softDark={softDark}
            />
          </div>
        </header>

        {/* --- Content --- */}
        <div className={`rounded-2xl shadow-sm border p-6 transition-all duration-300
          ${softDark 
            ? "bg-gray-900 border-gray-700" 
            : "bg-white border-gray-100"
          }`}
        >
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
            <div className="h-96 w-full">
              <h3 className={`text-xl font-semibold mb-6
                ${softDark ? "text-gray-100" : "text-gray-800"}`}
              >
                Weekly Income vs. Expense
              </h3>
              {/* --- Chart.js Bar Chart --- */}
              <Bar options={chartOptions} data={chartData} />
              {/* --- End Chart.js --- */}
            </div>
          )}

          {!loading && !error && reportData.length === 0 && (
            <div className="flex flex-col items-center justify-center h-96">
              <Inbox size={48} className={softDark ? "text-gray-600" : "text-gray-300"} />
              <h3 className={`text-xl font-semibold mt-3
                ${softDark ? "text-gray-300" : "text-gray-700"}`}
              >
                No Data Available
              </h3>
              <p className={`mt-1
                ${softDark ? "text-gray-400" : "text-gray-500"}`}
              >
                There is no report data for the selected month.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeeklyReport;