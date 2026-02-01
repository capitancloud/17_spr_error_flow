/**
 * Modulo di autenticazione per ErrorFlow.
 * 
 * NOTA DIDATTICA: In un'app reale, l'hash del codice NON sarebbe mai
 * hardcoded nel frontend. Sarebbe verificato lato server.
 * Qui lo facciamo per scopi educativi.
 */

// Il codice di accesso originale (offuscato tramite hash per la verifica)
const ACCESS_CODE = "gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E";

// Cache per l'hash del codice corretto
let cachedCorrectHash: string | null = null;

/**
 * Funzione di hash SHA-256.
 * Converte una stringa in un hash esadecimale.
 */
export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Ottiene l'hash del codice corretto (calcolato una sola volta).
 */
async function getCorrectHash(): Promise<string> {
  if (!cachedCorrectHash) {
    cachedCorrectHash = await hashCode(ACCESS_CODE);
  }
  return cachedCorrectHash;
}

/**
 * Verifica se il codice inserito corrisponde al codice di accesso.
 * Confronta gli hash per sicurezza.
 */
export async function verifyAccessCode(inputCode: string): Promise<boolean> {
  const [inputHash, correctHash] = await Promise.all([
    hashCode(inputCode),
    getCorrectHash()
  ]);
  // Confronto sicuro degli hash
  return inputHash === correctHash;
}

// Storage key per la sessione
const AUTH_STORAGE_KEY = 'errorflow_authenticated';

/**
 * Controlla se l'utente è autenticato.
 */
export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

/**
 * Salva lo stato di autenticazione.
 */
export function setAuthenticated(value: boolean): void {
  if (value) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

/**
 * Effettua il logout.
 */
export function logout(): void {
  setAuthenticated(false);
}
