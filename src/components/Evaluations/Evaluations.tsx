const Evaluations = () => (
  <section className="space-y-4">
    <header>
      <h3 className="text-xl font-semibold text-slate-800">Évaluations</h3>
      <p className="text-sm text-slate-500">
        Configurez vos grilles par compétences, notes et bilans périodiques.
      </p>
    </header>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Compétences</h4>
        <p className="text-sm text-slate-600">Définissez des référentiels (A-D) et associez-les à vos classes.</p>
      </div>
      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Notes</h4>
        <p className="text-sm text-slate-600">Ajoutez des évaluations chiffrées avec coefficients et pondérations.</p>
      </div>
      <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Bilans</h4>
        <p className="text-sm text-slate-600">Générez rapidement des bilans par trimestre et personnalisez vos modèles de lettres.</p>
      </div>
    </div>
  </section>
);

export default Evaluations;
