export const GARDEN_QUERY_KEY = {
  GARDEN: (userId: string, selectedYear?: number) => [
    "garden",
    userId,
    selectedYear,
  ],
};
