import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../services/firebase";

import { app } from "../services/firebase";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [userName, setUserName] = useLocalStorage("userName", null);
  const [userEmail, setUserEmail] = useLocalStorage("userEmail", null);
  const [userPhoto, setUserPhoto] = useLocalStorage("userPhoto", null);

  //================================================================
  async function signIn() {
    const auth = getAuth(app);
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setUserEmail(user.email);
      setUserName(user.displayName);
      setUserPhoto(user.photoURL);
      navigate("Home", { state: { title: "Lfinance" } });
    });
  }

  //================================================================
  async function getUser() {}

  //================================================================
  async function signOut() {
    navigate("/");
    const auth = getAuth(app);
    signOut(auth);
    setUserName(null);
    setUserEmail(null);
    setUserPhoto(null);
  }

  //================================================================
  async function verifyNewUser() {}

  //================================================================

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        getUser,
        verifyNewUser,
        userEmail,
        userName,
        userPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
