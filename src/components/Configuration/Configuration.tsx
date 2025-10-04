const Configuration = () => (
  <section className="space-y-4">
    <header>
      <h3 className="text-xl font-semibold text-slate-800">Configuration</h3>
      <p className="text-sm text-slate-500">
        Personnalisez votre compte, importez des données et adaptez EduApps à votre établissement.
      </p>
    </header>

    <ul className="space-y-3 text-sm text-slate-600">
      <li className="rounded-lg border border-slate-200 p-4">
        <span className="font-semibold text-slate-700">Informations personnelles</span>
        <p>Mettez à jour vos coordonnées et celles de l'établissement.</p>
      </li>
      <li className="rounded-lg border border-slate-200 p-4">
        <span className="font-semibold text-slate-700">Importations</span>
        <p>Importez vos élèves (CSV) et emploi du temps (iCal) pour alimenter les modules.</p>
      </li>
      <li className="rounded-lg border border-slate-200 p-4">
        <span className="font-semibold text-slate-700">Apparence et sécurité</span>
        <p>Choisissez vos thèmes, configurez les périodes scolaires et ajustez les paramètres de sécurité.</p>
      </li>
    </ul>
  </section>
);

export default Configuration;
