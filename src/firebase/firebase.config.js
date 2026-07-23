import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB-lKZXWNAeFtkj2weS8jUk87piTAWRxh0",
  authDomain: "hobby-hub-authentication.firebaseapp.com",
  projectId: "hobby-hub-authentication",
  storageBucket: "hobby-hub-authentication.firebasestorage.app",
  messagingSenderId: "1092081276607",
  appId: "1:1092081276607:web:d842b39f3fddad7783980a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)