import { AppError, ErrorCategory, ErrorSeverity } from '@/types/errors';

/**
 * Generatore di errori simulati per ErrorFlow.
 * 
 * Questo modulo dimostra come generare errori strutturati
 * con separazione tra messaggi utente e informazioni di debug.
 */

// Generatore di ID univoci (in produzione usare UUID)
const generateId = () => Math.random().toString(36).substring(2, 15);
const generateRequestId = () => `req_${Date.now()}_${generateId()}`;

/**
 * Errori di VALIDAZIONE (4xx - Client Errors)
 * 
 * Questi errori indicano che il client ha inviato una richiesta non valida.
 * L'utente può correggere il problema modificando il suo input.
 */
const validationErrors: Array<Omit<AppError, 'id' | 'debugInfo'>> = [
  {
    code: 400,
    category: 'validation',
    severity: 'low',
    userMessage: 'I dati inseriti non sono validi. Controlla i campi evidenziati e riprova.',
    suggestedAction: 'Verifica che tutti i campi siano compilati correttamente',
    docsUrl: '/docs/errors/validation'
  },
  {
    code: 422,
    category: 'validation',
    severity: 'medium',
    userMessage: 'Non è possibile elaborare la richiesta. Il formato è corretto ma i dati non sono accettabili.',
    suggestedAction: 'Controlla che i valori inseriti rispettino i limiti previsti',
    docsUrl: '/docs/errors/unprocessable'
  },
  {
    code: 400,
    category: 'validation',
    severity: 'low',
    userMessage: 'L\'email inserita non è valida. Inserisci un indirizzo email corretto.',
    suggestedAction: 'Usa il formato nome@dominio.com',
    docsUrl: '/docs/errors/email-validation'
  }
];

/**
 * Errori di AUTORIZZAZIONE (401, 403)
 * 
 * 401 = Non autenticato (chi sei?)
 * 403 = Non autorizzato (so chi sei, ma non puoi farlo)
 * 
 * IMPORTANTE: Mai rivelare SE una risorsa esiste quando c'è un problema di permessi!
 */
const authorizationErrors: Array<Omit<AppError, 'id' | 'debugInfo'>> = [
  {
    code: 401,
    category: 'authorization',
    severity: 'medium',
    userMessage: 'Sessione scaduta. Effettua nuovamente l\'accesso per continuare.',
    suggestedAction: 'Clicca su "Accedi" per autenticarti',
    docsUrl: '/docs/errors/auth'
  },
  {
    code: 403,
    category: 'authorization',
    severity: 'high',
    userMessage: 'Non hai i permessi necessari per questa azione.',
    suggestedAction: 'Contatta l\'amministratore se ritieni sia un errore',
    docsUrl: '/docs/errors/forbidden'
  },
  {
    code: 401,
    category: 'authorization',
    severity: 'medium',
    userMessage: 'Token di accesso non valido. Rieffettua l\'accesso.',
    suggestedAction: 'Il tuo token potrebbe essere scaduto o revocato',
    docsUrl: '/docs/errors/token'
  }
];

/**
 * Errori di SISTEMA (5xx - Server Errors)
 * 
 * Questi errori indicano un problema lato server.
 * L'utente NON può risolvere il problema, ma possiamo:
 * - Rassicurarlo che stiamo lavorando al problema
 * - Suggerire di riprovare più tardi
 * - MAI mostrare dettagli tecnici!
 */
const systemErrors: Array<Omit<AppError, 'id' | 'debugInfo'>> = [
  {
    code: 500,
    category: 'system',
    severity: 'critical',
    userMessage: 'Si è verificato un errore imprevisto. Il nostro team è stato notificato.',
    suggestedAction: 'Riprova tra qualche minuto. Se il problema persiste, contatta il supporto.',
    docsUrl: '/docs/errors/server'
  },
  {
    code: 503,
    category: 'system',
    severity: 'high',
    userMessage: 'Il servizio è temporaneamente non disponibile per manutenzione.',
    suggestedAction: 'Riprova tra qualche minuto',
    docsUrl: '/docs/errors/maintenance'
  },
  {
    code: 504,
    category: 'system',
    severity: 'high',
    userMessage: 'La richiesta sta impiegando troppo tempo. Riprova più tardi.',
    suggestedAction: 'Il server potrebbe essere sovraccarico',
    docsUrl: '/docs/errors/timeout'
  }
];

/**
 * Messaggi tecnici simulati per il debug.
 * 
 * ATTENZIONE: Questi messaggi sono SOLO per sviluppatori!
 * Non devono MAI essere mostrati agli utenti in produzione.
 */
const technicalMessages: Record<ErrorCategory, string[]> = {
  validation: [
    'ValidationError: Field "email" failed regex pattern /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/',
    'SchemaValidationError: Required field "password" is missing in request body',
    'TypeError: Cannot read property "trim" of undefined at validateInput()',
  ],
  authorization: [
    'JWTExpiredError: Token expired at 2024-01-15T10:30:00.000Z',
    'AuthorizationError: User role "viewer" does not have permission "admin:write"',
    'InvalidTokenError: Signature verification failed for JWT token',
  ],
  system: [
    'ECONNREFUSED: Connection refused to database at postgres://db:5432',
    'TimeoutError: Operation timed out after 30000ms waiting for response from payment-service',
    'MemoryError: JavaScript heap out of memory at processLargeDataset()',
  ],
};

/**
 * Stack trace simulati.
 * In produzione questi contengono informazioni sensibili sui percorsi del server!
 */
const generateStackTrace = (category: ErrorCategory): string => {
  const stacks: Record<ErrorCategory, string> = {
    validation: `Error: Validation failed
    at validateUserInput (/app/src/validators/user.ts:45:11)
    at processRequest (/app/src/middleware/validation.ts:23:5)
    at Layer.handle (/app/node_modules/express/lib/router/layer.js:95:5)`,
    authorization: `Error: Unauthorized access attempt
    at checkPermissions (/app/src/middleware/auth.ts:78:15)
    at verifyToken (/app/src/services/jwt.ts:112:9)
    at authenticate (/app/src/middleware/auth.ts:34:12)`,
    system: `Error: Internal server error
    at DatabaseConnection.query (/app/src/db/connection.ts:156:23)
    at UserRepository.findById (/app/src/repositories/user.ts:89:18)
    at UserService.getUser (/app/src/services/user.ts:45:12)`,
  };
  return stacks[category];
};

/**
 * Genera un errore simulato per una categoria specifica.
 * 
 * @param category - La categoria di errore da generare
 * @returns Un oggetto AppError completo con tutte le informazioni
 */
export function generateError(category: ErrorCategory): AppError {
  const errorPool = {
    validation: validationErrors,
    authorization: authorizationErrors,
    system: systemErrors,
  };

  const errors = errorPool[category];
  const baseError = errors[Math.floor(Math.random() * errors.length)];
  const technicalMsgs = technicalMessages[category];
  
  return {
    ...baseError,
    id: generateId(),
    debugInfo: {
      technicalMessage: technicalMsgs[Math.floor(Math.random() * technicalMsgs.length)],
      timestamp: new Date(),
      requestId: generateRequestId(),
      stackTrace: generateStackTrace(category),
      context: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        endpoint: `/api/${category}/action`,
        method: 'POST',
        ip: '192.168.1.xxx', // IP parzialmente mascherato per privacy
      },
    },
  };
}

/**
 * Genera un errore casuale da qualsiasi categoria.
 */
export function generateRandomError(): AppError {
  const categories: ErrorCategory[] = ['validation', 'authorization', 'system'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return generateError(randomCategory);
}

/**
 * Mappa severità a colori per l'UI.
 */
export function getSeverityColor(severity: ErrorSeverity): string {
  const colors: Record<ErrorSeverity, string> = {
    low: 'text-warning',
    medium: 'text-warning',
    high: 'text-destructive',
    critical: 'text-destructive',
  };
  return colors[severity];
}

/**
 * Mappa categoria a icona per l'UI.
 */
export function getCategoryIcon(category: ErrorCategory): string {
  const icons: Record<ErrorCategory, string> = {
    validation: '📝',
    authorization: '🔐',
    system: '⚙️',
  };
  return icons[category];
}
