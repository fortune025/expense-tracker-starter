/**
 * Shared formatting utilities for expense-tracker-starter.
 */

/**
 * Formats a numeric value as standard USD currency string with 2 decimal places.
 * @param {number|string} val - Numeric or string value to format.
 * @returns {string} Formatted currency string (e.g. "1,200.00").
 */
export const formatCurrency = (val) =>
  Number(val).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/**
 * Capitalizes the first letter of a word and lowers the rest.
 * @param {string} str - String to capitalize.
 * @returns {string} Capitalized string (e.g. "Food").
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formats an ISO YYYY-MM-DD date into localized short format (e.g. "Jan 5, 2025").
 * @param {string} dateStr - Date string in YYYY-MM-DD format.
 * @returns {string} Formatted date string.
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};
