import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

let activeSignInPromise: Promise<any> | null = null;

export const signInWithGoogle = async () => {
  if (activeSignInPromise) {
    return activeSignInPromise;
  }
  try {
    activeSignInPromise = signInWithPopup(auth, googleProvider);
    const result = await activeSignInPromise;
    return result;
  } catch (err: any) {
    if (String(err?.message || err).includes('Pending promise was never set')) {
      return null;
    }
    throw err;
  } finally {
    activeSignInPromise = null;
  }
};

export { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc,
  getDoc
};
