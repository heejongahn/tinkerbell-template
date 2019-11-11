export function formatKRW(amount: number) {
  if (amount === 0) {
    return "0원";
  }

  const units = ["", "만", "억", "조"];
  const step = 10000;

  const formatted = units
    .reduce(
      (tokens, currentUnit, i) => {
        const unitAmount = Math.pow(step, i);
        const value = Math.floor(amount / unitAmount) % step;

        return value > 0 ? [...tokens, `${value}${currentUnit}`] : tokens;
      },
      [] as string[],
    )
    .reverse()
    .join(" ");

  return `${formatted}원`;
}
