// utils/get-date-without-time.ts
export default function getDateWithoutTime(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const localDate = new Date(year, month, day);
  return localDate 
  // return localDate.toISOString().split('T')[0];
}