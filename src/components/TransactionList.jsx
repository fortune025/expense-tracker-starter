import { useState } from 'react'
import ConfirmationModal from './ConfirmationModal'

const DEFAULT_CATEGORIES = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionList({
  transactions = [],
  categories = DEFAULT_CATEGORIES,
  onDeleteTransaction,
  onDelete,
}) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      const deleteFn = onDeleteTransaction || onDelete;
      deleteFn?.(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "-"}${t.amount}
              </td>
              <td>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => setTransactionToDelete(t)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={Boolean(transactionToDelete)}
        title="Delete Transaction"
        message={
          transactionToDelete
            ? `Are you sure you want to delete "${transactionToDelete.description}" ($${transactionToDelete.amount})?`
            : ""
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTransactionToDelete(null)}
      />
    </div>
  );
}

export default TransactionList;
