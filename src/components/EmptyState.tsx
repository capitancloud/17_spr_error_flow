import { FileWarning } from 'lucide-react';

/**
 * EmptyState - Stato vuoto quando non ci sono errori.
 * 
 * Uno stato vuoto ben progettato:
 * 1. Comunica chiaramente cosa manca
 * 2. Guida l'utente all'azione successiva
 * 3. È visivamente piacevole, non deprimente
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Animated icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
        <div className="relative w-20 h-20 rounded-full bg-muted flex items-center justify-center animate-float">
          <FileWarning className="w-10 h-10 text-muted-foreground" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        Nessun errore generato
      </h3>
      
      <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
        Usa i pulsanti sopra per simulare diversi tipi di errori
        e vedere come vengono gestiti in una moderna web app.
      </p>

      {/* Hint arrows */}
      <div className="flex items-center gap-2 text-primary/60">
        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="text-sm font-medium">Inizia da qui</span>
      </div>
    </div>
  );
}
