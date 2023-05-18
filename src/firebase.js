// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAoZ2FrHEYvmzwzewofWINgBIbvS4F9CY",
  authDomain: "fir-e47b1.firebaseapp.com",
  projectId: "fir-e47b1",
  storageBucket: "fir-e47b1.appspot.com",
  messagingSenderId: "242508987863",
  appId: "1:242508987863:web:b384757721d5ef8b5edf92",
  measurementId: "G-ZP6YGVRZF7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig