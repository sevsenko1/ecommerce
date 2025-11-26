export const formatPrice = (value: number, currency = "TRY") => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};

