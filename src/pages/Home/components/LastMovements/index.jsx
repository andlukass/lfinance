import { MasterContainer } from "../../../../services/styling/styles";

import { Link } from "react-router-dom";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { useState, useEffect, useContext } from "react";

import { db } from "../../../../services/firebase";

import { AuthContext } from "../../../../contexts/auth";

export default function LastMovements() {
  const { userEmail } = useContext(AuthContext);

  const movRef = collection(db, `users/${userEmail}/movements`);
  const q = query(movRef, orderBy("date", "desc"), limit(10));

  const [movements, setMovements] = useState([]);

  useEffect(() => {
    if (userEmail) {
      getMovements();
    }
  }, [userEmail]);

  function getMovements() {
    onSnapshot(q, (snapshot) => {
      var tempMov = [];
      snapshot.forEach((doc) => {
        tempMov.push({
          id: doc.id,
          desc: doc.data().description,
          account: doc.data().account,
          date: doc.data().date,
          value: parseFloat(doc.data().value).toFixed(2).replace(".", ","),
          type: doc.data().isExpense ? "Gastou" : "Recebeu",
          prep: doc.data().isExpense ? "em" : "de",
          isExpense: doc.data().isExpense ? true : false,
        });
        setMovements(tempMov);
      });
    });
  }

  return (
    <MasterContainer>
      <h2>Ultimas Movimentações</h2>
      {movements
        .filter((item, idx) => idx < 10)
        .map((item, index) => (
          <>
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
              {" "}
              {item.type} {item.value} € {item.prep} {item.desc}
            </Link>
            <br />
            <br />
          </>
        ))}
    </MasterContainer>
  );
}
