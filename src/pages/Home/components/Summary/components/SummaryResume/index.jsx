import { useState, useContext } from "react";

import { FaRetweet } from "react-icons/fa";

import { useAuth } from "../../../../../../contexts/auth";

import {
  MonthTotalExpense,
  MonthTotalReceipt,
} from "../../../../../../components/Functions/MonthTotal";

import { Skeleton } from "@mui/material";

import { ThemeContext } from "styled-components";

export default function SummaryResume(props) {
  const auth = useAuth();

  const { colors } = useContext(ThemeContext);

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
          <p style={{ color: `${colors.expense}` }}>
            Esse mês gastou <br />{" "}
            {auth.snapControl === false ? (
              <Skeleton
                style={{ marginLeft: "1vw" }}
                sx={{ bgcolor: `${colors.expense}` }}
                variant="rounded"
                width={"14vh"}
                height={15}
              />
            ) : (
              <>
                <MonthTotalExpense date={date} movements={auth.movements} /> €{" "}
              </>
            )}
          </p>
          <FaRetweet size={20} color={colors.expense} />
        </div>
      ) : (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setShowValue(!showValue)}
        >
          <p style={{ color: `${colors.receipt}` }}>
            Esse mês ganhou <br />
            <MonthTotalReceipt date={date} movements={auth.movements} /> €
          </p>
          <FaRetweet size={20} color={colors.receipt} />
        </div>
      )}
    </>
  );
}
