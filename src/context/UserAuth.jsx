import { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

// 1️⃣ create the actual context bucket
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // sign-in helper
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // 🔸 return the promise so the caller can await it
    return signInWithPopup(auth, provider);
  };

  // sign-out helper
  const logOut = () => signOut(auth);

  // keep local state in sync with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('Firebase user:', currentUser);
    });

    // clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // 2️⃣ expose everything the app needs
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ convenience hook
export const UserAuth = () => useContext(AuthContext);
