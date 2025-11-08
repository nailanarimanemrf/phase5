import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API, { setAuthToken } from '../api/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/auth/login', { email, password })
      localStorage.setItem('taskifyyToken', data.token)
      setAuthToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la connexion')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--bg)] px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-[var(--card)] p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-[var(--primary)] mb-4">
          Connexion
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 rounded-xl border border-[var(--border)] w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 rounded-xl border border-[var(--border)] w-full"
        />
        <button
          type="submit"
          className="bg-[var(--accent)] text-white py-3 px-4 rounded-xl font-medium hover:bg-[var(--accent-hover)] transition"
        >
          Se connecter
        </button>

        <p className="text-center text-sm text-[var(--primary)] mt-2">
          Pas de compte ?{' '}
          <Link to="/register" className="text-[var(--accent)] font-semibold hover:text-[var(--accent-hover)]">
            S'inscrire
          </Link>
        </p>
      </form>
    </div>
  )
}
