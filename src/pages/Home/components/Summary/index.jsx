import { useContext, useState, useEffect } from "react";
import { DownContainer } from "../../../../services/styling/styles";

import { FaRetweet } from "react-icons/fa";

import { AuthContext } from "../../../../contexts/auth";

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";

import { Link } from "react-router-dom";

export default function Summary() {
  const { userEmail } = useContext(AuthContext);

  const [showValue, setShowValue] = useState(true); //trocar de despesa para ganho

  const [translatedDate, setTranslatedDate] = useState(); //traduz a data de numero para PT-BR

  const [receipt, setReceipt] = useState(0);
  const [expense, setExpense] = useState(0);

  const movRef = collection(db, `users/${userEmail}/movements`);

  //constantes para controle de data
  const fullDate = new Date();
  const monthDays = new Date(
    fullDate.getFullYear(),
    fullDate.getMonth() + 1,
    0
  ); //0 pega o ultimo dia do mes
  const start = new Date(
    fullDate.getFullYear() + "/" + (fullDate.getMonth() + 1) + "/" + 1
  );
  const end = new Date(
    fullDate.getFullYear() +
      "/" +
      (fullDate.getMonth() + 1) +
      "/" +
      monthDays.getDate()
  );

  useEffect(() => {
    if (userEmail) {
      getMonthTotal();
    }
    translateDate();
  });

  async function getMonthTotal() {
    const q = query(
      movRef,
      where("date", ">=", start),
      where("date", "<=", end)
    );

    onSnapshot(q, (snapshot) => {
      let Tempmovements = [];
      snapshot.docs.forEach((doc) => {
        Tempmovements.push({
          id: doc.id,
          desc: doc.data().isExpense,
          value: doc.data().value,
        });
      });

      const expenseFiltered = Tempmovements.filter(
        (desc) => desc["desc"] === true
      );
      const expenseResult = expenseFiltered.reduce(
        (a, b) => a + (b["value"] || 0),
        0
      );
      setExpense(parseFloat(expenseResult).toFixed(2).replace(".", ","));

      const receiptFiltered = Tempmovements.filter(
        (desc) => desc["desc"] === false
      );
      const receiptResult = receiptFiltered.reduce(
        (a, b) => a + (b["value"] || 0),
        0
      );
      setReceipt(parseFloat(receiptResult).toFixed(2).replace(".", ","));
    });
  }

  function translateDate() {
    const date = new Date();
    if (date.getMonth() + 1 === 1) {
      setTranslatedDate("JANEIRO/" + date.getFullYear());
    } else if (date.getMonth() + 1 === 2) {
      setTranslatedDate(
        "FEVEREIRO/" + date.getFullYear().toString().substring(2)
      );
    } else if (date.getMonth() + 1 === 3) {
      setTranslatedDate("MARÇO/" + date.getFullYear().toString().substring(2));
    } else if (date.getMonth() + 1 === 4) {
      setTranslatedDate("ABRIL/" + date.getFullYear().toString().substring(2));
    } else if (date.getMonth() + 1 === 5) {
      setTranslatedDate("MAIO/" + date.getFullYear().toString().substring(2));
    } else if (date.getMonth() + 1 === 6) {
      setTranslatedDate("JUNHO/" + date.getFullYear().toString().substring(2));
    } else if (date.getMonth() + 1 === 7) {
      setTranslatedDate("JULHO/" + date.getFullYear().toString().substring(2));
    } else if (date.getMonth() + 1 === 8) {
      setTranslatedDate("AGOSTO/" + date.getFullYear().toString().substring(2));
    } else if (date.getMonth() + 1 === 9) {
      setTranslatedDate(
        "SETEMBRO/" + date.getFullYear().toString().substring(2)
      );
    } else if (date.getMonth() + 1 === 10) {
      setTranslatedDate(
        "OUTUBRO/" + date.getFullYear().toString().substring(2)
      );
    } else if (date.getMonth() + 1 === 11) {
      setTranslatedDate(
        "NOVEMBRO/" + date.getFullYear().toString().substring(2)
      );
    } else if (date.getMonth() + 1 === 12) {
      setTranslatedDate(
        "DEZEMBRO/" + date.getFullYear().toString().substring(2)
      );
    }
  }
  return (
    <>
      <DownContainer>
        <Link to="/MonthMovements">
          <p>{translatedDate}</p>
        </Link>
        {showValue ? (
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => setShowValue(!showValue)}
          >
            <p className="expense">
              Esse mês gastou <br /> {expense} €
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
              {receipt} €
            </p>
            <FaRetweet size={20} color="#c5f4b0" />
          </div>
        )}
      </DownContainer>
    </>
  );
}
