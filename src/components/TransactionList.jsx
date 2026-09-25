import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const DEFAULT_CATEGORIES = [
  'food',
  'housing',
  'utilities',
  'transport',
  'entertainment',
  'salary',
  'other',
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

function TransactionList({
  transactions = [],
  categories = DEFAULT_CATEGORIES,
  onDeleteTransaction,
  onDelete,
}) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  let filteredTransactions = transactions;
  if (filterType !== 'all') {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.type === filterType
    );
  }
  if (filterCategory !== 'all') {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === filterCategory
    );
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
      <div className="transactions-header-bar">
        <div>
          <h2>Transaction History</h2>
          <span className="section-hint">
            Showing {filteredTransactions.length} of {transactions.length}{' '}
            entries
          </span>
        </div>

        <div className="filters">
          <div className="filter-select-wrapper">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter by type"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive-container">
        <table>
          <thead>
            <tr>
              <th className="col-date">Date</th>
              <th className="col-desc">Description</th>
              <th className="col-category">Category</th>
              <th className="col-amount">Amount</th>
              <th className="col-action"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-table-cell">
                  <div className="empty-state">
                    <p>No transactions match your current filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="transaction-row">
                  <td className="col-date text-muted">
                    {formatDate(t.date)}
                  </td>
                  <td className="col-desc font-medium">
                    {t.description}
                  </td>
                  <td className="col-category">
                    <span className={`category-tag tag-${t.category || 'other'}`}>
                      {t.category ? t.category.charAt(0).toUpperCase() + t.category.slice(1) : 'Other'}
                    </span>
                  </td>
                  <td className="col-amount">
                    <span
                      className={`amount-badge ${
                        t.type === 'income' ? 'income-amount' : 'expense-amount'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '-'}
                      {formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td className="col-action">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => setTransactionToDelete(t)}
                      title={`Delete ${t.description}`}
                      aria-label={`Delete ${t.description}`}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={Boolean(transactionToDelete)}
        title="Delete Transaction"
        message={
          transactionToDelete
            ? `Are you sure you want to delete "${transactionToDelete.description}" (${formatCurrency(
                transactionToDelete.amount
              )})?`
            : ''
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTransactionToDelete(null)}
      />
    </div>
  );
}

export default TransactionList;
