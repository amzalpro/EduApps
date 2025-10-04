import { ReactNode } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { TabBar, TabId } from './TabBar';

interface MainLayoutProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onSave?: () => void;
  children: ReactNode;
}

const MainLayout = ({ activeTab, onTabChange, onSave, children }: MainLayoutProps) => {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 flex-col bg-indigo-700 p-6 text-white lg:flex">
        <div className="mb-10 space-y-1">
          <h1 className="text-xl font-semibold">EduApps</h1>
          <p className="text-sm text-indigo-100">Gestion pédagogique tout-en-un</p>
        </div>
        <div className="space-y-2">
          <TabBar activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </aside>

      <main className="flex-1">
        <header className="flex flex-col gap-4 bg-white px-6 py-4 shadow sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {user ? `Bienvenue ${user.firstName}` : 'Bienvenue'}
            </h2>
            {user && (
              <p className="text-sm text-slate-500">
                {user.role === 'admin' ? 'Administrateur' : 'Enseignant'} • {user.email}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {onSave && (
              <button
                type="button"
                onClick={onSave}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Enregistrer
              </button>
            )}
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
            >
              Déconnexion
            </button>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-4 lg:hidden">
            <TabBar activeTab={activeTab} onTabChange={onTabChange} />
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
