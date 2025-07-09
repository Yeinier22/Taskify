import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useTask } from "../hooks/useTask";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { tasks, addTask, toggleTask, deleteTask } = useTask(user?.uid);

  const [newTitle, setNewTitle] = useState("");
  const [loadingLogout, setLoadingLogout] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTitle);
    setNewTitle("");
  };

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await logout(); // <-- tu función que hace signOut(auth)
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hello {user?.email}</h2>
        <button
          onClick={handleLogout}
          disabled={loadingLogout}
          title="Cerrar sesión"
          className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          {loadingLogout ? "Signing out…" : "Logout"}
        </button>
      </header>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task"
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t)}
              className="h-4 w-4 accent-blue-600 cursor-pointer"
            />
            <span
              className={
                t.done ? "line-through text-gray-500" : "text-gray-900"
              }
            >
              {t.title}
            </span>
            <button
              onClick={() => {
                if (confirm("¿Delete this task?")) deleteTask(t.id);
              }}
              className="flex items-center text-red-500 hover:text-red-700 focus:outline-none"
              title="Delete task"
            >
              <button
                role="img"
                aria-label="Delete"
                className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              <span className="sr-only">Delete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
