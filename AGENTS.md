# AGENTS.md

Practical guidance and repository context for AI coding agents working on `expense-tracker-starter`.

---

## 1. Project Overview

- **Purpose**: A client-side expense tracker web application. According to `README.md`, this is the starter project from Mosh Hamedani's *Claude Code* course (`mosh-hamedani/expense-tracker-starter`).
- **Core Intent**: An educational starter codebase intentionally containing bugs, messy monolithic code, and an unpolished UI designed for refactoring and improvement.
- **Major Features**:
  - Financial summary dashboard displaying Total Income, Total Expenses, and Net Balance.
  - Transaction creation form (description, amount, type: income/expense, category).
  - Transaction list table displaying date, description, category, and styled amount.
  - Filtering transactions by type (`all`, `income`, `expense`) and category.

---

## 2. Technology Stack

- **Framework**: React 19 (`react` `^19.2.0`, `react-dom` `^19.2.0`)
- **Bundler & Build Tool**: Vite 7 (`vite` `^7.2.4`, `@vitejs/plugin-react` `^5.1.1`)
- **Language**: JavaScript (ES Modules, JSX, ES2020+)
  - *Note*: `@types/react` and `@types/react-dom` are present in `devDependencies`, but TypeScript (`tsc`, `tsconfig.json`) is **not** configured.
- **Styling**: Pure CSS (`src/App.css`, `src/index.css`). No CSS frameworks, UI component libraries, or CSS preprocessors are installed.
- **Linter**: ESLint 9 (`eslint` `^9.39.1`) using flat config (`eslint.config.js`) with `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `globals`.
- **Database / Backend**: None.
- **Testing**: None configured (no test framework or test scripts).

---

## 3. Project Structure

```
expense-tracker-starter/
├── public/
│   └── vite.svg              # Favicon asset
├── src/
│   ├── assets/
│   │   └── react.svg         # Default React logo asset (unused in App)
│   ├── App.css               # Component-level styling for App
│   ├── App.jsx               # Monolithic main application component
│   ├── index.css             # Global base stylesheet (resets and font settings)
│   └── main.jsx              # React DOM mounting entry point (<StrictMode>)
├── Docs/
│   └── AGENT.md              # Empty (0-byte) pre-existing untracked file
├── .gitignore                # Standard Git ignore rules (node_modules, dist, logs)
├── eslint.config.js          # ESLint flat configuration
├── index.html                # Vite HTML entry point (title: "finance-tracker")
├── package.json              # Project dependencies, scripts, and metadata
├── package-lock.json         # Dependency lockfile
├── README.md                 # Brief project description and getting-started guide
└── vite.config.js            # Vite build and plugin configuration
```

### Key File Responsibilities
- `src/main.jsx`: Mounts the `<App />` component into `#root` in `index.html`.
- `src/App.jsx`: Houses all application logic, state hooks, calculation logic, form submission, filtering, and table rendering in a single component.
- `src/App.css`: Defines layout, summary card, form, filter, table, and button styles.
- `src/index.css`: Global box-sizing reset (`border-box`) and basic body styles.
- `vite.config.js`: Sets up Vite with `@vitejs/plugin-react`.
- `eslint.config.js`: Configures flat ESLint rules with React Hooks and React Refresh plugins.

---

## 4. Architecture

- **Pattern**: Client-only, single-component monolithic React application.
- **Data Flow**:
  1. **State Store**: All state resides locally within `App` using React `useState` hooks (`transactions`, `description`, `amount`, `type`, `category`, `filterType`, `filterCategory`).
  2. **Derived Computations**: `totalIncome`, `totalExpenses`, `balance`, and `filteredTransactions` are recalculated synchronously during each render based on `transactions` and current filter state.
  3. **User Action / Mutation**: Submitting the form (`handleSubmit`) constructs a new transaction object and prepends/appends it via `setTransactions([...transactions, newTransaction])`.
- **Boundaries**: Currently no separation of concerns. UI presentation, state management, validation, and business calculations are combined in `src/App.jsx`.

---

## 5. Coding Conventions

- **Module Format**: ES Modules (`import` / `export default`).
- **Component Pattern**: Functional components using React hooks.
- **Naming Conventions**:
  - Components: PascalCase (`App`).
  - Source files: PascalCase for components (`App.jsx`), camelCase for utility/entry files (`main.jsx`, `vite.config.js`).
  - Variables & Functions: camelCase (`transactions`, `totalIncome`, `handleSubmit`, `filterCategory`).
  - CSS Classes: kebab-case (`summary-card`, `income-amount`, `delete-btn`, `add-transaction`).
  - Transaction categories: lower-case strings (`"food"`, `"housing"`, `"utilities"`, `"transport"`, `"entertainment"`, `"salary"`, `"other"`).
  - Transaction types: `"income"` or `"expense"`.
- **Date Format**: ISO date string formatted as `YYYY-MM-DD` (`new Date().toISOString().split('T')[0]`).
- **Error Handling**: Currently minimal. `handleSubmit` only has a guard clause: `if (!description || !amount) return;`. No user-facing error feedback or error boundaries exist.

---

## 6. UI and Styling Conventions

- **Styling Method**: Plain vanilla CSS linked via standard stylesheet imports (`import './App.css'`).
- **Component Library / Design System**: None. Raw HTML elements (`<form>`, `<input>`, `<select>`, `<button>`, `<table>`, `<tr>`, `<th>`, `<td>`).
- **Typography**:
  - Font family: `Arial, sans-serif`.
  - Heading 1: Default font size, margin-bottom 4px.
  - Subtitle: 14px, color `#666`.
  - Headings 2: 16px, margin-bottom 12px.
  - Headings 3: 13px, color `#888`.
  - Base text & Table cells: 14px.
  - Table headers: 12px, color `#888`, uppercase.
- **Colors**:
  - Backgrounds: `#ffffff` (card/body), `#f5f5f5` (table header), `#eee` (delete button).
  - Borders: `#ddd`, `#ccc`.
  - Neutral text: `#333` (primary), `#666` (subtitles), `#888` (labels/headers).
  - Income: `green` (`.income-amount`).
  - Expenses: `red` (`.expense-amount`).
  - Primary button: Background `#333`, text `#fff`.
- **Layout Patterns**:
  - Max container width: `800px` (`margin: 0 auto; padding: 20px;`).
  - Flexbox for dashboard cards (`display: flex; gap: 12px;`).
  - Flexbox for form inputs and filters (`display: flex; gap: 8px; flex-wrap: wrap;`).
  - Standard HTML table with collapse borders (`width: 100%; border-collapse: collapse;`).

---

## 7. Data and Backend

- **Backend / API**: None.
- **Database**: None.
- **Storage / Persistence**: Entirely in-memory React state (`useState`). Refreshing the browser resets all transactions to the seed data.
- **Authentication / Authorization**: None.
- **Data Model**:
  ```javascript
  {
    id: number,          // Initial items: 1..8; new items: Date.now()
    description: string, // e.g. "Salary"
    amount: number,      // Numeric value (e.g., 5000)
    type: string,        // "income" | "expense"
    category: string,    // "food" | "housing" | "utilities" | "transport" | "entertainment" | "salary" | "other"
    date: string         // "YYYY-MM-DD"
  }
  ```

---

## 8. Development Commands

- **Install dependencies**:
  ```bash
  npm install
  ```
- **Run development server** (starts Vite at `http://localhost:5173`):
  ```bash
  npm run dev
  ```
- **Build production assets** (outputs to `dist/`):
  ```bash
  npm run build
  ```
- **Preview production build**:
  ```bash
  npm run preview
  ```
- **Run linter**:
  ```bash
  npm run lint
  ```
- **Testing / Type checking**: No test runner or type check scripts currently exist in `package.json`.

---

## 9. Environment Variables

- **Required Environment Variables**: None.
- The project does not currently use `.env` files or runtime environment variables.

---

## 10. Important Rules and Constraints

1. **Preserve Educational Intent**: This repository is designed as a learning project. Unless explicitly asked, keep the toolchain lightweight (Vite + React) without introducing unnecessary heavyweight frameworks or dependencies.
2. **Do Not Break ESLint & Build**: All modifications must pass `npm run lint` and `npm run build`.
3. **No Hidden Secrets**: Do not add credentials or hardcoded keys.
4. **Preserve Existing Category & Type Names**: The category list (`"food"`, `"housing"`, `"utilities"`, `"transport"`, `"entertainment"`, `"salary"`, `"other"`) and type names (`"income"`, `"expense"`) are tied to form options and filter logic.
5. **String vs Number Precision**: When resolving transaction calculation issues, ensure numeric parsing and formatting are handled consistently across both initial state and user inputs.

---

## 11. Current Project Status

### Confirmed Implemented Functionality
- Initial seed transactions loaded into memory.
- Income/expense form with description, amount, type, and category inputs.
- Filter controls for filtering by transaction type and category.
- Basic tabular layout displaying date, description, category, and signed amount.

### Known Inconsistencies, Bugs & Incomplete Areas
1. **String Concatenation Calculation Bug (Resolved)**:
   - Previously stored amounts as strings and concatenated them during reduction.
   - Now resolved: `amount` is stored as a number in both initial state and form submissions, and `reduce` sums numerically.
2. **Incorrect Seed Data**:
   - Transaction id 4 (`"Freelance Work"`, amount `800`) is tagged as `type: "expense"` with `category: "salary"`, which is logically income.
3. **Orphaned / Incomplete Delete Feature**:
   - `src/App.css` defines `.delete-btn` styles (lines 141-148).
   - `src/App.jsx` has empty rows in `<thead>` (line 135) and `<tbody>` (line 147), but no delete button or delete handler is implemented.
4. **No Persistence**:
   - No `localStorage` or backend storage. All changes are lost upon reload.
5. **No Input Validation / Formatting**:
   - No check for numeric positivity, NaN, or decimal currency formatting (`.toFixed(2)`).
6. **Monolithic Architecture**:
   - `App.jsx` combines state, UI, calculations, and tables into one file without modular components (e.g., `TransactionForm`, `TransactionList`, `SummaryCards`, `FilterBar`).
7. **Empty Pre-existing Docs**:
   - `Docs/AGENT.md` exists as an empty 0-byte file in an untracked directory.

---

## 12. Agent Workflow

When assigned a task in this repository, follow this workflow:

1. **Pre-Change Inspection**:
   - Check `git status` to verify working tree status.
   - Read `src/App.jsx` and `src/App.css` to inspect existing state and class structures.
2. **Implementation Guidelines**:
   - Keep changes scoped to the task request.
   - Reuse existing CSS classes where appropriate (e.g., `.summary`, `.summary-card`, `.delete-btn`, `.income-amount`, `.expense-amount`).
   - If splitting into smaller components, place them in `src/components/` following standard PascalCase naming.
3. **Verification Steps**:
   - Run `npm run lint` to verify no lint or formatting errors were introduced.
   - Run `npm run build` to verify Vite bundle compilation succeeds.
   - Verify calculation outputs (Income, Expenses, Balance) mathematically if touching transactions or amounts.
