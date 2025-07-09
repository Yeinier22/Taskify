// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwhO8G_kqRqKRC77sqxpY5zVWOQKoLplU",
  authDomain: "taskify-55e73.firebaseapp.com",
  projectId: "taskify-55e73",
  storageBucket: "taskify-55e73.firebasestorage.app",
  messagingSenderId: "1045001575918",
  appId: "1:1045001575918:web:92783664651c48614842ff",
  measurementId: "G-BYR8H2MNVB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 4. Crea instancias para usar en tu app
export const auth = getAuth(app);    // Para login, register, logout, etc.
export const db = getFirestore(app);  // Si usarás Firestore para guardar datos (tareas, etc.)
