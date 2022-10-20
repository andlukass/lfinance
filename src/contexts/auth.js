import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup } from "firebase/auth";
import { provider, app, db } from "../services/firebase";

import { collection, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [userName, setUserName] = useLocalStorage("userName", null);
  const [userEmail, setUserEmail] = useLocalStorage("userEmail", null);
  const [userPhoto, setUserPhoto] = useLocalStorage("userPhoto", null);

  const movRef = collection(db, `users/${userEmail}/movements`);
  const [movements, setMovements] = useState([]);
  const [snapControl, setSnapControl] = useState(false);

  //================================================================
  async function signIn() {
    const auth = getAuth(app);
    await signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setUserEmail(user.email);
      setUserName(user.displayName);
      setUserPhoto(user.photoURL);
      navigate("/home", { state: { title: "Lfinance" } });
      navigate("/home", { state: { title: "Lfinance" } });
    });
    navigate("/home", { state: { title: "Lfinance" } });
    navigate("/home", { state: { title: "Lfinance" } });
  }

  //================================================================
  async function signOut() {
    navigate("/login");
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

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        getMovements,
        userEmail,
        userName,
        userPhoto,
        movements,
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
