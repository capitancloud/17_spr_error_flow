import { AppError } from '@/types/errors';
import { Clock, Trash2 } from 'lucide-react';
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
    validation: 'bg-primary/20 text-primary',
    authorization: 'bg-warning/20 text-warning',
    system: 'bg-destructive/20 text-destructive',
  };

  if (errors.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Cronologia ({errors.length})
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Pulisci
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {errors.map((error) => (
          <button
            key={error.id}
            onClick={() => onSelect(error)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
              "hover:bg-muted/30 border-b border-border/30 last:border-0",
              selectedId === error.id && "bg-muted/50"
            )}
          >
            <span className={cn(
              "px-2 py-0.5 rounded text-xs font-mono font-medium",
              categoryColors[error.category]
            )}>
              {error.code}
            </span>
            <span className="flex-1 text-sm text-muted-foreground truncate">
              {error.userMessage}
            </span>
            <span className="text-xs text-muted-foreground/50">
              {error.debugInfo.timestamp.toLocaleTimeString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
