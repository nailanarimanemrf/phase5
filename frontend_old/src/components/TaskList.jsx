import React from 'react'

export default function TaskList({ tasks, onDelete, onEdit, onToggleComplete }) {
  return (
    <div className="space-y-4 mt-4">
      {tasks.length === 0 && <div className="text-sm text-gray-600">Aucune tâche pour le moment. Ajoute-en une !</div>}
      {tasks.map(task => (
        <div key={task._id} className="bg-white p-4 rounded-2xl shadow-lg flex justify-between items-start">
          <div className="flex-1 flex items-start gap-3">
            <button onClick={() => onToggleComplete(task)}
              className={`w-8 h-8 rounded-full border ${task.completed ? 'bg-[#c28a63] text-white' : 'bg-transparent'}`}>
              {task.completed ? '✓' : ''}
            </button>
            <div>
              <div className="font-semibold">{task.title}</div>
              <div className="text-sm text-gray-600">{task.description}</div>
              <div className="text-xs text-gray-500 mt-1">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'Sans date'}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button onClick={() => onEdit(task)} className="text-sm px-3 py-1 rounded-xl border">Modifier</button>
            <button onClick={() => onDelete(task._id)} className="text-sm px-3 py-1 rounded-xl border text-red-600">Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  )
}
