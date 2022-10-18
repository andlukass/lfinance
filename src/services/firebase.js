// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqkqDmiODRTNxinEkBhhVk2a4NF8-L-2M",
  authDomain: "lfinance.app",
  databaseURL:
    "https://lfinance-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lfinance",
  storageBucket: "lfinance.appspot.com",
  messagingSenderId: "495399581582",
  appId: "1:495399581582:web:5f83292b63ba993c8b56df",
  measurementId: "G-Q1EWCHS2RN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
