import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import { User, UserRole } from '../types';

export async function signUp(
  email: string,
  password: string,
  displayName: string,
  role: UserRole = 'client'
): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });

  const now = new Date().toISOString();
  const userData: User = {
    uid: user.uid,
    email,
    displayName,
    role,
    joinDate: now,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(db, 'users', user.uid), userData);
  return userData;
}

export async function signIn(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const userData = await getUserData(user.uid);
  if (!userData) throw new Error('User data not found');
  return userData;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function getUserData(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as User) : null;
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
