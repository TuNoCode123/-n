export function formatCurrencyWithoutSymbol(amount: number) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
}
