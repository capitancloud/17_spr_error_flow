import { motion } from 'framer-motion';
import { Zap, BookOpen, GraduationCap, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onLogout?: () => void;
}

/**
 * Header - Intestazione dell'app ErrorFlow.
 */
export function Header({ onLogout }: HeaderProps) {
  return (
    <motion.header 
      className="relative border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated gradient line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(180 100% 50% / 0.5), transparent)"
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 bg-primary/40 blur-lg"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gradient-cyan">
                ErrorFlow
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                Tutorial Interattivo
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <motion.a
              href="#learn"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guida</span>
            </motion.a>
            
            {onLogout && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Esci</span>
                </Button>
              </motion.div>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
