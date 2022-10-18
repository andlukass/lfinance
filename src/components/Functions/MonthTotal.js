export const MonthTotal = (props) => {
  let start = new Date(props.date.getFullYear(), props.date.getMonth(), 1);
  let end = new Date(
    props.date.getFullYear(),
    props.date.getMonth(),
    props.date.getDate()
  );
  let tempMov = props.movements.filter(function (ele) {
    return ele.date >= start && ele.date <= end;
  });
  return tempMov;
};

export const MonthTotalReceipt = (props) => {
  const receiptFiltered = MonthTotal(props).filter(
    (isExpense) => isExpense["isExpense"] === false
  );
  const receiptResult = receiptFiltered.reduce(
    (a, b) => a + (b["value"] || 0),
    0
  );
  return parseFloat(receiptResult).toFixed(2).replace(".", ",");
};

export const MonthTotalExpense = (props) => {
  //filtrar todas as mov em que isexpense é verdadeiro
  const expenseFiltered = MonthTotal(props).filter(
    (isExpense) => isExpense["isExpense"] === true
  );
  //soma o campo value de todas as mov que passaram no filtro
  const expenseResult = expenseFiltered.reduce(
    (a, b) => a + (b["value"] || 0),
    0
  );

  return parseFloat(expenseResult).toFixed(2).replace(".", ",");
};

export const MonthTotalBalance = (props) => {
  let receipt = MonthTotalReceipt(props);
  let expense = MonthTotalExpense(props);
  let total = parseFloat(receipt) - parseFloat(expense);
  return total.toFixed(2).replace(".", ",");
};
