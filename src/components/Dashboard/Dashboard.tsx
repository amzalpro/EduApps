const Dashboard = () => (
  <section className="space-y-4">
    <header>
      <h3 className="text-xl font-semibold text-slate-800">Tableau de bord</h3>
      <p className="text-sm text-slate-500">
        Vue synthétique des emplois du temps, rappels et tâches à venir.
      </p>
    </header>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Emploi du temps</h4>
        <p className="text-sm text-slate-600">Importez un fichier iCal pour visualiser vos cours de la semaine.</p>
      </div>
      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Rappels rapides</h4>
        <p className="text-sm text-slate-600">Créez des rappels pour les réunions parents-profs, devoirs et suivis.</p>
      </div>
    </div>
  </section>
);

export default Dashboard;
