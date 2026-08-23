import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, Timestamp } from 'firebase/firestore';
import { Aviso } from '../types';

export async function sendAviso(
  aviso: Omit<Aviso, 'id' | 'sentAt' | 'sentBy' | 'recipientCount'>,
  userId: string,
  recipientCount: number
): Promise<Aviso> {
  const docRef = await addDoc(collection(db, 'avisos'), {
    ...aviso,
    sentAt: Timestamp.now(),
    sentBy: userId,
    recipientCount,
  });
  return { id: docRef.id, ...aviso, sentAt: new Date(), sentBy: userId, recipientCount };
}

export async function updateAviso(
  avisoId: string,
  aviso: Pick<Aviso, 'title' | 'message' | 'priority'>
): Promise<void> {
  await updateDoc(doc(db, 'avisos', avisoId), { ...aviso });
}

export async function getAvisos(): Promise<Aviso[]> {
  const q = query(collection(db, 'avisos'), orderBy('sentAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data(),
    sentAt: d.data().sentAt?.toDate?.() || new Date(),
  })) as Aviso[];
}

export async function deleteAviso(avisoId: string): Promise<void> {
  await deleteDoc(doc(db, 'avisos', avisoId));
}
