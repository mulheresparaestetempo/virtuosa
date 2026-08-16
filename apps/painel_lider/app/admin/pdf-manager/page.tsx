'use client';

import { useEffect, useState } from 'react';
import { uploadPDF, getPDFs, deletePDF } from '@/lib/services/pdf-service';
import { PDFDocument } from '@/lib/types';
import { useAuth } from '@/lib/context/auth-context';

export default function PDFManagerPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [newDocName, setNewDocName] = useState('');
  const [newDocFile, setNewDocFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadDocuments = async () => {
    try { setDocuments(await getPDFs()); }
    catch (err) { setError('Não foi possível carregar os PDFs. Verifique sua conexão com o Firebase.'); console.error(err); }
  };

  useEffect(() => { loadDocuments(); }, []);

  const handleUpload = async () => {
    if (!user || !newDocName.trim() || !newDocFile) return;
    setLoading(true); setError('');
    try {
      const newDoc = await uploadPDF(newDocFile, newDocName, user.uid);
      setDocuments((current) => [newDoc, ...current]);
      setNewDocName(''); setNewDocFile(null);
      const input = document.getElementById('pdf-file') as HTMLInputElement | null;
      if (input) input.value = '';
    } catch (err: any) {
      setError(err?.message || 'Erro ao fazer upload do PDF.');
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string, storagePath?: string) => {
    if (!storagePath || !confirm('Tem certeza que deseja remover este PDF?')) return;
    try { await deletePDF(id, storagePath); setDocuments((current) => current.filter((doc) => doc.id !== id)); }
    catch (err: any) { setError(err?.message || 'Erro ao remover o PDF.'); console.error(err); }
  };

  return (
    <main className="page">
      <header className="header"><div><div className="brand">PDFs</div><small>Biblioteca de recursos</small></div></header>
      <section className="main">
        <div className="hero"><div className="kicker">📄 Upload seguro</div><h1>Biblioteca de Recursos</h1><p>Envie PDFs para o Firebase Storage e disponibilize-os para as filhas.</p></div>
        <div className="card">
          <h2>Novo Documento</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Nome do documento</label>
            <input value={newDocName} onChange={(e) => setNewDocName(e.target.value)} placeholder="Ex.: Guia de Oração" style={{ width: '100%', padding: '.75rem', border: '2px solid #E8E8E8', borderRadius: 20, boxSizing: 'border-box' }} />
            <label style={{ display: 'block', margin: '1rem 0 .5rem', fontWeight: 500 }}>Arquivo PDF (máx. 25 MB)</label>
            <input id="pdf-file" type="file" accept="application/pdf,.pdf" onChange={(e) => setNewDocFile(e.target.files?.[0] || null)} style={{ display: 'block', padding: '.75rem', border: '2px dashed #D4A574', borderRadius: 20, width: '100%', boxSizing: 'border-box' }} />
            {newDocFile && <p style={{ marginTop: '.5rem', fontSize: '.9rem', color: '#666' }}>✓ {newDocFile.name}</p>}
            {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '.75rem', borderRadius: 16, margin: '1rem 0' }}>{error}</div>}
            <button onClick={handleUpload} disabled={!newDocName.trim() || !newDocFile || loading || !user} className="btn" style={{ width: '100%', marginTop: '1rem' }}>{loading ? '⏳ Enviando para o Firebase...' : 'Enviar PDF'}</button>
          </div>
        </div>
        <div className="card">
          <h2>Documentos Publicados ({documents.length})</h2>
          {documents.length === 0 ? <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum documento enviado ainda.</p> : <div style={{ marginTop: '1rem' }}>{documents.map((item) => (
            <div key={item.id} style={{ padding: '1rem', backgroundColor: '#FAF2F1', borderRadius: 20, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <div><a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><p style={{ fontWeight: 600, color: '#2E2E2E' }}>📄 {item.name}</p></a><small style={{ color: '#999' }}>{new Date(item.uploadedAt).toLocaleDateString('pt-BR')} • {(item.size / 1024 / 1024).toFixed(1)} MB</small></div>
              <button onClick={() => handleDelete(item.id, (item as any).storagePath)} style={{ padding: '.5rem 1rem', backgroundColor: '#E8D7D1', border: 0, borderRadius: 16, cursor: 'pointer', color: '#8B4513', fontWeight: 500 }}>Remover</button>
            </div>
          ))}</div>}
        </div>
        <a href="/admin"><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel Admin</button></a>
      </section>
    </main>
  );
}
