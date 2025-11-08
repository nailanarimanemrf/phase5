import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API, { setAuthToken } from '../api/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/auth/register', { name, email, password })
      localStorage.setItem('taskifyyToken', data.token)
      setAuthToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'inscription")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--bg)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[var(--card)] p-6 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-[var(--primary)] mb-4">Inscription</h1>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 rounded-lg border border-[var(--border)]"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 rounded-lg border border-[var(--border)]"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 rounded-lg border border-[var(--border)]"
        />
        <button type="submit" className="bg-[var(--accent)] text-white py-2 px-4 rounded-lg hover:bg-[var(--accent-hover)] transition font-medium">
          S'inscrire
        </button>
      </form>
    </div>
  )
}
