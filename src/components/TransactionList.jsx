import { useState, useMemo } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { capitalize, formatCurrency, formatDate } from '../utils/formatters';

const DEFAULT_CATEGORIES = [
  'food',
  'housing',
  'utilities',
  'transport',
  'entertainment',
  'salary',
  'other',
];

const CATEGORY_ICONS = {
  food: '🥗',
  housing: '🏡',
  utilities: '⚡',
  transport: '🚲',
  entertainment: '🎟️',
  salary: '💼',
  other: '🪙',
};

function TransactionList({
  transactions = [],
  categories = DEFAULT_CATEGORIES,
  onDeleteTransaction,
}) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (filterType !== 'all') {
      result = result.filter((t) => t.type === filterType);
    }
    if (filterCategory !== 'all') {
      result = result.filter((t) => t.category === filterCategory);
    }
    return result;
  }, [transactions, filterType, filterCategory]);

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      onDeleteTransaction?.(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  return (
    <section className="transactions" aria-label="Transaction Ledger">
      <div className="transactions-header">
        <div>
          <h2>Ledger History</h2>
          <span className="transactions-count">
            Showing {filteredTransactions.length} of {transactions.length} entries
          </span>
        </div>

        <div className="filters">
          <div className="select-wrapper">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter by type"
            >
              <option value="all">All Types</option>
              <option value="income">Inflow Only</option>
              <option value="expense">Outflow Only</option>
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {capitalize(cat)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="transactions-empty">
          <p>No transactions match the selected filter criteria.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="th-amount">Amount</th>
                <th className="th-actions" aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => {
                const isIncome = t.type === 'income';
                const catLower = (t.category || 'other').toLowerCase();
                const icon = CATEGORY_ICONS[catLower] || '🪙';

                return (
                  <tr key={t.id} className="transaction-row">
                    <td className="td-date">{formatDate(t.date)}</td>
                    <td className="td-desc">
                      <span className="desc-text">{t.description}</span>
                    </td>
                    <td className="td-category">
                      <span className={`category-pill cat-${catLower}`}>
                        <span className="cat-icon">{icon}</span>
                        {capitalize(t.category || 'other')}
                      </span>
                    </td>
                    <td
                      className={`td-amount ${
                        isIncome ? 'income-amount' : 'expense-amount'
                      }`}
                    >
                      {isIncome ? '+' : '-'}${formatCurrency(t.amount)}
                    </td>
                    <td className="td-actions">
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => setTransactionToDelete(t)}
                        title="Delete transaction"
                        aria-label={`Delete ${t.description}`}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={Boolean(transactionToDelete)}
        title="Remove Transaction"
        message={
          transactionToDelete
            ? `Are you sure you want to remove "${transactionToDelete.description}" ($${formatCurrency(
                transactionToDelete.amount
              )})? This action cannot be undone.`
            : ''
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTransactionToDelete(null)}
      />
    </section>
  );
}

export default TransactionList;
