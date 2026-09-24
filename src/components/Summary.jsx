function Summary({ totalIncome, totalExpenses, balance, income, expenses }) {
  const displayIncome = totalIncome ?? income ?? 0;
  const displayExpenses = totalExpenses ?? expenses ?? 0;
  const displayBalance = balance ?? (displayIncome - displayExpenses);

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Income</h3>
        <p className="income-amount">${displayIncome}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p className="expense-amount">${displayExpenses}</p>
      </div>
      <div className="summary-card">
        <h3>Balance</h3>
        <p className="balance-amount">${displayBalance}</p>
      </div>
    </div>
  );
}

export default Summary;
