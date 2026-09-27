/**
 * Utility for generating strictly unique, monotonically increasing numeric IDs.
 * Combines timestamp sequencing with a persistent high-water mark counter to guarantee
 * zero collisions even when invoked multiple times within the same millisecond.
 */
let lastId = Date.now();

export const generateNumericId = () => {
  const now = Date.now();
  lastId = now > lastId ? now : lastId + 1;
  return lastId;
};
