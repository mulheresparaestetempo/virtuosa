import { db } from '../firebase';
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc,
  doc, Timestamp, orderBy, query,
} from 'firebase/firestore';
import { Negocio } from '../types';

const COL = 'negocios';

function toNegocio(id: string, data: any): Negocio {
  return {
    id,
    nome: data.nome ?? '',
    descricao: data.descricao ?? '',
    categoria: data.categoria ?? 'Outros',
    contato: data.contato ?? '',
    link: data.link ?? '',
    criadoEm: data.criadoEm?.toDate?.() ?? new Date(),
    criadoPor: data.criadoPor ?? '',
  };
}

export async function getNegocios(): Promise<Negocio[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('criadoEm', 'desc')));
  return snap.docs.map(d => toNegocio(d.id, d.data()));
}

export async function createNegocio(
  nome: string, descricao: string, categoria: string,
  contato: string, link: string, uid: string,
): Promise<Negocio> {
  const data = { nome, descricao, categoria, contato, link, criadoEm: Timestamp.now(), criadoPor: uid };
  const ref = await addDoc(collection(db, COL), data);
  return toNegocio(ref.id, data);
}

export async function updateNegocio(
  id: string, nome: string, descricao: string,
  categoria: string, contato: string, link: string,
): Promise<void> {
  await updateDoc(doc(db, COL, id), { nome, descricao, categoria, contato, link });
}

export async function deleteNegocio(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
