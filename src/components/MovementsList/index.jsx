import { Link, useLocation } from "react-router-dom";

export default function MovementsList(props) {
  const location = useLocation();

  const index = props.index;

  return (
    <>
      {props.movements.length === 0 &&
      location.pathname !== "/month-movements" ? (
        <>
          <br />
          <h2>Sem movimentações</h2>
        </>
      ) : (
        <>
          {props.movements
            .filter((item, idx) => idx < index)
            .map((item, index) => (
              <Link
                key={index}
                to="/movements"
                className={item.isExpense ? "expense" : "receipt"}
                state={{
                  id: item.id,
                  value: item.value,
                  cor: item.Cor,
                  desc: item.desc,
                  account: item.account,
                  date: item.date,
                  isExpense: item.isExpense,
                }}
              >
                {item.type} {item.value.toString().replace(".", ",")} €{" "}
                {item.prep} {item.desc}, dia {item.date.getDate()}
              </Link>
            ))}
        </>
      )}
    </>
  );
}
