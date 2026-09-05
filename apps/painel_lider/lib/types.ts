export interface PDFDocument {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'retiro' | 'culto' | 'encontro' | 'outro';
  createdAt: Date;
  createdBy: string;
}

export interface Devocional {
  id: string;
  date: string;
  title: string;
  versicles: string;
  reflection: string;
  prayer: string;
  publishedAt: Date;
  publishedBy: string;
}

export interface Aviso {
  id: string;
  title: string;
  message: string;
  priority: 'baixa' | 'média' | 'alta';
  sentAt: Date;
  sentBy: string;
  recipientCount: number;
}

export interface Negocio {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  contato: string;
  link?: string;
  criadoEm: Date;
  criadoPor: string;
}

export interface Usuaria {
  id: string;
  nome: string;
  email?: string;
  papel: 'membro' | 'lider';
  discipuladoraId?: string | null;
  igrejaId?: string | null;
  liderId?: string | null;
  ultimoAcesso?: Date;
  ultimoDiaDevocionalLido?: string;
}
