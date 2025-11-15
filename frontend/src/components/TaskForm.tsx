import React, { useState } from "react";
import API from "../api/api";

export default function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await API.post("/tasks", { title, description, dueDate });
      setTitle("");
      setDescription("");
      setDueDate("");
      onTaskCreated();
    } catch (err) {
      alert("Erreur lors de l'ajout");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="p-2 rounded border"
        placeholder="Titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="p-2 rounded border"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="p-2 rounded border"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />

      <button className="bg-[var(--accent)] text-white py-2 rounded">Ajouter</button>
    </form>
  );
}
