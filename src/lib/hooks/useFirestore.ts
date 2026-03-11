'use client';

import { useState, useEffect, useRef } from 'react';
import {
  collection,
  query,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../firebase/config';

interface UseFirestoreCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useFirestoreCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): UseFirestoreCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const constraintsRef = useRef(constraints);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraintsRef.current);
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as T)));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading, error };
}
