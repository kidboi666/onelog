export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((prev, curr) => prev + curr, 0);
  return Math.floor(sum / numbers.length);
}
