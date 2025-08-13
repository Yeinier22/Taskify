import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useTask } from "../hooks/useTask";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTaskTitle,
    updateTaskPriority,
    addTag,
    removeTag,
  } = useTask(user?.uid);

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const PRIORITIES = ["low", "medium", "high"]; // UI options

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTitle);
    setNewTitle("");
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white relative p-4 max-w-md mx-auto">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hello {user?.email}</h2>
        <button
          onClick={logout}
          title="Cerrar sesión"
          className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          Logout
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
          <li key={t.id} className="flex flex-col gap-2 border rounded p-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!t.done}
                onChange={() => toggleTask(t)}
                className="h-4 w-4 accent-blue-600 cursor-pointer"
              />
              {editingId === t.id ? (
                <input
                  className="flex-1 border p-1 rounded bg-transparent text-inherit"
                  value={editingValue}
                  autoFocus
                  onChange={(e) => setEditingValue(e.target.value)}
                  onBlur={async () => {
                    if (editingValue.trim() && editingValue !== t.title) {
                      await updateTaskTitle(t.id, editingValue);
                    }
                    setEditingId(null);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      if (editingValue.trim() && editingValue !== t.title) {
                        await updateTaskTitle(t.id, editingValue);
                      }
                      setEditingId(null);
                    } else if (e.key === "Escape") {
                      setEditingId(null);
                    }
                  }}
                />
              ) : (
                <span
                  className={
                    t.done
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }
                  onClick={() => {
                    setEditingId(t.id);
                    setEditingValue(t.title);
                  }}
                  title="Click to edit"
                  style={{ cursor: "pointer" }}
                >
                  {t.title}
                </span>
              )}

              <div className="ml-auto flex items-center gap-2">
                <label className="text-xs text-gray-500">Priority</label>
                <select
                  className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
                  value={(t.priority || "medium").toLowerCase()}
                  onChange={(e) => updateTaskPriority(t.id, e.target.value)}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  if (confirm("¿Delete this task?")) deleteTask(t.id);
                }}
                className="ml-2 flex items-center text-red-500 hover:text-red-700 focus:outline-none"
                title="Delete task"
              >
                <span role="img" aria-label="Delete" className="text-gray-500 hover:text-red-600 transition-colors cursor-pointer">
                  <TrashIcon className="h-5 w-5" />
                </span>
                <span className="sr-only">Delete</span>
              </button>
            </div>

            {/* Tags section */}
            <div className="flex flex-wrap items-center gap-2 pl-6">
              {(t.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                >
                  {tag}
                  <button
                    className="ml-1 text-gray-500 hover:text-red-600"
                    title="Remove tag"
                    onClick={() => removeTag(t.id, tag)}
                  >
                    ×
                  </button>
                </span>
              ))}

              <TagInput key={`tag-input-${t.id}`} onAdd={(val) => addTag(t.id, val)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TagInput({ onAdd }) {
  const [val, setVal] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (val.trim()) {
          onAdd(val.trim());
          setVal("");
        }
      }}
      className="flex items-center gap-1 text-xs"
    >
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Add tag"
        className="border rounded px-2 py-1 bg-white dark:bg-gray-900"
      />
      <button className="px-2 py-1 rounded bg-blue-600 text-white">Add</button>
    </form>
  );
}
