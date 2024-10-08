"use client";

import { auth, firestore, googleProvider } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: User | null;
  authLoading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveUserData = async (user: User) => {
    const userRef = doc(firestore, "users", user.uid);
    const userData = {
      name: user.displayName || "",
      email: user.email || "",
      photoUrl: user.photoURL || "",
      loginMethod: user.providerData[0].providerId,
    };
    await setDoc(userRef, { personalInformation: userData }, { merge: true });
  };

  const loginWithEmail = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user) {
        await saveUserData(userCredential.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const signupWithEmail = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user) {
        await saveUserData(userCredential.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await saveUserData(result.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const values: AuthContextProps = {
    user,
    authLoading,
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
