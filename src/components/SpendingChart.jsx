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
  Food: '#f97316',
  Housing: '#3b82f6',
  Utilities: '#eab308',
  Transport: '#06b6d4',
  Entertainment: '#8b5cf6',
  Salary: '#10b981',
  Other: '#64748b',
};

const FALLBACK_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f97316',
  '#8b5cf6',
  '#06b6d4',
  '#eab308',
  '#ec4899',
  '#64748b',
];

const getColor = (category, index) => {
  return CATEGORY_COLORS[category] || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
};

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

function SpendingChart({ transactions = [] }) {
  const [chartType, setChartType] = useState('pie');

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
          <h2>Spending Breakdown</h2>
          <span className="section-hint">
            {data.length} categories · Total expenses: {formatCurrency(totalExpense)}
          </span>
        </div>
        <div className="chart-type-toggle">
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
                  outerRadius={95}
                  innerRadius={55}
                  paddingAngle={4}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.category}-${index}`}
                      fill={getColor(entry.category, index)}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Spent']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ color: '#475569', fontSize: '12px', fontWeight: 500 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            ) : (
              <BarChart
                data={data}
                margin={{ top: 12, right: 16, left: 10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="category"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  interval={0}
                  angle={-10}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Spent']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#fff' }}
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
