export function formatGuests(adults: number, children: number): string {
  const parts = [`${adults} adult${adults !== 1 ? 's' : ''}`]
  if (children > 0) parts.push(`${children} child${children !== 1 ? 'ren' : ''}`)
  return parts.join(' · ')
}
