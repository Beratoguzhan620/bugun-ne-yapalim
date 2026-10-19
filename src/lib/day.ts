/** Local calendar day as YYYY-MM-DD, used to keep a pinned suggestion for today only. */
export function dayKey(date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export type Pin = { day: string; id: string };

/** A pin only counts on the day it was made. */
export function activePin(pin: Pin | null | undefined, today: string): string | null {
  return pin && pin.day === today ? pin.id : null;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} dk`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} sa` : `${hours} sa ${rest} dk`;
}
