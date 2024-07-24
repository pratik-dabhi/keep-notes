import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const {VITE_APP_APIKEY , VITE_APP_AUTHDOMAIN , VITE_APP_PROJECTID , VITE_APP_STORAGEBUCKET , VITE_APP_MESSAGINGSENDERID , VITE_APP_APPID ,VITE_APP_MEASUREMENTID} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_APP_APIKEY,
  authDomain: VITE_APP_AUTHDOMAIN,
  projectId: VITE_APP_PROJECTID,
  storageBucket: VITE_APP_STORAGEBUCKET,
  messagingSenderId: VITE_APP_MESSAGINGSENDERID,
  appId: VITE_APP_APPID,
  measurementId: VITE_APP_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
