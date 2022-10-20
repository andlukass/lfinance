export const moneyMask = (value) => {
  value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(value) / 100
  );

  return result === "NaN" ? "0,00" : result;
};
