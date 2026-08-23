import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, Timestamp } from 'firebase/firestore';
import { CalendarEvent } from '../types';

export async function createEvent(
  event: Omit<CalendarEvent, 'id' | 'createdAt' | 'createdBy'>,
  userId: string
): Promise<CalendarEvent> {
  const docRef = await addDoc(collection(db, 'events'), {
    ...event,
    createdAt: Timestamp.now(),
    createdBy: userId,
  });
  return { id: docRef.id, ...event, createdAt: new Date(), createdBy: userId };
}

export async function updateEvent(
  eventId: string,
  event: Omit<CalendarEvent, 'id' | 'createdAt' | 'createdBy'>
): Promise<void> {
  await updateDoc(doc(db, 'events', eventId), { ...event });
}

export async function getEvents(): Promise<CalendarEvent[]> {
  const q = query(collection(db, 'events'), orderBy('date', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.() || new Date(),
  })) as CalendarEvent[];
}

export async function deleteEvent(eventId: string): Promise<void> {
  await deleteDoc(doc(db, 'events', eventId));
}
