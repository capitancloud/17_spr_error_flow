import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppError } from '@/types/errors';
import { getCategoryIcon, getSeverityColor } from '@/lib/errorGenerator';
import { ChevronDown, ChevronUp, AlertTriangle, Clock, Hash, ExternalLink, Bug, Shield, Eye, EyeOff, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorCardProps {
  error: AppError;
  showDebug?: boolean;
}

/**
 * ErrorCard - Visualizza un errore con separazione chiara tra
 * informazioni per l'utente e dettagli di debug.
 * Versione migliorata con più animazioni.
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

  const categoryColors = {
    validation: 'from-primary/30 to-primary/10',
    authorization: 'from-warning/30 to-warning/10',
    system: 'from-destructive/30 to-destructive/10',
  };

  return (
    <motion.div 
      className={cn(
        "card-glow rounded-2xl overflow-hidden",
        error.severity === 'critical' && "card-glow-error"
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
    >
      {/* Header con codice HTTP */}
      <motion.div 
        className={cn(
          "px-5 py-4 flex items-center justify-between bg-gradient-to-r",
          categoryColors[error.category]
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <motion.span 
            className="text-3xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            {getCategoryIcon(error.category)}
          </motion.span>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-mono text-2xl font-bold text-foreground">
                HTTP {error.code}
              </span>
              <span className="ml-3 text-sm text-muted-foreground">
                {categoryLabels[error.category]}
              </span>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium",
            getSeverityColor(error.severity),
            "bg-background/60 backdrop-blur-sm"
          )}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          ⚠️ Severità: {severityLabels[error.severity]}
        </motion.div>
      </motion.div>

      {/* Messaggio per l'utente - SEMPRE VISIBILE */}
      <div className="p-6">
        {/* User message section */}
        <motion.div 
          className="flex items-start gap-4 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="p-3 rounded-xl bg-primary/10 border border-primary/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Eye className="w-6 h-6 text-primary" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
                👤 Messaggio per l'Utente
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                SICURO
              </span>
            </div>
            <motion.p 
              className="text-foreground text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {error.userMessage}
            </motion.p>
          </div>
        </motion.div>

        {/* Explanation box */}
        <motion.div 
          className="p-4 rounded-xl bg-muted/30 border border-border/50 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Nota didattica:</strong> Questo messaggio è volutamente generico e non tecnico. 
                L'utente non ha bisogno di sapere che c'è stato un errore nel database o che la regex è fallita. 
                Deve solo sapere cosa fare per risolvere.
              </p>
            </div>
          </div>
        </motion.div>

        {error.suggestedAction && (
          <motion.div 
            className="p-4 rounded-xl bg-primary/5 border border-primary/30 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-sm">
              <span className="font-medium text-primary">💡 Azione suggerita:</span>{' '}
              <span className="text-foreground">{error.suggestedAction}</span>
            </p>
          </motion.div>
        )}

        {/* Toggle Debug Panel */}
        <motion.button
          onClick={() => setIsDebugOpen(!isDebugOpen)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-destructive/5 border border-destructive/30 hover:bg-destructive/10 transition-all group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isDebugOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDebugOpen ? <EyeOff className="w-5 h-5 text-destructive" /> : <Bug className="w-5 h-5 text-destructive" />}
            </motion.div>
            <div className="text-left">
              <span className="text-sm font-medium text-foreground">
                🔧 Informazioni di Debug
              </span>
              <p className="text-xs text-muted-foreground">
                {isDebugOpen ? 'Clicca per nascondere' : 'Clicca per vedere cosa vedrebbe uno sviluppatore'}
              </p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive animate-pulse">
              ⚠️ MAI IN PRODUZIONE
            </span>
          </div>
          <motion.div
            animate={{ rotate: isDebugOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.button>

        {/* Debug Panel - NASCOSTO DI DEFAULT */}
        <AnimatePresence>
          {isDebugOpen && (
            <motion.div 
              className="mt-5 debug-panel overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex items-center gap-2 mb-4 pb-4 border-b border-destructive/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
                <span className="text-sm text-destructive font-medium">
                  ⚠️ ATTENZIONE: Queste informazioni contengono dati sensibili!
                </span>
              </motion.div>

              <div className="space-y-4 text-xs">
                {/* Why this is dangerous */}
                <motion.div 
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="text-destructive leading-relaxed">
                    🚨 <strong>Perché è pericoloso mostrare queste info?</strong><br/>
                    Stack trace, percorsi file, e query database rivelano la struttura interna dell'app. 
                    Un attaccante può usare queste info per trovare vulnerabilità!
                  </p>
                </motion.div>

                {/* Technical Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Hash className="w-3 h-3" />
                    <span className="font-medium">Messaggio Tecnico</span>
                    <span className="text-destructive text-[10px]">(contiene dettagli implementativi)</span>
                  </div>
                  <code className="block p-3 rounded-lg bg-background/70 text-destructive break-all border border-destructive/20">
                    {error.debugInfo.technicalMessage}
                  </code>
                </motion.div>

                {/* Request ID & Timestamp */}
                <motion.div 
                  className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <div className="p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Hash className="w-3 h-3" />
                      <span>Request ID</span>
                    </div>
                    <code className="text-primary text-xs">{error.debugInfo.requestId}</code>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="w-3 h-3" />
                      <span>Timestamp</span>
                    </div>
                    <code className="text-foreground text-xs">
                      {error.debugInfo.timestamp.toISOString()}
                    </code>
                  </div>
                </motion.div>

                {/* Stack Trace */}
                {error.debugInfo.stackTrace && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Bug className="w-3 h-3" />
                      <span className="font-medium">Stack Trace</span>
                      <span className="text-destructive text-[10px]">(rivela percorsi file del server!)</span>
                    </div>
                    <pre className="p-3 rounded-lg bg-background/70 text-muted-foreground overflow-x-auto whitespace-pre-wrap text-[10px] border border-border/50">
                      {error.debugInfo.stackTrace}
                    </pre>
                  </motion.div>
                )}

                {/* Context */}
                {error.debugInfo.context && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <ExternalLink className="w-3 h-3" />
                      <span className="font-medium">Contesto Richiesta</span>
                    </div>
                    <pre className="p-3 rounded-lg bg-background/70 text-muted-foreground overflow-x-auto border border-border/50">
                      {JSON.stringify(error.debugInfo.context, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
