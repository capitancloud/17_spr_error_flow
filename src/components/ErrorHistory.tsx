import { motion, AnimatePresence } from 'framer-motion';
import { AppError } from '@/types/errors';
import { Clock, Trash2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorHistoryProps {
  errors: AppError[];
  onSelect: (error: AppError) => void;
  onClear: () => void;
  selectedId?: string;
}

/**
 * ErrorHistory - Cronologia degli errori generati.
 */
export function ErrorHistory({ errors, onSelect, onClear, selectedId }: ErrorHistoryProps) {
  const categoryColors = {
    validation: 'bg-primary/20 text-primary border-primary/30',
    authorization: 'bg-warning/20 text-warning border-warning/30',
    system: 'bg-destructive/20 text-destructive border-destructive/30',
  };

  if (errors.length === 0) {
    return (
      <motion.div 
        className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-sm text-muted-foreground">
          Gli errori generati appariranno qui
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-4 h-4 text-primary" />
          </motion.div>
          Cronologia ({errors.length})
        </div>
        <motion.button
          onClick={onClear}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 className="w-3 h-3" />
          Pulisci
        </motion.button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        <AnimatePresence>
          {errors.map((error, index) => (
            <motion.button
              key={error.id}
              onClick={() => onSelect(error)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 5, backgroundColor: "hsl(var(--muted) / 0.5)" }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left transition-all",
                "border-b border-border/30 last:border-0",
                selectedId === error.id && "bg-primary/10"
              )}
            >
              <motion.span 
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono font-bold border",
                  categoryColors[error.category]
                )}
                whileHover={{ scale: 1.1 }}
              >
                {error.code}
              </motion.span>
              <span className="flex-1 text-sm text-muted-foreground truncate">
                {error.userMessage.substring(0, 40)}...
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground/50 font-mono">
                  {error.debugInfo.timestamp.toLocaleTimeString()}
                </span>
                <ChevronRight className={cn(
                  "w-4 h-4 text-muted-foreground/50 transition-transform",
                  selectedId === error.id && "text-primary rotate-90"
                )} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
