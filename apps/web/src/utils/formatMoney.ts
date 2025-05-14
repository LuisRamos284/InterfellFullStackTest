export const formatMoney = (amount: number): string =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(amount);
