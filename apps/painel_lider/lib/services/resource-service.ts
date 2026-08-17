import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';

export type ResourceType = 'audio' | 'podcast' | 'livro' | 'indicacao';
export interface ResourceItem { id: string; type: ResourceType; title: string; description: string; url: string; createdAt: Date; createdBy: string; }

const collectionName = 'resources';

export async function createLinkResource(type: ResourceType, title: string, description: string, url: string, userId: string) {
  if (!title.trim() || !url.trim()) throw new Error('Título e link são obrigatórios.');
  try { new URL(url); } catch { throw new Error('Informe um link válido.'); }
  const createdAt = Timestamp.now();
  const result = await addDoc(collection(db, collectionName), { type, title: title.trim(), description: description.trim(), url: url.trim(), createdAt, createdBy: userId });
  return { id: result.id, type, title: title.trim(), description: description.trim(), url: url.trim(), createdAt: createdAt.toDate(), createdBy: userId } as ResourceItem;
}

export async function getResources(type?: ResourceType): Promise<ResourceItem[]> {
  const snapshot = await getDocs(query(collection(db, collectionName), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((item) => {
    const data = item.data();
    return { id: item.id, ...data, createdAt: data.createdAt?.toDate?.() || new Date() } as ResourceItem;
  }).filter((item) => !type || item.type === type);
}

export async function deleteResource(item: ResourceItem) {
  await deleteDoc(doc(db, collectionName, item.id));
}
