/**
 * ErrorFlow - Sistema di gestione errori didattico
 * 
 * Questo file definisce i tipi di errore e le loro caratteristiche.
 * In una vera applicazione, questi tipi aiutano a standardizzare
 * la gestione degli errori in tutto il codebase.
 */

export type ErrorCategory = 'validation' | 'authorization' | 'system';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

/**
 * Struttura di un errore HTTP standard.
 * 
 * IMPORTANTE: Nota la separazione tra:
 * - userMessage: ciò che l'utente vede (sicuro, comprensibile)
 * - debugInfo: informazioni tecniche (solo per sviluppatori, MAI in produzione!)
 */
export interface AppError {
  /** Identificatore univoco dell'errore */
  id: string;
  
  /** Codice HTTP (es. 400, 401, 500) */
  code: number;
  
  /** Categoria dell'errore per gestione differenziata */
  category: ErrorCategory;
  
  /** Livello di severità per prioritizzazione */
  severity: ErrorSeverity;
  
  /** 
   * MESSAGGIO PER L'UTENTE
   * Deve essere: chiaro, non tecnico, rassicurante, con azione suggerita
   * NON deve contenere: stack trace, query SQL, percorsi file, dati sensibili
   */
  userMessage: string;
  
  /**
   * INFORMAZIONI DI DEBUG
   * Solo per sviluppatori! Mai esporre in produzione.
   * Contiene dettagli tecnici per il debugging.
   */
  debugInfo: {
    technicalMessage: string;
    timestamp: Date;
    requestId: string;
    stackTrace?: string;
    context?: Record<string, unknown>;
  };
  
  /** Azione suggerita per l'utente */
  suggestedAction?: string;
  
  /** Link alla documentazione (per sviluppatori) */
  docsUrl?: string;
}

/**
 * Configurazione per simulare diversi scenari di errore.
 */
export interface ErrorScenario {
  id: string;
  name: string;
  description: string;
  category: ErrorCategory;
  examples: Array<{
    code: number;
    name: string;
    description: string;
  }>;
}

/**
 * Scenari di errore predefiniti per la simulazione.
 * 
 * Questi rappresentano i tipi più comuni di errori in una web app:
 */
export const ERROR_SCENARIOS: ErrorScenario[] = [
  {
    id: 'validation',
    name: 'Errori di Validazione',
    description: 'Errori causati da input non validi o formati incorretti',
    category: 'validation',
    examples: [
      { code: 400, name: 'Bad Request', description: 'Dati della richiesta non validi' },
      { code: 422, name: 'Unprocessable Entity', description: 'Formato corretto ma semantica errata' },
    ]
  },
  {
    id: 'authorization',
    name: 'Errori di Autorizzazione',
    description: 'Errori relativi a permessi e autenticazione',
    category: 'authorization',
    examples: [
      { code: 401, name: 'Unauthorized', description: 'Autenticazione richiesta o fallita' },
      { code: 403, name: 'Forbidden', description: 'Autenticato ma senza permessi' },
    ]
  },
  {
    id: 'system',
    name: 'Errori di Sistema',
    description: 'Errori interni del server o problemi di infrastruttura',
    category: 'system',
    examples: [
      { code: 500, name: 'Internal Server Error', description: 'Errore generico del server' },
      { code: 503, name: 'Service Unavailable', description: 'Servizio temporaneamente non disponibile' },
    ]
  }
];
