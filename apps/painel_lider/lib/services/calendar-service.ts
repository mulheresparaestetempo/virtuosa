import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { CalendarEvent } from '../types';

export async function createEvent(
  event: Omit<CalendarEvent, 'id' | 'createdAt' | 'createdBy'>,
  userId: string
): Promise<CalendarEvent> {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      ...event,
      createdAt: new Date(),
      createdBy: userId,
    });

    return {
      id: docRef.id,
      ...event,
      createdAt: new Date(),
      createdBy: userId,
    };
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    throw error;
  }
}

export async function getEvents(): Promise<CalendarEvent[]> {
  try {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as CalendarEvent[];
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error;
  }
}

export async function deleteEvent(eventId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'events', eventId));
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    throw error;
  }
}
