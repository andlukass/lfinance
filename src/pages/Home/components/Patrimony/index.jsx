import { ContainerTop } from "../../../../services/styling/styles";
import { useState, useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useAuth } from "../../../../contexts/auth";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase";

export default function Patrimony() {
  const auth = useAuth();

  const [showValue, setShowValue] = useState(false);

  const [accBalance, setAccBalance] = useState(0);

  const userRef = doc(db, `users/${auth.userEmail}`);

  useEffect(() => {
    if (auth.userEmail) {
      balance();
    }
  });

  async function balance() {
    onSnapshot(userRef, (doc) => {
      if (doc.data() !== undefined) {
        const values = Object.values(doc.data());
        const total = values.reduce((prev, curr) => prev + curr, 0);
        setAccBalance(parseFloat(total).toFixed(2).replace(".", ","));
      } else {
        setAccBalance(0);
      }
    });
  }

  return (
    <ContainerTop>
      {showValue ? (
        <>
          <p>
            Olá {auth.userName}, você tem <br /> {accBalance} € em suas contas
          </p>
          <AiOutlineEyeInvisible
            onClick={() => setShowValue(!showValue)}
            size={30}
          />
        </>
      ) : (
        <>
          <p>
            Olá {auth.userName}, você tem <br /> ******* € em suas contas
          </p>
          <AiOutlineEye onClick={() => setShowValue(!showValue)} size={30} />
        </>
      )}
    </ContainerTop>
  );
}
