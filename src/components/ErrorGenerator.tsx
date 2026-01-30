import { ErrorCategory } from '@/types/errors';
import { AlertCircle, ShieldAlert, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorGeneratorProps {
  onGenerate: (category: ErrorCategory) => void;
  isLoading?: boolean;
}

/**
 * ErrorGenerator - Pannello per generare errori simulati.
 * 
 * Ogni pulsante rappresenta una categoria di errori con
 * una breve spiegazione del suo significato.
 */
export function ErrorGenerator({ onGenerate, isLoading }: ErrorGeneratorProps) {
  const categories: Array<{
    id: ErrorCategory;
    name: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    hoverGradient: string;
  }> = [
    {
      id: 'validation',
      name: 'Validazione',
      description: 'Errori 4xx - Dati non validi inviati dal client',
      icon: <AlertCircle className="w-6 h-6" />,
      gradient: 'from-primary/20 to-primary/5',
      hoverGradient: 'hover:from-primary/30 hover:to-primary/10',
    },
    {
      id: 'authorization',
      name: 'Autorizzazione',
      description: 'Errori 401/403 - Problemi di accesso o permessi',
      icon: <ShieldAlert className="w-6 h-6" />,
      gradient: 'from-warning/20 to-warning/5',
      hoverGradient: 'hover:from-warning/30 hover:to-warning/10',
    },
    {
      id: 'system',
      name: 'Sistema',
      description: 'Errori 5xx - Problemi lato server',
      icon: <Server className="w-6 h-6" />,
      gradient: 'from-destructive/20 to-destructive/5',
      hoverGradient: 'hover:from-destructive/30 hover:to-destructive/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onGenerate(category.id)}
          disabled={isLoading}
          className={cn(
            "relative group p-6 rounded-xl border border-border/50",
            "bg-gradient-to-br transition-all duration-300",
            category.gradient,
            category.hoverGradient,
            "hover:border-primary/50 hover:scale-[1.02]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            "focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent blur-xl" />
          </div>

          <div className="relative z-10">
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
              "bg-background/50 text-foreground",
              "group-hover:bg-primary/20 transition-colors duration-300"
            )}>
              {category.icon}
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {category.name}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {category.description}
            </p>

            {/* Animated arrow */}
            <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Genera errore</span>
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
