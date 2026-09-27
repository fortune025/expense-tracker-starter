import { useState } from 'react';
import { formatCurrency, capitalize } from '../utils/formatters';
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

const NORDIC_CATEGORY_COLORS = {
  Food: '#F59E0B',
  Housing: '#0284C7',
  Utilities: '#EAB308',
  Transport: '#10B981',
  Entertainment: '#8B5CF6',
  Salary: '#059669',
  Other: '#9CA3AF',
};

const FALLBACK_PALETTE = [
  '#0284C7',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
  '#64748B',
];

const getColor = (category, index) => {
  return NORDIC_CATEGORY_COLORS[category] || FALLBACK_PALETTE[index % FALLBACK_PALETTE.length];
};

function SpendingChart({ transactions = [] }) {
  const [chartType, setChartType] = useState('pie');

  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    const rawCategory = t.category || 'other';
    const formattedCategory = capitalize(rawCategory);
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
          <h2>Spending Breakdown</h2>
          <span className="chart-subtitle">
            Outflow: ${formatCurrency(totalExpense)} across {data.length} categories
          </span>
        </div>
        <div className="chart-type-toggle" role="group" aria-label="Chart view selector">
          <button
            type="button"
            className={`toggle-btn ${chartType === 'pie' ? 'active' : ''}`}
            onClick={() => setChartType('pie')}
          >
            Donut
          </button>
          <button
            type="button"
            className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            Bars
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty-state">
          <p>No expense data recorded yet.</p>
        </div>
      ) : (
        <div className="chart-container" style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height={280}>
            {chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={88}
                  innerRadius={52}
                  paddingAngle={3}
                  stroke="#ffffff"
                  strokeWidth={2}
                  label={({ percent }) =>
                    percent > 0.08 ? `${(percent * 100).toFixed(0)}%` : ''
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
                  formatter={(value) => [`$${formatCurrency(value)}`, 'Spent']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #eae9e4',
                    borderRadius: '10px',
                    boxShadow: '0 4px 16px rgba(20, 30, 25, 0.08)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    paddingTop: '8px',
                    fontSize: '12px',
                    color: '#787875',
                  }}
                />
              </PieChart>
            ) : (
              <BarChart
                data={data}
                margin={{ top: 12, right: 10, left: -10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0efe9" vertical={false} />
                <XAxis
                  dataKey="category"
                  stroke="#a0a09c"
                  fontSize={11}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#a0a09c"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  formatter={(value) => [`$${formatCurrency(value)}`, 'Spent']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #eae9e4',
                    borderRadius: '10px',
                    boxShadow: '0 4px 16px rgba(20, 30, 25, 0.08)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
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
