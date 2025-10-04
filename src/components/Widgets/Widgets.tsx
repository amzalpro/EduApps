const Widgets = () => (
  <section className="space-y-4">
    <header>
      <h3 className="text-xl font-semibold text-slate-800">Widgets</h3>
      <p className="text-sm text-slate-500">
        Lancez rapidement vos outils complémentaires : dictionnaire, QR codes, annuaires.
      </p>
    </header>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {['QR Code', 'Dictionnaire', 'Jeux éducatifs', 'Ressources en ligne', 'Messagerie rapide'].map((widget) => (
        <div key={widget} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600">
          <h4 className="mb-2 text-base font-semibold text-slate-700">{widget}</h4>
          <p>Fonctionnalité prochaine : configurez vos favoris et partagez-les avec vos classes.</p>
        </div>
      ))}
    </div>
  </section>
);

export default Widgets;
