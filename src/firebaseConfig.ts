import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBljBm-tmxFif8WX1vE8QUdPSy3J9mRbdc",
  authDomain: "terrabeans-8c77a.firebaseapp.com",
  projectId: "terrabeans-8c77a",
  storageBucket: "terrabeans-8c77a.appspot.com",
  messagingSenderId: "564148336722",
  appId: "1:564148336722:web:d518354bdb3514c059878b",
};
export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();
