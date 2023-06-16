// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaA3d0HrRQw-VJj0zI8raBNLSm9AO5Mv0",
  authDomain: "app-bestoddadvisor.firebaseapp.com",
  projectId: "app-bestoddadvisor",
  storageBucket: "app-bestoddadvisor.appspot.com",
  messagingSenderId: "243043404832",
  appId: "1:243043404832:web:6ed5842e446d3459798045",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);

export const available_oddTypes = 'available_oddTypes';
export const available_leagues  = 'available_leagues';
export const dailyGames         = 'dailyGames';
export const favourite_teams    = 'favourite_teams';
export const users              = 'users';