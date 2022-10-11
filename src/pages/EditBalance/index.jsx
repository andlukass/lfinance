import {
  BackGroundContainer,
  MasterContainer,
} from "../../services/styling/styles";

import HeaderEditBalance from "../../components/Header/HeaderEditBalance";

import { useAuth } from "../../contexts/auth";

import { useContext, useState, useEffect } from "react";

import {
  collection,
  doc,
  updateDoc,
  addDoc,
  getDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

export default function EditBalance() {
  const auth = useAuth();

  const [accounts, setAccounts] = useState([]);

  const userRef = doc(db, `users/${auth.userEmail}`);

  useEffect(() => {
    getAccounts();
  });

  async function getAccounts() {
    getDoc(userRef).then((snapshot) => {
      const data = snapshot.data();
      setAccounts(data);
    });
  }
  return (
    <>
      <HeaderEditBalance />
      <BackGroundContainer>
        <MasterContainer>
          {/* {accounts.map((item, index) => (
            <>
              <p>{item}</p>
              <br />
            </>
          ))} */}
        </MasterContainer>
      </BackGroundContainer>
    </>
  );
}
