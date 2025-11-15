import React, { useEffect, useState } from "react";
import API from "../api/api";

interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: string;
}

export default function TaskList({ refresh }: { refresh: boolean }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("dateAsc");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    try {
      const params: any = {
        status: statusFilter,
        sort: sortOrder,
      };
      if (searchQuery) params.search = searchQuery;

      const tasks = await API.get("/tasks", params);
setTasks(tasks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh, statusFilter, sortOrder, searchQuery]);

  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
  };

  const handleEditSave = async (id: string) => {
    try {
      const updatedTask = {
        title: editTitle,
        description: editDescription,
        dueDate: editDueDate || null,
      };
      await API.put(`/tasks/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task)));
      setEditingTaskId(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la modification");
    }
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filtre et tri */}
      <div className="flex gap-2 flex-wrap mb-4">
        <select
          className="p-2 rounded border border-[var(--border)]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tous</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>

        <select
          className="p-2 rounded border border-[var(--border)]"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="dateAsc">Date croissante</option>
          <option value="dateDesc">Date décroissante</option>
        </select>

        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded border border-[var(--border)] flex-1"
        />
      </div>

      {tasks.map((task) => (
        <div
          key={task._id}
          className="task-item flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[var(--card)] border border-[var(--border)] p-4 rounded-xl"
        >
          {editingTaskId === task._id ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                className="p-2 rounded border border-[var(--border)]"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="p-2 rounded border border-[var(--border)]"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <input
                type="date"
                className="p-2 rounded border border-[var(--border)]"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="bg-[var(--accent)] text-white px-3 py-1 rounded hover:bg-[var(--accent-hover)]"
                  onClick={() => handleEditSave(task._id)}
                >
                  Sauvegarder
                </button>
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  onClick={handleEditCancel}
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1 w-full max-w-[80%]">
                {task.dueDate && (
                  <small className="text-gray-500 font-semibold">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </small>
                )}
                <h3 className="font-bold text-[var(--primary)]">{task.title}</h3>
                {task.description && <p className="text-gray-700">{task.description}</p>}
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  className="bg-[var(--accent)] text-white px-3 py-1 rounded hover:bg-[var(--accent-hover)]"
                  onClick={() => handleEditClick(task)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(task._id)}
                >
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
