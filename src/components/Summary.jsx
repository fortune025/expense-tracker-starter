import { formatCurrency } from '../utils/formatters';

function Summary({ transactions = [] }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const isPositive = balance >= 0;

  return (
    <section className="summary" aria-label="Financial Summary">
      <div className="summary-card balance-card">
        <div className="card-header-row">
          <h3>Net Balance</h3>
          <span className={`status-pill ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? 'In Surplus' : 'Deficit'}
          </span>
        </div>
        <p className={`balance-amount ${isPositive ? 'positive' : 'negative'}`}>
          {balance < 0 ? `-$${formatCurrency(Math.abs(balance))}` : `$${formatCurrency(balance)}`}
        </p>
        <span className="summary-caption">Available liquidity across tracked accounts</span>
      </div>

      <div className="summary-subcards">
        <div className="summary-card income-card">
          <div className="card-header-row">
            <h3>Total Income</h3>
            <span className="metric-indicator income-dot" aria-hidden="true" />
          </div>
          <p className="income-amount">+${formatCurrency(totalIncome)}</p>
          <span className="summary-caption">All recorded earnings</span>
        </div>

        <div className="summary-card expense-card">
          <div className="card-header-row">
            <h3>Total Expenses</h3>
            <span className="metric-indicator expense-dot" aria-hidden="true" />
          </div>
          <p className="expense-amount">-${formatCurrency(totalExpenses)}</p>
          <span className="summary-caption">Total outflows</span>
        </div>
      </div>
    </section>
  );
}

export default Summary;
