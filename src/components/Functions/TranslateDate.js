export default function TranslateDate(props) {
  const actualYear = props.actualYear
    ? props.actualYear
    : new Date().getFullYear();
  const actualMonth = props.actualMonth
    ? props.actualMonth
    : new Date().getMonth() + 1;
  if (actualMonth === 1) {
    return "JANEIRO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 2) {
    return "FEVEREIRO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 3) {
    return "MARÇO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 4) {
    return "ABRIL/" + actualYear.toString().substring(2);
  } else if (actualMonth === 5) {
    return "MAIO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 6) {
    return "JUNHO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 7) {
    return "JULHO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 8) {
    return "AGOSTO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 9) {
    return "SETEMBRO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 10) {
    return "OUTUBRO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 11) {
    return "NOVEMBRO/" + actualYear.toString().substring(2);
  } else if (actualMonth === 12) {
    return "DEZEMBRO/" + actualYear.toString().substring(2);
  }
}
