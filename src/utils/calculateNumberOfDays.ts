// Function to calculate the number of days between two dates
export default function calculateNumberOfDays(from: string | undefined, to: string | undefined): number {
  if (!from || !to) return 0;

  const fromDate = new Date(from);
  const toDate = new Date(to);

  const timeDifference = toDate.getTime() - fromDate.getTime();
  return timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
}
