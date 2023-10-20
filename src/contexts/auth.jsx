import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import { getAuth, signInWithPopup, signOut } from "firebase/auth";
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
  const fbAuth = getAuth(app);

  const [userName, setUserName] = useLocalStorage("userName", null);
  const [userEmail, setUserEmail] = useLocalStorage("userEmail", null);
  const [userPhoto, setUserPhoto] = useLocalStorage("userPhoto", null);

  const userRef = doc(db, "users", `${userEmail}`);
  const movRef = collection(db, `users/${userEmail}/movements`);
  const [movements, setMovements] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [snapControl, setSnapControl] = useState(false);
  const [movementsModalCtrl, setMovementsModalCtrl] = useState('hide');
  const [movementEdit, setMovementEdit] = useState({});

  //================================================================
  async function signInUser() {
    await signInWithPopup(fbAuth, provider);
    const user = fbAuth.currentUser;
    setUserEmail(user.email);
    setUserName(user.displayName);
    setUserPhoto(user.photoURL);
  }

  //================================================================
  async function signOutUser() {
    signOut(fbAuth);
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

  	function handleMovementModal(movement) {
		if (movementsModalCtrl === 'hide') {
			setMovementsModalCtrl('show')
			setMovementEdit(movement)
		}
		if (movementsModalCtrl === 'show') {
			setMovementsModalCtrl('hide')
			setMovementEdit({})
		}
	}
  //================================================================

  return (
    <AuthContext.Provider
      value={{
        signInUser,
        signOutUser,
        getMovements,
        getAccounts,
        userEmail,
        userName,
        userPhoto,
        movements,
        accounts,
        snapControl,
		movementsModalCtrl,
		handleMovementModal,
		movementEdit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
