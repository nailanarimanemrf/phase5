import React, { useState } from "react";
import API from "../api/api";

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // <-- renommé

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await API.post("/tasks", { title, description, dueDate }); // <-- correspond au backend
      setTitle("");
      setDescription("");
      setDueDate("");
      onTaskCreated();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la tâche");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Titre de la tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded border border-[var(--border)]"
      />

      <textarea
        placeholder="Description (optionnel)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded border border-[var(--border)]"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 rounded border border-[var(--border)]"
      />

      <button
        type="submit"
        className="bg-[var(--accent)] text-white py-2 px-4 rounded hover:bg-[var(--accent-hover)] transition font-medium"
      >
        Ajouter une tâche
      </button>
    </form>
  );
}
