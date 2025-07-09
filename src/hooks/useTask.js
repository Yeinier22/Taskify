import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useState } from "react";
import { useEffect } from "react";

/**
 * Custom hook that returns the current user's task list in real time
 * and exposes helpers to add, toggle and delete tasks.
 * @param {string|null} uid - user id from Firebase Auth
 */

export function useTask(uid) {
  const [tasks, setTask] = useState([]);


  // ---- READ (real‑time) ----------------------------------------------
  useEffect(() => {
    if (!uid) return; // the user may be null while loading

    const q = query(
      collection(db, "users", uid, "task"),
      orderBy("created", "desc")
    );

    // onSnapshot listens in real time
    const unsubscribe = onSnapshot(q, (snap) => {
      setTask(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsubscribe; //cleanup
  }, [uid]);

  // ---- ADD -----------------------------------------------------------
  async function addTask(title) {
    if (!uid || !title.trim()) return;

    await addDoc(collection(db, "users", uid, "task"), {
      title: title.trim(),
      done: false,
      created: serverTimestamp(),
    });
  }

  // ---- TOGGLE (update) ------------------------------------------
  async function toggleTask(task) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "task", task.id);
    await updateDoc(ref, { done: !task.done });
  }

  // ---- DELETE --------------------------------------------------------
  async function deleteTask(taskId) {
    if (!uid) return;
    const ref = doc(db, "users", uid, "task", taskId);
    await deleteDoc(ref);
  }

  return { tasks, addTask, toggleTask, deleteTask };
}
