const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

function Summary({ transactions = [] }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  return (
    <div className="summary">
      <div className="summary-card summary-card-primary">
        <div className="summary-card-header">
          <h3>Net Balance</h3>
          {totalIncome > 0 && (
            <span className={`summary-badge ${balance >= 0 ? 'badge-positive' : 'badge-negative'}`}>
              {savingsRate}% saved
            </span>
          )}
        </div>
        <p className={`balance-amount ${balance < 0 ? 'negative-balance' : ''}`}>
          {formatCurrency(balance)}
        </p>
      </div>

      <div className="summary-card">
        <div className="summary-card-header">
          <h3>Total Income</h3>
          <span className="summary-icon income-icon" aria-hidden="true">↓</span>
        </div>
        <p className="income-amount">{formatCurrency(totalIncome)}</p>
      </div>

      <div className="summary-card">
        <div className="summary-card-header">
          <h3>Total Expenses</h3>
          <span className="summary-icon expense-icon" aria-hidden="true">↑</span>
        </div>
        <p className="expense-amount">{formatCurrency(totalExpenses)}</p>
      </div>
    </div>
  );
}

export default Summary;
