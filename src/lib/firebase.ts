import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

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
    return true;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY);
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || (projectId ? `${projectId}.appspot.com` : undefined);

  if (!projectId || !clientEmail || !privateKey) {
    return false;
  }

  try {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket,
    });
    return true;
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
    return false;
  }
}

// Proxy for db to allow lazy initialization and avoid build-time errors
export const db = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(_target, prop) {
    const initialized = initFirebaseAdmin();
    if (!initialized) {
      throw new Error('Firebase Firestore is not initialized. Please check your FIREBASE_* environment variables.');
    }
    const firestore = getFirestore();
    const value = (firestore as any)[prop];
    return typeof value === 'function' ? value.bind(firestore) : value;
  },
});

// Proxy for storage to allow lazy initialization
export const storage = new Proxy({} as ReturnType<typeof getStorage>, {
  get(_target, prop) {
    const initialized = initFirebaseAdmin();
    if (!initialized) {
      throw new Error('Firebase Storage is not initialized. Please check your FIREBASE_* environment variables.');
    }
    const storageObj = getStorage();
    const value = (storageObj as any)[prop];
    return typeof value === 'function' ? value.bind(storageObj) : value;
  },
});

export { Timestamp };