export const OPENING_TIME = process.env.NEXT_PUBLIC_OPENING_STORE!;
export const ORDER_CUTOFF_TIME = process.env.NEXT_PUBLIC_CLOSE_ORDER!;

export function isOrderingAvailable(now: Date): boolean {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const openingMinutes = toMinutes(OPENING_TIME);
  const cutoffMinutes = toMinutes(ORDER_CUTOFF_TIME);

  return currentMinutes >= openingMinutes && currentMinutes < cutoffMinutes;
}
