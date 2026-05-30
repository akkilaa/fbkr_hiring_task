export function formatBookingDate(date: Date | null): string {
  if (!date) return 'Select date'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function toCalendarDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate(),
  ).padStart(2, '0')}`
}
