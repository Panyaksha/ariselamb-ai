// @/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmMjhjVkPiIO8XJUmKjbeFtUED82gbpG8",
  authDomain: "ariselambapi.firebaseapp.com",
  databaseURL: "https://ariselambapi-default-rtdb.firebaseio.com",
  projectId: "ariselambapi",
  storageBucket: "ariselambapi.firebasestorage.app",
  messagingSenderId: "442333111232",
  appId: "1:442333111232:web:80cfcccc5e7b79bd5fde25",
  measurementId: "G-EQ7PP7LHCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);