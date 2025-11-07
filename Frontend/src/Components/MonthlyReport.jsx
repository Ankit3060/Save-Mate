import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {ArrowLeft,ChevronDown,Calendar,Loader2,AlertCircle,TrendingUp,Inbox,} from 'lucide-react';
import { useAuth } from '../Context/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

// --- Constants ---
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => ({
  value: currentYear - i,
  label: (currentYear - i).toString(),
}));

/**
 * Converts a month number (1-12) to its full name.
 * @param {number} monthNum - The month number (1 for Jan, 12 for Dec)
 * @returns {string} - The full month name
 */
const getMonthName = (monthNum) => {
  const date = new Date();
  date.setMonth(monthNum - 1); // 0-indexed month
  return date.toLocaleString('default', { month: 'long' });
};

// --- Helper Functions ---

/**
 * Formats a number as Indian Rupees (₹)
 * @param {number} value - The number to format
 * @returns {string} - The formatted currency string
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

// --- Sub-Components ---

/**
 * A custom select dropdown component
 * @param {{ value: any, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: Array<{value: any, label: string}>, icon: React.ReactNode, id: string }} props
 */
const FilterSelect = ({ value, onChange, options, icon, id }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
      <ChevronDown size={18} />
    </div>
  </div>
);

// --- Main MonthlyReport Component ---
function MonthlyReport() {
  const [year, setYear] = useState(currentYear);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      setError('Please log in to view the report.');
      return;
    }

    const controller = new AbortController();

    const fetchMonthlyReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/yearly-breakdown`,
          {
            params: { year },
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setReportData(Array.isArray(response.data.data) ? response.data.data : []);
        } else {
          setError(response.data.message || 'Failed to fetch report');
          toast.error(response.data.message || 'Failed to fetch report');
          setReportData([]);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
        } else {
          const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred';
          console.error('Error fetching monthly report:', err);
          setError(errorMessage);
          toast.error(errorMessage);
          setReportData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyReport();

    return () => {
      controller.abort();
    };
  }, [year, accessToken]);


  // Memoize chart data to prevent re-rendering
  const chartData = useMemo(() => {
    // Convert month numbers (e.g., 10) to month names (e.g., "October")
    const labels = reportData.map(d => getMonthName(d.month));

    const incomeColor = '#60a5fa';
    const expenseColor = '#fb7185';

    return {
      labels,
      datasets: [
        {
          label: 'Total Income',
          data: reportData.map(d => d.totalIncome),
          backgroundColor: incomeColor,
          hoverBackgroundColor: incomeColor,
          borderRadius: 4,
          maxBarThickness: 80,
        },
        {
          label: 'Total Expense',
          data: reportData.map(d => d.totalExpense),
          backgroundColor: expenseColor,
          hoverBackgroundColor: expenseColor,
          borderRadius: 4,
          maxBarThickness: 80,
        },
      ],
    };
  }, [reportData]);

  // Memoize chart options
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#333333',
        bodyColor: '#333333',
        borderColor: '#dddddd',
        borderWidth: 1,
        interaction: {
          mode: 'point',
          intersect: true,
        },
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
    },
    hover: {
      mode: 'point',
      intersect: true,
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => formatCurrency(value),
        },
        grid: {
          color: '#e0e0e0',
          borderDash: [3, 3],
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }), []);

  // --- End Chart.js ---

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              onClick={()=>navigateTo('/')}
              className="p-2 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Back to Homepage"
            >
              <ArrowLeft size={20} />
            </a>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Monthly Report</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FilterSelect
              id="year-filter"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              options={yearOptions}
              icon={<Calendar size={18} />}
            />
          </div>
        </header>

        {/* --- Content --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
              <p className="ml-3 text-gray-600 mt-3">Loading Report...</p>
            </div>
          )}

          {error && !loading && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg flex items-start h-96"
              role="alert"
            >
              <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
              <div>
                <strong className="font-bold text-lg">Error</strong>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && reportData.length > 0 && (
            <div className="h-96 w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Monthly Income vs. Expense for {year}
              </h3>
              {/* --- Chart.js Bar Chart --- */}
              <Bar options={chartOptions} data={chartData} />
              {/* --- End Chart.js --- */}
            </div>
          )}

          {!loading && !error && reportData.length === 0 && (
             <div className="flex flex-col items-center justify-center h-96">
               <Inbox size={48} className="text-gray-300 mb-3" />
               <h3 className="text-xl font-semibold text-gray-700">No Data Available</h3>
               <p className="text-gray-500 mt-1">
                 There is no report data for the selected year.
               </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MonthlyReport;