declare module '@/lib/firebase/firebase' {
  import { FirebaseApp } from 'firebase/app';
  import { Firestore } from 'firebase/firestore';

  export const firebaseApp: FirebaseApp;
  export const firestore: Firestore;
}
