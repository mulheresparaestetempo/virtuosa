import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface PDFItem {
  id: string;
  name: string;
  url: string;
  size: number;
}

interface EventoItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: string;
}

interface DevocionalItem {
  id: string;
  date: string;
  title: string;
  versicles: string;
  reflection: string;
  prayer: string;
}

interface AvisoItem {
  id: string;
  title: string;
  message: string;
  priority: string;
  sentAt: Date;
}

export async function getBibliotecaPDFs(): Promise<PDFItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'pdfs'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as PDFItem[];
  } catch (error) {
    console.error('Erro ao buscar PDFs:', error);
    return [];
  }
}

export async function getProximosEventos(): Promise<EventoItem[]> {
  try {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as EventoItem[];
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return [];
  }
}

export async function getDevocionalAtual(): Promise<DevocionalItem | null> {
  try {
    const hoje = new Date().toISOString().split('T')[0];
    const q = query(collection(db, 'devotionals'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const devotionals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as DevocionalItem[];

    return devotionals.find(d => d.date === hoje) || devotionals[0] || null;
  } catch (error) {
    console.error('Erro ao buscar devocional:', error);
    return null;
  }
}

export async function getUltimosAvisos(): Promise<AvisoItem[]> {
  try {
    const q = query(collection(db, 'avisos'), orderBy('sentAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.slice(0, 5).map(doc => ({
      id: doc.id,
      ...doc.data(),
      sentAt: doc.data().sentAt?.toDate() || new Date(),
    })) as AvisoItem[];
  } catch (error) {
    console.error('Erro ao buscar avisos:', error);
    return [];
  }
}
