import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

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

export const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
});
