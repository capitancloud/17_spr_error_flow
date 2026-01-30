import { motion } from 'framer-motion';
import { Shield, Eye, AlertTriangle, CheckCircle2, Code, XCircle, ArrowRight } from 'lucide-react';

/**
 * InfoSection - Sezione educativa sui principi della gestione errori.
 */
export function InfoSection() {
  const principles = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sicurezza Prima di Tutto',
      description: 'Mai esporre stack trace, query SQL o percorsi di file agli utenti. Queste informazioni aiutano gli attaccanti a trovare vulnerabilità.',
      example: 'Se un hacker vede "/var/www/app/config/db.php" sa dove cercare le credenziali!',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Due Messaggi, Due Pubblici',
      description: 'L\'utente vuole sapere COSA FARE. Lo sviluppatore vuole sapere PERCHÉ. Messaggi diversi per esigenze diverse.',
      example: 'Utente: "Riprova più tardi" vs Dev: "Connection timeout to postgres:5432"',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Fail Gracefully',
      description: 'Anche quando tutto esplode, l\'app deve rimanere utilizzabile. Niente schermate bianche o messaggi criptici!',
      example: 'Mostra una schermata di errore bella, con opzioni per tornare indietro o contattare supporto.',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: 'Azioni Concrete',
      description: 'Ogni errore dovrebbe suggerire il prossimo passo. L\'utente non deve chiedersi "e ora?"',
      example: '"Riprova", "Torna alla home", "Contatta supporto", "Controlla la connessione"',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="learn" className="py-16 border-t border-border/50">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.span 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-4"
          animate={{ 
            boxShadow: [
              "0 0 0 0 hsl(280 80% 60% / 0)",
              "0 0 0 8px hsl(280 80% 60% / 0.1)",
              "0 0 0 0 hsl(280 80% 60% / 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Code className="w-4 h-4" />
          Best Practices
        </motion.span>
        
        <h2 className="text-3xl font-bold text-foreground mb-4">
          I 4 Principi della Gestione Errori
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Questi principi separano le app amatoriali da quelle professionali.
          Memorizzali e applicali sempre!
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {principles.map((principle, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`group p-6 rounded-2xl border bg-card/50 hover:bg-card transition-all duration-300 ${principle.borderColor}`}
          >
            <div className="flex items-start gap-4">
              <motion.div 
                className={`p-3 rounded-xl ${principle.bgColor} ${principle.color}`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {principle.icon}
              </motion.div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-2 text-lg">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {principle.description}
                </p>
                <div className={`p-3 rounded-lg ${principle.bgColor} border ${principle.borderColor}`}>
                  <p className="text-xs text-foreground">
                    <strong>Esempio:</strong> {principle.example}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Code comparison - More detailed */}
      <motion.div 
        className="p-8 rounded-2xl bg-card border border-border/50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <Code className="w-6 h-6 text-primary" />
          <h3 className="font-bold text-foreground text-xl">
            Confronto Codice: Sbagliato vs Corretto
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wrong way */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="w-5 h-5" />
              <span className="font-bold">❌ MAI FARE COSÌ</span>
            </div>
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
              <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
{`// SBAGLIATO: Espone tutto all'utente
try {
  await database.query(sql);
} catch (error) {
  // L'utente vede l'errore completo!
  alert(error.message);
  // Oppure peggio:
  alert(error.stack);
}

// Risultato per l'utente:
// "ECONNREFUSED 127.0.0.1:5432"
// 😱 Ora l'hacker sa che usi PostgreSQL!`}
              </pre>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div 
            className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Right way */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">✅ FARE COSÌ</span>
            </div>
            <div className="p-4 rounded-xl bg-success/10 border border-success/30">
              <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
{`// CORRETTO: Separa i due contesti
try {
  await database.query(sql);
} catch (error) {
  // 1. Log interno (solo per sviluppatori)
  logger.error({
    message: error.message,
    stack: error.stack,
    requestId: req.id
  });
  
  // 2. Messaggio user-friendly
  showToast({
    title: "Ops! Qualcosa è andato storto",
    message: "Riprova tra qualche minuto.",
    action: "Contatta supporto"
  });
}`}
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Key takeaway */}
        <motion.div 
          className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-center">
            <strong className="text-primary">🎯 Regola d'oro:</strong>{' '}
            <span className="text-foreground">
              L'utente deve sentirsi rassicurato, non spaventato. Lo sviluppatore deve avere tutti i dettagli per debuggare.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
