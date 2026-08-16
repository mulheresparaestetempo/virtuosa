import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { PDFDocument } from '../types';

export async function uploadPDF(file: File, name: string, userId: string): Promise<PDFDocument> {
  if (file.type !== 'application/pdf') throw new Error('Somente arquivos PDF são permitidos.');
  if (file.size > 25 * 1024 * 1024) throw new Error('O PDF deve ter no máximo 25 MB.');
  const storagePath = `pdfs/${crypto.randomUUID()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file, { contentType: 'application/pdf' });
  const url = await getDownloadURL(storageRef);
  const uploadedAt = Timestamp.now();
  const docRef = await addDoc(collection(db, 'pdfs'), { name: name.trim(), url, storagePath, size: file.size, uploadedAt, uploadedBy: userId });
  return { id: docRef.id, name: name.trim(), url, storagePath, size: file.size, uploadedAt: uploadedAt.toDate(), uploadedBy: userId } as PDFDocument;
}

export async function getPDFs(): Promise<PDFDocument[]> {
  const snapshot = await getDocs(query(collection(db, 'pdfs'), orderBy('uploadedAt', 'desc')));
  return snapshot.docs.map((item) => {
    const data = item.data();
    return { id: item.id, ...data, uploadedAt: data.uploadedAt?.toDate?.() || new Date() } as PDFDocument;
  });
}

export async function deletePDF(docId: string, storagePath: string): Promise<void> {
  await deleteDoc(doc(db, 'pdfs', docId));
  if (storagePath) {
    try { await deleteObject(ref(storage, storagePath)); } catch (error: any) {
      if (error?.code !== 'storage/object-not-found') throw error;
    }
  }
}
