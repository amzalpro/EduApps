import { FormEvent, useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string, role: 'enseignant' | 'admin') => Promise<boolean> | boolean;
  error?: string | null;
}

const Login = ({ onLogin, error }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'enseignant' | 'admin'>('enseignant');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setLocalError(null);

    try {
      const success = await onLogin(username.trim(), password, role);
      if (!success) {
        setLocalError('Connexion refusée. Vérifiez vos identifiants.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">Connexion EduApps</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-600">
              Identifiant
            </label>
            <input
              id="username"
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-600">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium text-slate-600">Rôle</span>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  name="role"
                  value="enseignant"
                  checked={role === 'enseignant'}
                  onChange={() => setRole('enseignant')}
                />
                Enseignant
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                />
                Admin
              </label>
            </div>
          </div>

          {(error || localError) && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error || localError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
