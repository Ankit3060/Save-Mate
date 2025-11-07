import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Banknote, ChevronDown, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../Context/authContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// --- Constants ---

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

const INCOME_COLORS = ['#22c55e', '#86efac', '#16a34a', '#15803d', '#14532d', '#dcfce7'];
const EXPENSE_COLORS = ['#ef4444', '#fca5a5', '#dc2626', '#b91c1c', '#7f1d1d', '#fee2e2', '#f87171', '#991b1b', '#fecaca'];

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

/**
 * Custom hook to fetch dashboard stats
 * @param {number} year - The year to fetch data for
 * @param {number} month - The month to fetch data for
 * @param {string | null} accessToken - The user's auth token
 * @returns {{ stats: object | null, loading: boolean, error: string | null }}
 */
const useDashboardStats = (year, month, accessToken) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      setError("Please log in to view the dashboard.");
      return;
    }

    const controller = new AbortController();

    const fetchDashboardStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/transaction/dashboard-stats`,
          {
            params: { year, month },
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setStats(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch data');
          toast.error(response.data.message || 'Failed to fetch data');
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Request was cancelled, do nothing
        } else {
          const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred';
          console.error('Error fetching dashboard stats:', err);
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();

    return () => {
      controller.abort();
    };
  }, [year, month, accessToken]); // Re-run effect when dependencies change

  return { stats, loading, error };
};

// --- Sub-Components ---

const SummaryCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800 mt-2">{formatCurrency(value)}</p>
    </div>
  );
};

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

const BreakdownChart = ({ title, data, colors }) => {
  const chartData = useMemo(() => data.filter(item => item.totalAmount > 0), [data]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      {chartData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="totalAmount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 overflow-y-auto max-h-64 pr-2">
            {chartData.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-sm text-gray-600">{item.category}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {formatCurrency(item.totalAmount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <Banknote size={48} className="text-gray-300 mb-3" />
          <p className="text-gray-500">No {title.toLowerCase()} recorded for this period.</p>
        </div>
      )}
    </div>
  );
};

// --- Main Dashboard Component ---

function Dashboard() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const { accessToken } = useAuth();
  const navigateTo = useNavigate();

  // Pass accessToken to the custom hook
  const { stats, loading, error } = useDashboardStats(year, month, accessToken);

  const {
    summary,
    incomeBreakdown,
    expenseBreakdown,
  } = stats || {
    summary: { totalIncome: 0, totalExpense: 0, balance: 0 },
    incomeBreakdown: [],
    expenseBreakdown: [],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-inter">
      {/* ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Using <a> tag for simplicity as requested. Use Link from react-router-dom if available */}
            <a 
              onClick={()=>navigateTo('/')}
              className="p-2 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Back to Homepage"
            >
              <ArrowLeft size={20} />
            </a>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <FilterSelect
              id="month-filter"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              options={MONTHS}
              icon={<Calendar size={18} />}
            />
            <FilterSelect
              id="year-filter"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              options={YEARS.map(y => ({ value: y, label: y.toString() }))}
              icon={<Calendar size={18} />}
            />
          </div>
        </header>

        {/* --- Content --- */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="ml-3 text-gray-600 mt-3">Loading Dashboard...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg flex items-start" role="alert">
            <AlertCircle className="w-6 h-6 mr-3 text-red-500" />
            <div>
              <strong className="font-bold text-lg">Error</strong>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard
                title="Total Income"
                value={summary.totalIncome}
                icon={<ArrowUpRight size={20} className="text-green-800" />}
                color="bg-green-100"
              />
              <SummaryCard
                title="Total Expense"
                value={summary.totalExpense}
                icon={<ArrowDownLeft size={20} className="text-red-800" />}
                color="bg-red-100"
              />
              <SummaryCard
                title="Balance"
                value={summary.balance}
                icon={<Banknote size={20} className="text-blue-800" />}
                color="bg-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BreakdownChart
                title="Income Breakdown"
                data={incomeBreakdown}
                colors={INCOME_COLORS}
              />
              <BreakdownChart
                title="Expense Breakdown"
                data={expenseBreakdown}
                colors={EXPENSE_COLORS}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;