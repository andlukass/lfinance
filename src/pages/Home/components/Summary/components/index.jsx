import { useState } from "react";

import { FaRetweet } from "react-icons/fa";

import { useAuth } from "../../../../../contexts/auth";

import {
  MonthTotalExpense,
  MonthTotalReceipt,
} from "../../../../../components/Functions/MonthTotal";

export default function SummaryResume(props) {
  const auth = useAuth();

  const [showValue, setShowValue] = useState(true); //trocar de despesa para ganho

  const date = props.date
    ? props.date
    : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  return (
    <>
      {showValue ? (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setShowValue(!showValue)}
        >
          <p className="expense">
            Esse mês gastou <br />{" "}
            <MonthTotalExpense date={date} movements={auth.movements} /> €
          </p>
          <FaRetweet size={20} color="#ff8888" />
        </div>
      ) : (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setShowValue(!showValue)}
        >
          <p className="receipt">
            Esse mês ganhou <br />
            <MonthTotalReceipt date={date} movements={auth.movements} /> €
          </p>
          <FaRetweet size={20} color="#c5f4b0" />
        </div>
      )}
    </>
  );
}
