import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Aviso } from '../types';

export async function sendAviso(
  aviso: Omit<Aviso, 'id' | 'sentAt' | 'sentBy' | 'recipientCount'>,
  userId: string,
  recipientCount: number
): Promise<Aviso> {
  try {
    const docRef = await addDoc(collection(db, 'avisos'), {
      ...aviso,
      sentAt: new Date(),
      sentBy: userId,
      recipientCount,
    });

    return {
      id: docRef.id,
      ...aviso,
      sentAt: new Date(),
      sentBy: userId,
      recipientCount,
    };
  } catch (error) {
    console.error('Erro ao enviar aviso:', error);
    throw error;
  }
}

export async function getAvisos(): Promise<Aviso[]> {
  try {
    const q = query(collection(db, 'avisos'), orderBy('sentAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      sentAt: doc.data().sentAt?.toDate() || new Date(),
    })) as Aviso[];
  } catch (error) {
    console.error('Erro ao buscar avisos:', error);
    throw error;
  }
}

export async function deleteAviso(avisoId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'avisos', avisoId));
  } catch (error) {
    console.error('Erro ao deletar aviso:', error);
    throw error;
  }
}
