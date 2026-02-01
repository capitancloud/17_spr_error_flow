import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AppError, ErrorCategory } from '@/types/errors';
import { generateError } from '@/lib/errorGenerator';
import { useAuth } from '@/hooks/useAuth';
import { LoginPage } from '@/components/LoginPage';
import { Header } from '@/components/Header';
import { HeroIntro } from '@/components/HeroIntro';
import { HttpCodeExplainer } from '@/components/HttpCodeExplainer';
import { ErrorGenerator } from '@/components/ErrorGenerator';
import { ErrorCard } from '@/components/ErrorCard';
import { ErrorToast } from '@/components/ErrorToast';
import { EmptyState } from '@/components/EmptyState';
import { ErrorHistory } from '@/components/ErrorHistory';
import { InfoSection } from '@/components/InfoSection';
import { Sparkles } from 'lucide-react';

/**
 * ErrorFlow - App didattica per la gestione degli errori.
 * 
 * Questa pagina dimostra:
 * 1. Come generare errori strutturati
 * 2. La separazione tra messaggi utente e debug
 * 3. L'impatto sulla UX di diversi tipi di errori
 */
const Index = () => {
  const { authenticated, isLoading, login, logout } = useAuth();
  const [errors, setErrors] = useState<AppError[]>([]);
  const [selectedError, setSelectedError] = useState<AppError | null>(null);
  const [toast, setToast] = useState<AppError | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // IMPORTANTE: Tutti gli hook devono essere definiti PRIMA di qualsiasi return condizionale
  // Questa è una regola fondamentale di React (Rules of Hooks)
  const handleGenerateError = useCallback((category: ErrorCategory) => {
    setIsGenerating(true);
    
    // Simuliamo un breve delay come in una vera richiesta API
    setTimeout(() => {
      const error = generateError(category);
      
      setErrors((prev) => [error, ...prev].slice(0, 10)); // Max 10 errori
      setSelectedError(error);
      setToast(error);
      setIsGenerating(false);
    }, 500);
  }, []);

  const handleSelectError = useCallback((error: AppError) => {
    setSelectedError(error);
  }, []);

  const handleClearHistory = useCallback(() => {
    setErrors([]);
    setSelectedError(null);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToast(null);
  }, []);

  // Mostra schermata di caricamento
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Mostra pagina di login se non autenticato
  if (!authenticated) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 grid-bg opacity-50" />
      
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines opacity-30" />
      
      {/* Gradient orbs with animation */}
      <motion.div 
        className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"
        animate={{ 
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <Header onLogout={logout} />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero intro for beginners */}
        <HeroIntro />

        {/* HTTP Code Explainer */}
        <HttpCodeExplainer />

        {/* Error Generator Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">
              Genera un Errore Simulato
            </h2>
          </div>
          <ErrorGenerator onGenerate={handleGenerateError} isLoading={isGenerating} />
        </motion.section>

        {/* Main content grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Error display */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <motion.span 
                className="w-3 h-3 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <h3 className="text-lg font-semibold text-foreground">
                Errore Selezionato
              </h3>
              {selectedError && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  Espandi "Debug" per vedere i dettagli nascosti
                </span>
              )}
            </div>
            {selectedError ? (
              <ErrorCard error={selectedError} showDebug={false} />
            ) : (
              <EmptyState />
            )}
          </div>

          {/* History sidebar */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              📜 Cronologia Errori
            </h3>
            <ErrorHistory
              errors={errors}
              onSelect={handleSelectError}
              onClear={handleClearHistory}
              selectedId={selectedError?.id}
            />
          </div>
        </motion.div>

        {/* Educational section */}
        <InfoSection />

        {/* Footer */}
        <motion.footer 
          className="mt-20 py-10 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm text-muted-foreground mb-2"
            whileHover={{ scale: 1.02 }}
          >
            Creato con ❤️ per insegnare le best practice della gestione errori.
          </motion.p>
          <p className="text-xs text-muted-foreground/50">
            ErrorFlow © 2024 - Un progetto didattico per sviluppatori
          </p>
          <motion.div 
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 text-xs text-muted-foreground"
            whileHover={{ scale: 1.05 }}
          >
            💡 Ricorda: un buon error handling è il segno di un'app professionale!
          </motion.div>
        </motion.footer>
      </main>

      {/* Toast notification */}
      {toast && (
        <ErrorToast error={toast} onClose={handleCloseToast} />
      )}
    </div>
  );
};

export default Index;
