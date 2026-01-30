import { motion } from 'framer-motion';

/**
 * HttpCodeExplainer - Spiega i codici HTTP in modo visivo.
 */
export function HttpCodeExplainer() {
  const codeRanges = [
    {
      range: '1xx',
      name: 'Informational',
      description: 'Il server ha ricevuto la richiesta e sta elaborando',
      example: '100 Continue',
      color: 'bg-muted',
      textColor: 'text-muted-foreground',
      rare: true,
    },
    {
      range: '2xx',
      name: 'Success',
      description: 'Tutto ok! La richiesta è stata elaborata con successo',
      example: '200 OK, 201 Created',
      color: 'bg-success/20',
      textColor: 'text-success',
      rare: false,
    },
    {
      range: '3xx',
      name: 'Redirection',
      description: 'Il contenuto è stato spostato, seguimi!',
      example: '301 Moved, 304 Not Modified',
      color: 'bg-primary/20',
      textColor: 'text-primary',
      rare: false,
    },
    {
      range: '4xx',
      name: 'Client Error',
      description: 'Hai sbagliato qualcosa tu (utente/browser)',
      example: '400 Bad Request, 404 Not Found',
      color: 'bg-warning/20',
      textColor: 'text-warning',
      rare: false,
    },
    {
      range: '5xx',
      name: 'Server Error',
      description: 'Il server ha un problema, non è colpa tua',
      example: '500 Internal Error, 503 Unavailable',
      color: 'bg-destructive/20',
      textColor: 'text-destructive',
      rare: false,
    },
  ];

  return (
    <motion.section 
      className="mb-12 p-6 rounded-2xl bg-card/50 border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div 
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📊
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Codici HTTP Spiegati</h3>
          <p className="text-sm text-muted-foreground">Ogni codice racconta una storia diversa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {codeRanges.map((code, index) => (
          <motion.div
            key={code.range}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className={`relative p-4 rounded-xl ${code.color} border border-border/30 overflow-hidden group cursor-default`}
          >
            {/* Pulsing background for non-rare codes */}
            {!code.rare && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  background: [
                    `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 70%)`,
                    `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
                    `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 70%)`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            <div className="relative z-10">
              <div className={`text-2xl font-mono font-bold ${code.textColor} mb-1`}>
                {code.range}
              </div>
              <div className="text-xs font-medium text-foreground mb-2">
                {code.name}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-2">
                {code.description}
              </div>
              <div className="text-[10px] font-mono text-muted-foreground/70">
                es: {code.example}
              </div>
              {code.rare && (
                <span className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  raro
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
