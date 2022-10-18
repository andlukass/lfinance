import { useState, useEffect } from "react";

import {
  BackGroundContainer,
  MasterContainer,
} from "../../services/styling/styles";

import Header from "../../components/Header";

import { useAuth } from "../../contexts/auth";

import MovementsList from "../../components/MovementsList";
import DateControl from "./components/DateControl";
import DashBoard from "./components/DashBoard";

export default function MonthMovements() {
  const auth = useAuth();

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date(year, month, 0));

  const [monthMovementsList, setMonthMovementsList] = useState([]);

  useEffect(() => {
    if (auth.snapControl === false) {
      auth.getMovements();
    }
    movementsByMonth();
    setDate(new Date(year, month, 0));
  }, [month, auth.snapControl]);

  const addMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const decMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const movementsByMonth = () => {
    let start = new Date(year, month - 1, 1);
    let end = new Date(year, month - 1, date.getDate());
    let tempMov = auth.movements.filter(function (ele) {
      return ele.date >= start && ele.date <= end;
    });
    setMonthMovementsList(tempMov);
  };

  return (
    <>
      <Header />
      <BackGroundContainer>
        <MasterContainer>
          <DateControl
            actualMonth={month}
            actualYear={year}
            decMonth={decMonth}
            addMonth={addMonth}
          />

          <DashBoard date={date} />

          {monthMovementsList.length === 0 ? (
            <p>Nenhuma movimentação este mês.</p>
          ) : (
            <></>
          )}

          <MovementsList
            movements={monthMovementsList}
            index={monthMovementsList.length}
          />
        </MasterContainer>
      </BackGroundContainer>
    </>
  );
}
