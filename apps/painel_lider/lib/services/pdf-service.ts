import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore';
import { PDFDocument } from '../types';

export async function savePDFLink(url: string, name: string, userId: string): Promise<PDFDocument> {
  if (!name.trim()) throw new Error('Informe o nome do documento.');
  try { new URL(url); } catch { throw new Error('Informe um link válido.'); }
  const uploadedAt = Timestamp.now();
  const docRef = await addDoc(collection(db, 'pdfs'), { name: name.trim(), url: url.trim(), uploadedAt, uploadedBy: userId });
  return { id: docRef.id, name: name.trim(), url: url.trim(), uploadedAt: uploadedAt.toDate(), uploadedBy: userId };
}

export async function updatePDF(docId: string, name: string, url: string): Promise<void> {
  if (!name.trim()) throw new Error('Informe o nome do documento.');
  try { new URL(url); } catch { throw new Error('Informe um link válido.'); }
  await updateDoc(doc(db, 'pdfs', docId), { name: name.trim(), url: url.trim() });
}

export async function getPDFs(): Promise<PDFDocument[]> {
  const snapshot = await getDocs(query(collection(db, 'pdfs'), orderBy('uploadedAt', 'desc')));
  return snapshot.docs.map((item) => {
    const data = item.data();
    return { id: item.id, ...data, uploadedAt: data.uploadedAt?.toDate?.() || new Date() } as PDFDocument;
  });
}

export async function deletePDF(docId: string): Promise<void> {
  await deleteDoc(doc(db, 'pdfs', docId));
}
