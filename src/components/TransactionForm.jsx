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
    if (!description.trim() || !amount || Number(amount) <= 0) return;

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

  return (
    <div className="add-transaction">
      <div className="section-header">
        <h2>Add Transaction</h2>
        <span className="section-hint">Log a new income or expense</span>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form-grid">
        <div className="form-type-group">
          <label className="field-label">Type</label>
          <div className="type-toggle-pill">
            <button
              type="button"
              className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
              onClick={() => {
                setType('expense');
                if (category === 'salary') setCategory('food');
              }}
            >
              Expense
            </button>
            <button
              type="button"
              className={`type-btn ${type === 'income' ? 'active income' : ''}`}
              onClick={() => {
                setType('income');
                setCategory('salary');
              }}
            >
              Income
            </button>
          </div>
        </div>

        <div className="form-field form-field-desc">
          <label htmlFor="tx-description" className="field-label">
            Description
          </label>
          <input
            id="tx-description"
            type="text"
            placeholder="e.g. Weekly Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-field form-field-amount">
          <label htmlFor="tx-amount" className="field-label">
            Amount
          </label>
          <div className="input-currency-wrapper">
            <span className="currency-symbol">$</span>
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
        </div>

        <div className="form-field form-field-category">
          <label htmlFor="tx-category" className="field-label">
            Category
          </label>
          <select
            id="tx-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-action">
          <button type="submit" className="submit-btn">
            + Record
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
