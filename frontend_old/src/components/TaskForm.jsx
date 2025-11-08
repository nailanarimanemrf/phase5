import React, { useState, useEffect } from 'react'

export default function TaskForm({ onSave, initial }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [deadline, setDeadline] = useState(initial?.deadline ? initial.deadline.split('T')[0] : '')

  useEffect(() => {
    setTitle(initial?.title || '')
    setDescription(initial?.description || '')
    setDeadline(initial?.deadline ? initial.deadline.split('T')[0] : '')
  }, [initial])

  const submit = (e) => {
    e.preventDefault()
    onSave({ title, description, deadline })
    setTitle(''); setDescription(''); setDeadline('')
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="w-full px-4 py-3 rounded-xl border border-gray-200" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full px-4 py-3 rounded-xl border border-gray-200" rows={3} />
      <div className="flex gap-2 items-center">
        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="px-4 py-3 rounded-xl border border-gray-200" />
        <button className="bg-[#c28a63] text-white px-4 py-2 rounded-2xl shadow-lg">Enregistrer</button>
      </div>
    </form>
  )
}
