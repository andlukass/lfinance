import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import { getAuth, signInWithPopup } from "firebase/auth";
import { provider, app, db } from "../services/firebase";

import {
  collection,
  onSnapshot,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [userName, setUserName] = useLocalStorage("userName", null);
  const [userEmail, setUserEmail] = useLocalStorage("userEmail", null);
  const [userPhoto, setUserPhoto] = useLocalStorage("userPhoto", null);

  const userRef = doc(db, "users", `${userEmail}`);
  const movRef = collection(db, `users/${userEmail}/movements`);
  const [movements, setMovements] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [snapControl, setSnapControl] = useState(false);

  //================================================================
  async function signIn() {
    const auth = getAuth(app);
    await signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setUserEmail(user.email);
      setUserName(user.displayName);
      setUserPhoto(user.photoURL);
    });
  }

  //================================================================
  async function signOut() {
    const auth = getAuth(app);
    signOut(auth);
    setUserName(null);
    setUserEmail(null);
    setUserPhoto(null);
    setSnapControl(false);
  }

  //================================================================

  function getMovements() {
    onSnapshot(movRef, (snapshot) => {
      let tempMov = [];
      snapshot.docs.forEach((doc) => {
        tempMov.push({
          id: doc.id,
          desc: doc.data().description,
          account: doc.data().account,
          date: new Date(doc.data().date.seconds * 1000),
          value: doc.data().value,
          type: doc.data().isExpense ? "Gastou" : "Recebeu",
          prep: doc.data().isExpense ? "em" : "de",
          isExpense: doc.data().isExpense,
        });
      });
      setMovements(tempMov.sort(movementsByOrder));
      setSnapControl(true);
    });
  }
  function movementsByOrder(a, b) {
    return a.date < b.date; // coloca a requisição do bd em ordem decrescente
  }

  //================================================================

  async function getAccounts() {
    getDoc(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.keys(snapshot.data());
        setAccounts(data);
      } else {
        setDoc(userRef, { dinheiro: 0 });
      }
    });
  }

  //================================================================

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        getMovements,
        getAccounts,
        userEmail,
        userName,
        userPhoto,
        movements,
        accounts,
        snapControl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
