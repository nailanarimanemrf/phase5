import React, { useEffect, useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useNavigate } from 'react-router-dom'
import { setAuthToken } from '../api/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('taskifyyToken')
    if (!token) navigate('/login')
    else setAuthToken(token)
  }, [navigate])

  const handleTaskCreated = () => {
    setRefresh(!refresh)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] font-sans flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-[var(--primary)] mb-10">
        Mes Tâches ✨
      </h1>

      {/* Formulaire */}
      <div className="w-full max-w-2xl bg-[var(--card)] p-6 rounded-2xl shadow-md border border-[var(--border)] mb-8">
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>

      {/* Liste des tâches */}
      <div className="w-full max-w-2xl bg-[var(--card)] p-6 rounded-2xl shadow-md border border-[var(--border)]">
        <TaskList refresh={refresh} />
      </div>
    </div>
  )
}
