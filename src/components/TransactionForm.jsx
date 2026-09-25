import { useState } from 'react';

const DEFAULT_CATEGORIES = [
  'food',
  'housing',
  'utilities',
  'transport',
  'entertainment',
  'salary',
  'other',
];

function TransactionForm({
  onAddTransaction,
  onAdd,
  categories = DEFAULT_CATEGORIES,
}) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    const addFn = onAddTransaction || onAdd;
    if (addFn) {
      addFn(newTransaction);
    }

    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('food');
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="add-transaction">
      <div className="form-header">
        <h2>Quick Entry</h2>
        <span className="form-subtitle">Record an inflow or outflow</span>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form-grid">
        <div className="form-group form-group-desc">
          <label htmlFor="tx-desc">Description</label>
          <input
            id="tx-desc"
            type="text"
            placeholder="e.g., Grocery Market"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group form-group-amt">
          <label htmlFor="tx-amount">Amount ($)</label>
          <input
            id="tx-amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group form-group-type">
          <label htmlFor="tx-type">Type</label>
          <select
            id="tx-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group form-group-cat">
          <label htmlFor="tx-category">Category</label>
          <select
            id="tx-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {capitalize(cat)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
