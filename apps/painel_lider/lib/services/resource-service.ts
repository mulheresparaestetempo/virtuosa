import { db, storage } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export type ResourceType = 'audio' | 'podcast' | 'livro' | 'indicacao';
export interface ResourceItem { id: string; type: ResourceType; title: string; description: string; url: string; storagePath?: string; createdAt: Date; createdBy: string; }

const collectionName = 'resources';

export async function createLinkResource(type: ResourceType, title: string, description: string, url: string, userId: string) {
  if (!title.trim() || !url.trim()) throw new Error('Título e link são obrigatórios.');
  try { new URL(url); } catch { throw new Error('Informe um link válido.'); }
  const createdAt = Timestamp.now();
  const result = await addDoc(collection(db, collectionName), { type, title: title.trim(), description: description.trim(), url: url.trim(), createdAt, createdBy: userId });
  return { id: result.id, type, title: title.trim(), description: description.trim(), url: url.trim(), createdAt: createdAt.toDate(), createdBy: userId } as ResourceItem;
}

export async function uploadAudio(file: File, title: string, description: string, userId: string) {
  if (!file.type.startsWith('audio/')) throw new Error('Selecione um arquivo de áudio.');
  if (file.size > 100 * 1024 * 1024) throw new Error('O áudio deve ter no máximo 100 MB.');
  if (!title.trim()) throw new Error('Informe o título do áudio.');
  const storagePath = `audios/${crypto.randomUUID()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file, { contentType: file.type });
  const url = await getDownloadURL(storageRef);
  const createdAt = Timestamp.now();
  const result = await addDoc(collection(db, collectionName), { type: 'audio', title: title.trim(), description: description.trim(), url, storagePath, createdAt, createdBy: userId });
  return { id: result.id, type: 'audio', title: title.trim(), description: description.trim(), url, storagePath, createdAt: createdAt.toDate(), createdBy: userId } as ResourceItem;
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
  if (item.storagePath) {
    try { await deleteObject(ref(storage, item.storagePath)); } catch (error: any) { if (error?.code !== 'storage/object-not-found') throw error; }
  }
}
