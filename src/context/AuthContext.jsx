import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

// Contexto
// eslint-disable-next-line react-refresh/only-export-components
export const AuthCtx = createContext(null);

// Proveedor
export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoad ] = useState(true);

  useEffect(
    () => onAuthStateChanged(auth, u => { setUser(u); setLoad(false); }),
    []
  );

  const login    = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
  const register = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
  const logout   = ()             => signOut(auth);

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
