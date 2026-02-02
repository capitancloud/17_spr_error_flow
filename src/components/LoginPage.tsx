import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Lock, Eye, EyeOff, AlertCircle, Shield, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginPageProps {
  onLogin: (code: string) => Promise<boolean>;
}

/**
 * Pagina di login per ErrorFlow.
 * Richiede l'inserimento del codice di accesso.
 */
export function LoginPage({ onLogin }: LoginPageProps) {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const success = await onLogin(code);
      if (!success) {
        setError('Codice di accesso non valido. Riprova.');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError('Errore durante la verifica. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background grid */}
      <div className="fixed inset-0 grid-bg opacity-50" />
      
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines opacity-30" />
      
      {/* Gradient orbs */}
      <motion.div 
        className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className={`bg-card/90 backdrop-blur-xl border-border/50 shadow-2xl ${shake ? 'animate-shake' : ''}`}>
          <CardHeader className="text-center space-y-4">
            {/* Logo animato */}
            <motion.div 
              className="mx-auto relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <motion.div 
                className="absolute inset-0 bg-primary/40 blur-xl rounded-full"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
            </motion.div>

            <div>
              <CardTitle className="text-2xl font-bold text-gradient-cyan">
                ErrorFlow
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Tutorial Interattivo sulla Gestione Errori
              </CardDescription>
            </div>

            {/* Badge sicurezza */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Shield className="w-3 h-3" />
              Accesso Protetto
            </motion.div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo codice */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-primary" />
                  Codice di Accesso
                </label>
                <div className="relative">
                  <Input
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Inserisci il codice..."
                    className="pr-10 bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Errore */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulsante login */}
              <Button
                type="submit"
                disabled={isLoading || !code.trim()}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Lock className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Accedi
                  </>
                )}
              </Button>
            </form>

          </CardContent>
        </Card>

        {/* Footer */}
        <motion.p 
          className="text-center text-xs text-muted-foreground/50 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          ErrorFlow © 2024 - Un progetto didattico
        </motion.p>
      </motion.div>
    </div>
  );
}
