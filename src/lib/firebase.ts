import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

function parsePrivateKey(key?: string): string | undefined {
  if (!key) return undefined;
  let formatted = key.trim();
  // Strip surrounding quotes if present
  if ((formatted.startsWith('"') && formatted.endsWith('"')) || (formatted.startsWith("'") && formatted.endsWith("'"))) {
    formatted = formatted.substring(1, formatted.length - 1).trim();
  }
  // Replace literal '\n' characters with real newlines
  return formatted.replace(/\\n/g, '\n');
}

function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return getFirestore();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  try {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
    return getFirestore();
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
    return null;
  }
}

// Proxy for db to allow lazy initialization and avoid build-time errors
export const db = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(_target, prop) {
    const firestore = initFirebaseAdmin();
    if (!firestore) {
      throw new Error('Firebase Firestore is not initialized. Please check your FIREBASE_* environment variables.');
    }
    const value = (firestore as any)[prop];
    return typeof value === 'function' ? value.bind(firestore) : value;
  },
});

export { Timestamp };