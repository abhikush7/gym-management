import {
  collection,
  query,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  QueryConstraint,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

export async function getCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

export async function getDocument<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, docId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null;
}

export async function createDocument<T extends Record<string, unknown>>(
  collectionName: string,
  data: T
): Promise<string> {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function setDocument<T extends Record<string, unknown>>(
  collectionName: string,
  docId: string,
  data: T
): Promise<void> {
  await setDoc(doc(db, collectionName, docId), data);
}

export async function updateDocument<T extends Record<string, unknown>>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> {
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  await deleteDoc(doc(db, collectionName, docId));
}

export { serverTimestamp };
