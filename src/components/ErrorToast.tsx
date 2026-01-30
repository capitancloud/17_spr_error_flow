import { useEffect } from 'react';
import { AppError } from '@/types/errors';
import { X, AlertCircle, ShieldAlert, Server, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorToastProps {
  error: AppError;
  onClose: () => void;
  duration?: number;
}

/**
 * ErrorToast - Toast notification per errori.
 * 
 * Mostra SOLO il messaggio utente, mai i dettagli di debug.
 * Il design cambia in base alla categoria dell'errore.
 */
export function ErrorToast({ error, onClose, duration = 5000 }: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    validation: <AlertCircle className="w-5 h-5" />,
    authorization: <ShieldAlert className="w-5 h-5" />,
    system: <Server className="w-5 h-5" />,
  };

  const styles = {
    validation: 'border-primary/50 bg-primary/10',
    authorization: 'border-warning/50 bg-warning/10',
    system: 'border-destructive/50 bg-destructive/10',
  };

  const iconStyles = {
    validation: 'text-primary',
    authorization: 'text-warning',
    system: 'text-destructive',
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-md",
        "animate-slide-in-right"
      )}
    >
      <div
        className={cn(
          "flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm",
          "shadow-lg shadow-background/50",
          styles[error.category]
        )}
      >
        <div className={cn("flex-shrink-0 mt-0.5", iconStyles[error.category])}>
          {icons[error.category]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-medium text-muted-foreground">
              HTTP {error.code}
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {error.userMessage}
          </p>
          {error.suggestedAction && (
            <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
              <Info className="w-3 h-3" />
              {error.suggestedAction}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-background/50 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-background/30 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full",
            error.category === 'system' ? 'bg-destructive' :
            error.category === 'authorization' ? 'bg-warning' :
            'bg-primary'
          )}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}
