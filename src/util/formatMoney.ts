export function formatCurrencyWithoutSymbol(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
}
export function parseNumber(num: number): string {
  if (num >= 1000000) {
    return Math.round(num / 1000000) + "tr";
  } else if (num >= 1000) {
    return Math.round(num / 1000) + "k";
  }
  return num.toString();
}
