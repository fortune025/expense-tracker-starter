import { useState } from 'react';
import Summary from './components/Summary';
import SpendingChart from './components/SpendingChart';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-logo" aria-hidden="true">◆</div>
          <div>
            <h1>Finance Tracker</h1>
            <p className="subtitle">Real-time cashflow & expense ledger</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="status-pill">
            <span className="status-dot"></span> Live Ledger
          </span>
        </div>
      </header>

      <main className="app-main">
        <Summary transactions={transactions} />

        <div className="dashboard-grid">
          <div className="grid-col-chart">
            <SpendingChart transactions={transactions} />
          </div>
          <div className="grid-col-form">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        </div>

        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </main>
    </div>
  );
}

export default App;
