import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Devocional } from '../types';

export async function publishDevocional(
  devocional: Omit<Devocional, 'id' | 'publishedAt' | 'publishedBy'>,
  userId: string
): Promise<Devocional> {
  try {
    const docRef = await addDoc(collection(db, 'devotionals'), {
      ...devocional,
      publishedAt: new Date(),
      publishedBy: userId,
    });

    return {
      id: docRef.id,
      ...devocional,
      publishedAt: new Date(),
      publishedBy: userId,
    };
  } catch (error) {
    console.error('Erro ao publicar devocional:', error);
    throw error;
  }
}

export async function getDevotionals(): Promise<Devocional[]> {
  try {
    const q = query(collection(db, 'devotionals'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      publishedAt: doc.data().publishedAt?.toDate() || new Date(),
    })) as Devocional[];
  } catch (error) {
    console.error('Erro ao buscar devocionais:', error);
    throw error;
  }
}

export async function deleteDevocional(devId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'devotionals', devId));
  } catch (error) {
    console.error('Erro ao deletar devocional:', error);
    throw error;
  }
}
