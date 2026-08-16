import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { PDFDocument } from '../types';

export async function uploadPDF(file: File, name: string, userId: string): Promise<PDFDocument> {
  try {
    const storageRef = ref(storage, `pdfs/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, 'pdfs'), {
      name,
      url,
      size: file.size,
      uploadedAt: new Date(),
      uploadedBy: userId,
    });

    return {
      id: docRef.id,
      name,
      url,
      size: file.size,
      uploadedAt: new Date(),
      uploadedBy: userId,
    };
  } catch (error) {
    console.error('Erro ao fazer upload do PDF:', error);
    throw error;
  }
}

export async function getPDFs(): Promise<PDFDocument[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'pdfs'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
    })) as PDFDocument[];
  } catch (error) {
    console.error('Erro ao buscar PDFs:', error);
    throw error;
  }
}

export async function deletePDF(docId: string, storagePath: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'pdfs', docId));
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Erro ao deletar PDF:', error);
    throw error;
  }
}
