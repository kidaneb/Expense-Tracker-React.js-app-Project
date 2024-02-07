export function numberToMoneyFormat(number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  }