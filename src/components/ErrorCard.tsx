import { useState } from 'react';
import { AppError } from '@/types/errors';
import { getCategoryIcon, getSeverityColor } from '@/lib/errorGenerator';
import { ChevronDown, ChevronUp, AlertTriangle, Clock, Hash, ExternalLink, Bug, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorCardProps {
  error: AppError;
  showDebug?: boolean;
}

/**
 * ErrorCard - Visualizza un errore con separazione chiara tra
 * informazioni per l'utente e dettagli di debug.
 * 
 * PRINCIPIO CHIAVE:
 * - Parte superiore (visibile): messaggio user-friendly
 * - Parte inferiore (nascosta): debug info per sviluppatori
 */
export function ErrorCard({ error, showDebug = false }: ErrorCardProps) {
  const [isDebugOpen, setIsDebugOpen] = useState(showDebug);

  const categoryLabels = {
    validation: 'Validazione',
    authorization: 'Autorizzazione',
    system: 'Sistema',
  };

  const severityLabels = {
    low: 'Bassa',
    medium: 'Media',
    high: 'Alta',
    critical: 'Critica',
  };

  return (
    <div className={cn(
      "card-glow rounded-xl overflow-hidden animate-fade-in",
      error.severity === 'critical' && "card-glow-error animate-shake"
    )}>
      {/* Header con codice HTTP */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-between",
        error.category === 'system' ? 'bg-destructive/20' :
        error.category === 'authorization' ? 'bg-warning/20' :
        'bg-primary/20'
      )}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCategoryIcon(error.category)}</span>
          <div>
            <span className="font-mono text-lg font-bold text-foreground">
              HTTP {error.code}
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              {categoryLabels[error.category]}
            </span>
          </div>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          getSeverityColor(error.severity),
          "bg-background/50"
        )}>
          Severità: {severityLabels[error.severity]}
        </div>
      </div>

      {/* Messaggio per l'utente - SEMPRE VISIBILE */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Messaggio per l'utente
            </h3>
            <p className="text-foreground text-lg leading-relaxed">
              {error.userMessage}
            </p>
          </div>
        </div>

        {error.suggestedAction && (
          <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm">
              <span className="font-medium text-primary">💡 Suggerimento:</span>{' '}
              <span className="text-muted-foreground">{error.suggestedAction}</span>
            </p>
          </div>
        )}

        {/* Toggle Debug Panel */}
        <button
          onClick={() => setIsDebugOpen(!isDebugOpen)}
          className="mt-4 w-full flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Informazioni di Debug
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive">
              Solo sviluppatori
            </span>
          </div>
          {isDebugOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Debug Panel - NASCOSTO DI DEFAULT */}
        {isDebugOpen && (
          <div className="mt-4 debug-panel animate-fade-in">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-xs text-warning font-medium">
                ⚠️ ATTENZIONE: Queste informazioni non devono MAI essere mostrate in produzione!
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Technical Message */}
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Hash className="w-3 h-3" />
                  <span>Messaggio Tecnico</span>
                </div>
                <code className="block p-2 rounded bg-background/50 text-destructive break-all">
                  {error.debugInfo.technicalMessage}
                </code>
              </div>

              {/* Request ID */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Hash className="w-3 h-3" />
                  <span>Request ID</span>
                </div>
                <code className="text-primary">{error.debugInfo.requestId}</code>
              </div>

              {/* Timestamp */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Timestamp</span>
                </div>
                <code className="text-foreground">
                  {error.debugInfo.timestamp.toISOString()}
                </code>
              </div>

              {/* Stack Trace */}
              {error.debugInfo.stackTrace && (
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Bug className="w-3 h-3" />
                    <span>Stack Trace</span>
                  </div>
                  <pre className="p-2 rounded bg-background/50 text-muted-foreground overflow-x-auto whitespace-pre-wrap text-[10px]">
                    {error.debugInfo.stackTrace}
                  </pre>
                </div>
              )}

              {/* Context */}
              {error.debugInfo.context && (
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>Contesto Richiesta</span>
                  </div>
                  <pre className="p-2 rounded bg-background/50 text-muted-foreground overflow-x-auto">
                    {JSON.stringify(error.debugInfo.context, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
