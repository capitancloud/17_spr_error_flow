import { Shield, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';

/**
 * InfoSection - Sezione educativa sui principi della gestione errori.
 */
export function InfoSection() {
  const principles = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Sicurezza Prima di Tutto',
      description: 'Mai esporre stack trace, query SQL o percorsi di file agli utenti. Queste informazioni aiutano gli attaccanti.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'Separazione dei Contesti',
      description: 'Messaggi diversi per utenti e sviluppatori. L\'utente vuole sapere cosa fare, lo sviluppatore vuole sapere perché.',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Gestione Graceful',
      description: 'Anche quando tutto va storto, l\'esperienza utente deve rimanere dignitosa. Niente schermate bianche!',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: 'Azioni Concrete',
      description: 'Ogni errore dovrebbe suggerire cosa fare dopo. "Riprova", "Contatta il supporto", "Controlla i dati".',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <section id="learn" className="py-12 border-t border-border/50">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Perché la Gestione Errori è Cruciale
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Un buon sistema di gestione errori è la differenza tra un'app professionale
          e un prototipo. Ecco i principi fondamentali:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${principle.bgColor} ${principle.color}`}>
                {principle.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Code comparison */}
      <div className="mt-10 p-6 rounded-xl bg-muted/30 border border-border/50">
        <h3 className="font-semibold text-foreground mb-4 text-center">
          ❌ vs ✅ Esempio Pratico
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <div className="text-xs text-destructive font-medium mb-2">❌ MAI FARE COSÌ</div>
            <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`// Errore esposto all'utente
catch (err) {
  alert(err.stack);
  // Mostra: "TypeError at /app/db.js:42"
}`}
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/30">
            <div className="text-xs text-success font-medium mb-2">✅ FARE COSÌ</div>
            <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
{`// Messaggio user-friendly + log interno
catch (err) {
  logger.error(err); // Solo per devs
  showToast("Ops! Riprova più tardi.");
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
