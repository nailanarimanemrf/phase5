import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API, { setAuthToken } from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await API.post('/auth/login', { email, password });

      setAuthToken(data.token); // <-- FIX

      navigate('/dashboard');
    } catch (err: any) {
      alert(err.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--bg)] px-4">
      <form onSubmit={handleSubmit} className="bg-[var(--card)] p-6 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center text-[var(--primary)]">Connexion</h1>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 rounded-xl border border-[var(--border)]"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 rounded-xl border border-[var(--border)]"
          placeholder="Mot de passe"
        />

        <button className="bg-[var(--accent)] text-white py-3 rounded-xl">Se connecter</button>

        <p className="text-center text-sm">
          Pas de compte ? 
          <Link to="/register" className="text-[var(--accent)] ml-1 font-semibold">
            S’inscrire
          </Link>
        </p>
      </form>
    </div>
  );
}
