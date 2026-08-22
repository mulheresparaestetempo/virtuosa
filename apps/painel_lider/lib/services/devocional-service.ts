import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, Timestamp } from 'firebase/firestore';
import { Devocional } from '../types';

export async function publishDevocional(
  devocional: Omit<Devocional, 'id' | 'publishedAt' | 'publishedBy'>,
  userId: string
): Promise<Devocional> {
  const docRef = await addDoc(collection(db, 'devotionals'), {
    ...devocional,
    publishedAt: Timestamp.now(),
    publishedBy: userId,
  });
  return { id: docRef.id, ...devocional, publishedAt: new Date(), publishedBy: userId };
}

export async function updateDevocional(
  devId: string,
  devocional: Omit<Devocional, 'id' | 'publishedAt' | 'publishedBy'>
): Promise<void> {
  await updateDoc(doc(db, 'devotionals', devId), { ...devocional });
}

export async function getDevotionals(): Promise<Devocional[]> {
  const q = query(collection(db, 'devotionals'), orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data(),
    publishedAt: d.data().publishedAt?.toDate?.() || new Date(),
  })) as Devocional[];
}

export async function deleteDevocional(devId: string): Promise<void> {
  await deleteDoc(doc(db, 'devotionals', devId));
}
