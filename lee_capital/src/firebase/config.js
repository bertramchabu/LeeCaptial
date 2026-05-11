// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhElVstkw0PxBdLuKg9xNZm6QmFBTPsa4",
  authDomain: "merkel-ke.firebaseapp.com",
  projectId: "merkel-ke",
  storageBucket: "merkel-ke.firebasestorage.app",
  messagingSenderId: "589080355590",
  appId: "1:589080355590:web:851a77872b4b40fe603487",
  measurementId: "G-XVZTGTGBCT"
};

// Initialize Firebase
import { getAuth } from "firebase/auth";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);