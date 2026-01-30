import { motion } from 'framer-motion';
import { Lightbulb, Code, Users, Server, ArrowRight } from 'lucide-react';

/**
 * HeroIntro - Sezione introduttiva per principianti assoluti.
 */
export function HeroIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    },
  };

  const concepts = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Cos'è un errore HTTP?",
      description: "Quando il browser chiede qualcosa al server, il server risponde con un codice numerico. I codici 4xx indicano che hai sbagliato tu (es. pagina non trovata), i codici 5xx indicano che il server ha un problema.",
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Perché due messaggi diversi?",
      description: "L'utente normale vuole sapere COSA FARE. Lo sviluppatore vuole sapere PERCHÉ è successo. Mescolarli confonde l'utente e può esporre informazioni sensibili agli hacker!",
      color: "from-warning/20 to-warning/5",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Client vs Server",
      description: "Il CLIENT è il tuo browser. Il SERVER è il computer remoto che contiene i dati. Gli errori 4xx sono colpa del client, gli errori 5xx sono colpa del server.",
      color: "from-accent/20 to-accent/5",
    },
  ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-16"
    >
      {/* Main intro */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          animate={{ 
            boxShadow: [
              "0 0 0 0 hsl(180 100% 50% / 0)",
              "0 0 0 10px hsl(180 100% 50% / 0.1)",
              "0 0 0 0 hsl(180 100% 50% / 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Impara facendo</span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          Gestire gli errori è un'{' '}
          <motion.span 
            className="text-gradient-cyan inline-block"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            arte essenziale
          </motion.span>
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Ogni app che usi quotidianamente gestisce centinaia di errori. 
          <strong className="text-foreground"> La differenza tra un'app professionale e un prototipo</strong> sta 
          in come comunica questi errori. Impara i fondamentali con questa simulazione interattiva.
        </p>
      </motion.div>

      {/* Concept cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {concepts.map((concept, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className={`relative p-6 rounded-2xl bg-gradient-to-br ${concept.color} border border-border/50 overflow-hidden group`}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, hsl(180 100% 50% / 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, hsl(180 100% 50% / 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, hsl(180 100% 50% / 0.1) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div 
                className="w-14 h-14 rounded-xl bg-background/50 flex items-center justify-center mb-4 text-foreground"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {concept.icon}
              </motion.div>

              <h3 className="text-lg font-bold text-foreground mb-3">
                {concept.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {concept.description}
              </p>
            </div>

            {/* Corner decoration */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-primary/10 blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </div>

      {/* Arrow indicator */}
      <motion.div 
        className="flex flex-col items-center gap-2 text-primary"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-sm font-medium">Prova tu stesso</span>
        <ArrowRight className="w-5 h-5 rotate-90" />
      </motion.div>
    </motion.section>
  );
}
