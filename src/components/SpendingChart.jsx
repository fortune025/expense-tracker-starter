import { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CATEGORY_COLORS = {
  Food: '#FF8042',
  Housing: '#0088FE',
  Utilities: '#FFBB28',
  Transport: '#00C49F',
  Entertainment: '#8884D8',
  Salary: '#82CA9D',
  Other: '#A4A4A4',
};

const FALLBACK_COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FF6B6B',
  '#20B2AA',
];

const getColor = (category, index) => {
  return CATEGORY_COLORS[category] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
};

function SpendingChart({ transactions = [] }) {
  const [chartType, setChartType] = useState('pie');

  // Filter only expenses and aggregate by category
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    const rawCategory = t.category || 'other';
    const formattedCategory =
      rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
    acc[formattedCategory] = (acc[formattedCategory] || 0) + Number(t.amount);
    return acc;
  }, {});

  const data = Object.entries(categoryTotals)
    .filter(([, amount]) => amount > 0)
    .map(([category, amount]) => ({
      category,
      amount: Number(amount.toFixed(2)),
    }))
    .sort((a, b) => b.amount - a.amount);

  const totalExpense = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="spending-chart-section">
      <div className="chart-header">
        <div>
          <h2>Spending by Category</h2>
          <span className="chart-subtitle">
            Total expenses: ${totalExpense.toFixed(2)}
          </span>
        </div>
        <div className="chart-type-toggle">
          <button
            type="button"
            className={`toggle-btn ${chartType === 'pie' ? 'active' : ''}`}
            onClick={() => setChartType('pie')}
          >
            Pie Chart
          </button>
          <button
            type="button"
            className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty-state">
          <p>No expense data available to display.</p>
        </div>
      ) : (
        <div className="chart-container" style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={48}
                  paddingAngle={3}
                  label={({ percent }) =>
                    percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.category}-${index}`}
                      fill={getColor(entry.category, index)}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Spent']}
                />
                <Legend />
              </PieChart>
            ) : (
              <BarChart
                data={data}
                margin={{ top: 10, right: 15, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  dataKey="category"
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Spent']}
                />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`bar-${entry.category}-${index}`}
                      fill={getColor(entry.category, index)}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SpendingChart;
