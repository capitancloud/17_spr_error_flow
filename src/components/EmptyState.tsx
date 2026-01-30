import { motion } from 'framer-motion';
import { FileWarning, MousePointer, Sparkles } from 'lucide-react';

/**
 * EmptyState - Stato vuoto quando non ci sono errori.
 * Versione migliorata con più animazioni.
 */
export function EmptyState() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated icon */}
      <div className="relative mb-8">
        {/* Pulsing rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.5 + i * 0.3, 0.8],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Main icon */}
        <motion.div 
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border/50"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FileWarning className="w-12 h-12 text-muted-foreground" />
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      <motion.h3 
        className="text-2xl font-bold text-foreground mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Nessun errore generato
      </motion.h3>
      
      <motion.p 
        className="text-muted-foreground max-w-md mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Clicca su uno dei tre pulsanti colorati qui sopra per simulare un errore 
        e vedere come viene gestito in una moderna applicazione web.
      </motion.p>

      {/* Animated pointer */}
      <motion.div 
        className="flex flex-col items-center gap-3 text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <MousePointer className="w-6 h-6" />
        </motion.div>
        <motion.span 
          className="text-sm font-medium px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
          animate={{ 
            boxShadow: [
              "0 0 0 0 hsl(180 100% 50% / 0)",
              "0 0 0 8px hsl(180 100% 50% / 0.1)",
              "0 0 0 0 hsl(180 100% 50% / 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⬆️ Inizia cliccando qui sopra
        </motion.span>
      </motion.div>

      {/* Educational tip */}
      <motion.div 
        className="mt-10 p-4 rounded-xl bg-muted/30 border border-border/50 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 <strong className="text-foreground">Consiglio:</strong> Prova tutti e tre i tipi di errore 
          per capire le differenze. Poi espandi il pannello "Debug" per vedere cosa 
          NON dovresti mai mostrare agli utenti!
        </p>
      </motion.div>
    </motion.div>
  );
}
