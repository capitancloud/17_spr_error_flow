import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppError } from '@/types/errors';
import { X, AlertCircle, ShieldAlert, Server, Info, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorToastProps {
  error: AppError;
  onClose: () => void;
  duration?: number;
}

/**
 * ErrorToast - Toast notification per errori.
 * Versione migliorata con più animazioni.
 */
export function ErrorToast({ error, onClose, duration = 6000 }: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    validation: <AlertCircle className="w-6 h-6" />,
    authorization: <ShieldAlert className="w-6 h-6" />,
    system: <Server className="w-6 h-6" />,
  };

  const styles = {
    validation: {
      border: 'border-primary/50',
      bg: 'bg-primary/10',
      iconColor: 'text-primary',
      progressColor: 'bg-primary',
    },
    authorization: {
      border: 'border-warning/50',
      bg: 'bg-warning/10',
      iconColor: 'text-warning',
      progressColor: 'bg-warning',
    },
    system: {
      border: 'border-destructive/50',
      bg: 'bg-destructive/10',
      iconColor: 'text-destructive',
      progressColor: 'bg-destructive',
    },
  };

  const style = styles[error.category];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50 max-w-md"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className={cn(
            "relative flex items-start gap-4 p-5 rounded-2xl border-2 backdrop-blur-md",
            "shadow-2xl shadow-background/50",
            style.border,
            style.bg
          )}
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Animated icon */}
          <motion.div 
            className={cn("flex-shrink-0 p-2 rounded-xl bg-background/50", style.iconColor)}
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {icons[error.category]}
          </motion.div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <motion.div 
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="font-mono text-sm font-bold text-foreground">
                HTTP {error.code}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-background/50 text-muted-foreground">
                {error.category === 'validation' ? 'Client Error' : 
                 error.category === 'authorization' ? 'Auth Error' : 'Server Error'}
              </span>
            </motion.div>

            {/* Message */}
            <motion.p 
              className="text-sm text-foreground leading-relaxed mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {error.userMessage}
            </motion.p>

            {/* Suggested action */}
            {error.suggestedAction && (
              <motion.div 
                className="flex items-start gap-2 p-2 rounded-lg bg-background/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground">{error.suggestedAction}</span>
              </motion.div>
            )}
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-xl hover:bg-background/50 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/30 rounded-b-2xl overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full", style.progressColor)}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          </div>

          {/* Educational note */}
          <motion.div 
            className="absolute -top-12 left-0 right-0 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted/80 backdrop-blur-sm text-xs text-muted-foreground">
              👆 Questo è ciò che l'utente vedrebbe
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
