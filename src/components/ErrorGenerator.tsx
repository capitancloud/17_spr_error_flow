import { motion } from 'framer-motion';
import { ErrorCategory } from '@/types/errors';
import { AlertCircle, ShieldAlert, Server, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorGeneratorProps {
  onGenerate: (category: ErrorCategory) => void;
  isLoading?: boolean;
}

/**
 * ErrorGenerator - Pannello per generare errori simulati.
 * Versione migliorata con più animazioni e spiegazioni.
 */
export function ErrorGenerator({ onGenerate, isLoading }: ErrorGeneratorProps) {
  const categories: Array<{
    id: ErrorCategory;
    name: string;
    description: string;
    details: string;
    codes: string;
    icon: React.ReactNode;
    gradient: string;
    borderColor: string;
    glowColor: string;
  }> = [
    {
      id: 'validation',
      name: 'Errore di Validazione',
      description: 'Dati non validi inviati dal client',
      details: 'Succede quando l\'utente inserisce dati sbagliati: email malformata, password troppo corta, campi vuoti...',
      codes: '400, 422',
      icon: <AlertCircle className="w-7 h-7" />,
      gradient: 'from-primary/30 via-primary/10 to-transparent',
      borderColor: 'border-primary/40 hover:border-primary/70',
      glowColor: 'group-hover:shadow-[0_0_30px_hsl(180_100%_50%/0.3)]',
    },
    {
      id: 'authorization',
      name: 'Errore di Autorizzazione',
      description: 'Problemi di accesso o permessi',
      details: '401 = Chi sei? Non ti conosco! 403 = Ti conosco, ma non puoi farlo! Importante: MAI dire "questa risorsa esiste ma non puoi accedervi".',
      codes: '401, 403',
      icon: <ShieldAlert className="w-7 h-7" />,
      gradient: 'from-warning/30 via-warning/10 to-transparent',
      borderColor: 'border-warning/40 hover:border-warning/70',
      glowColor: 'group-hover:shadow-[0_0_30px_hsl(40_95%_55%/0.3)]',
    },
    {
      id: 'system',
      name: 'Errore di Sistema',
      description: 'Problemi lato server',
      details: 'Il server è esploso! Database giù, memoria esaurita, timeout... L\'utente NON può risolvere, ma non deve vedere dettagli tecnici.',
      codes: '500, 502, 503',
      icon: <Server className="w-7 h-7" />,
      gradient: 'from-destructive/30 via-destructive/10 to-transparent',
      borderColor: 'border-destructive/40 hover:border-destructive/70',
      glowColor: 'group-hover:shadow-[0_0_30px_hsl(0_85%_55%/0.3)]',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={cardVariants}
          onClick={() => onGenerate(category.id)}
          disabled={isLoading}
          whileHover={{ 
            scale: 1.02,
            y: -8,
          }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative group p-6 rounded-2xl border-2 text-left",
            "bg-gradient-to-br transition-all duration-500",
            category.gradient,
            category.borderColor,
            category.glowColor,
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/20"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%',
                  scale: 0
                }}
                animate={{ 
                  x: [
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%'
                  ],
                  y: [
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%',
                    Math.random() * 100 + '%'
                  ],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4 + i, 
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Icon with animation */}
            <motion.div 
              className="w-16 h-16 rounded-xl bg-background/60 backdrop-blur-sm flex items-center justify-center mb-5 text-foreground border border-border/50"
              whileHover={{ 
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.4 }
              }}
            >
              {category.icon}
            </motion.div>

            {/* Codes badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 rounded-md bg-background/50 text-xs font-mono font-bold text-foreground">
                HTTP {category.codes}
              </span>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2">
              {category.name}
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              {category.description}
            </p>

            {/* Detailed explanation */}
            <div className="p-3 rounded-lg bg-background/40 border border-border/30 mb-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                💡 {category.details}
              </p>
            </div>

            {/* CTA */}
            <motion.div 
              className="flex items-center gap-2 text-primary font-medium"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, x: 5 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Genera questo errore</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </div>

          {/* Loading overlay */}
          {isLoading && (
            <motion.div 
              className="absolute inset-0 bg-background/80 rounded-2xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
