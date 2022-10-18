import { Link } from "react-router-dom";

export default function MovementsList(props) {
  const index = props.index;
  return (
    <>
      {props.movements
        .filter((item, idx) => idx < index)
        .map((item, index) => (
          <Link
            key={index}
            to="/Movements"
            className={item.isExpense ? "expense" : "receipt"}
            state={{
              id: item.id,
              value: item.value,
              desc: item.desc,
              account: item.account,
              date: item.date,
              isExpense: item.isExpense,
            }}
          >
            {item.type} {item.value.toFixed(2).replace(".", ",")} € {item.prep}{" "}
            {item.desc}, dia {item.date.getDate()}
          </Link>
        ))}
    </>
  );
}
