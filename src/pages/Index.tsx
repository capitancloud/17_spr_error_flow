import { useState, useCallback } from 'react';
import { AppError, ErrorCategory } from '@/types/errors';
import { generateError } from '@/lib/errorGenerator';
import { Header } from '@/components/Header';
import { ErrorGenerator } from '@/components/ErrorGenerator';
import { ErrorCard } from '@/components/ErrorCard';
import { ErrorToast } from '@/components/ErrorToast';
import { EmptyState } from '@/components/EmptyState';
import { ErrorHistory } from '@/components/ErrorHistory';
import { InfoSection } from '@/components/InfoSection';

/**
 * ErrorFlow - App didattica per la gestione degli errori.
 * 
 * Questa pagina dimostra:
 * 1. Come generare errori strutturati
 * 2. La separazione tra messaggi utente e debug
 * 3. L'impatto sulla UX di diversi tipi di errori
 */
const Index = () => {
  const [errors, setErrors] = useState<AppError[]>([]);
  const [selectedError, setSelectedError] = useState<AppError | null>(null);
  const [toast, setToast] = useState<AppError | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateError = useCallback((category: ErrorCategory) => {
    setIsGenerating(true);
    
    // Simuliamo un breve delay come in una vera richiesta API
    setTimeout(() => {
      const error = generateError(category);
      
      setErrors((prev) => [error, ...prev].slice(0, 10)); // Max 10 errori
      setSelectedError(error);
      setToast(error);
      setIsGenerating(false);
    }, 300);
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

  return (
    <div className="min-h-screen bg-background grid-bg relative">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines" />
      
      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simula e Comprendi gli{' '}
            <span className="text-gradient-cyan">Errori HTTP</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Genera errori simulati per capire come gestirli correttamente.
            Impara la differenza tra messaggi utente e informazioni di debug.
          </p>
        </section>

        {/* Error Generator */}
        <section className="mb-8">
          <ErrorGenerator onGenerate={handleGenerateError} isLoading={isGenerating} />
        </section>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Error display */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Errore Corrente
            </h3>
            {selectedError ? (
              <ErrorCard error={selectedError} showDebug={false} />
            ) : (
              <EmptyState />
            )}
          </div>

          {/* History sidebar */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Cronologia
            </h3>
            <ErrorHistory
              errors={errors}
              onSelect={handleSelectError}
              onClear={handleClearHistory}
              selectedId={selectedError?.id}
            />
          </div>
        </div>

        {/* Educational section */}
        <InfoSection />

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Creato con ❤️ per insegnare le best practice della gestione errori.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            ErrorFlow © 2024 - Un progetto didattico
          </p>
        </footer>
      </main>

      {/* Toast notification */}
      {toast && (
        <ErrorToast error={toast} onClose={handleCloseToast} />
      )}
    </div>
  );
};

export default Index;
