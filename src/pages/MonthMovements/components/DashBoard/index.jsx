import { useState, useEffect } from "react";

import { useAuth } from "../../../../contexts/auth";

import SummaryResume from "../../../Home/components/Summary/components/SummaryResume";
import { MonthTotalBalance } from "../../../../components/Functions/MonthTotal";
import {
  DashBoardContainer,
  BalanceContainer,
  SummaryContainer,
  ValueContainer,
} from "./styles";

export default function DashBoard(props) {
  const auth = useAuth();

  const [balanceStyle, setBalanceStyle] = useState();

  function getBalanceStyle() {
    if (
      MonthTotalBalance({ date: props.date, movements: auth.movements }) < 0
    ) {
      setBalanceStyle("expense");
    } else {
      setBalanceStyle("receipt");
    }
  }

  useEffect(() => {
    getBalanceStyle();
  });

  return (
    <>
      <DashBoardContainer>
        <BalanceContainer>
          <p>
            saldo do <br />
            mês
          </p>
          <ValueContainer>
            <p className={balanceStyle}>
              <MonthTotalBalance date={props.date} movements={auth.movements} />{" "}
              €
            </p>
          </ValueContainer>
        </BalanceContainer>
        <SummaryContainer>
          <p>
            resumo do <br /> mês
          </p>
          <ValueContainer>
            <SummaryResume date={props.date} />
          </ValueContainer>
        </SummaryContainer>
      </DashBoardContainer>
    </>
  );
}
