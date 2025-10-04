export type TabId =
  | 'dashboard'
  | 'classroom'
  | 'evaluations'
  | 'schoollife'
  | 'protocols'
  | 'widgets'
  | 'configuration';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TAB_ITEMS: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Tableau de bord' },
  { id: 'classroom', label: 'Plan de classe' },
  { id: 'evaluations', label: 'Évaluations' },
  { id: 'schoollife', label: 'Vie scolaire' },
  { id: 'protocols', label: 'Protocoles' },
  { id: 'widgets', label: 'Widgets' },
  { id: 'configuration', label: 'Configuration' },
];

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => (
  <nav className="flex gap-1 rounded-xl bg-slate-100 p-1">
    {TAB_ITEMS.map((item) => {
      const isActive = item.id === activeTab;
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onTabChange(item.id)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive
              ? 'bg-white text-indigo-600 shadow'
              : 'text-slate-600 hover:bg-white hover:text-indigo-600'
          }`}
        >
          {item.label}
        </button>
      );
    })}
  </nav>
);
