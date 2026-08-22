import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore';

export type ResourceType = 'audio' | 'podcast' | 'livro' | 'indicacao';
export interface ResourceItem { id: string; type: ResourceType; title: string; description: string; url: string; createdAt: Date; createdBy: string; }

const COL = 'resources';

export async function createLinkResource(type: ResourceType, title: string, description: string, url: string, userId: string): Promise<ResourceItem> {
  if (!title.trim() || !url.trim()) throw new Error('Título e link são obrigatórios.');
  try { new URL(url); } catch { throw new Error('Informe um link válido.'); }
  const createdAt = Timestamp.now();
  const result = await addDoc(collection(db, COL), { type, title: title.trim(), description: description.trim(), url: url.trim(), createdAt, createdBy: userId });
  return { id: result.id, type, title: title.trim(), description: description.trim(), url: url.trim(), createdAt: createdAt.toDate(), createdBy: userId };
}

export async function updateResource(itemId: string, title: string, description: string, url: string): Promise<void> {
  if (!title.trim() || !url.trim()) throw new Error('Título e link são obrigatórios.');
  try { new URL(url); } catch { throw new Error('Informe um link válido.'); }
  await updateDoc(doc(db, COL, itemId), { title: title.trim(), description: description.trim(), url: url.trim() });
}

export async function getResources(type?: ResourceType): Promise<ResourceItem[]> {
  const snapshot = await getDocs(query(collection(db, COL), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((item) => {
    const data = item.data();
    return { id: item.id, ...data, createdAt: data.createdAt?.toDate?.() || new Date() } as ResourceItem;
  }).filter((item) => !type || item.type === type);
}

export async function deleteResource(item: ResourceItem): Promise<void> {
  await deleteDoc(doc(db, COL, item.id));
}
