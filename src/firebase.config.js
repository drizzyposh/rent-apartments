import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCilKQhct1ZNObajtUUNmMB54Ecxmp-OJE",
  authDomain: "hosue-marketplace-app.firebaseapp.com",
  projectId: "hosue-marketplace-app",
  storageBucket: "hosue-marketplace-app.appspot.com",
  messagingSenderId: "832907788278",
  appId: "1:832907788278:web:b796a824f88f74e56f91d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()