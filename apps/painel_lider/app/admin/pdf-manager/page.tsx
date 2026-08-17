'use client';

import { useEffect, useState } from 'react';
import { savePDFLink, getPDFs, deletePDF } from '@/lib/services/pdf-service';
import { PDFDocument } from '@/lib/types';
import { useAuth } from '@/lib/context/auth-context';

export default function PDFManagerPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [newDocName, setNewDocName] = useState('');
  const [newDocUrl, setNewDocUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const loadDocuments = async () => {
    setLoadingItems(true);
    try { setDocuments(await getPDFs()); }
    catch (err) { setError('Não foi possível carregar os PDFs.'); console.error(err); }
    finally { setLoadingItems(false); }
  };

  useEffect(() => { loadDocuments(); }, []);

  const handleSave = async () => {
    if (!user || !newDocName.trim() || !newDocUrl.trim()) return;
    setLoading(true); setError(''); setSuccess('');
    try {
      const newDoc = await savePDFLink(newDocUrl, newDocName, user.uid);
      setDocuments((current) => [newDoc, ...current]);
      setNewDocName(''); setNewDocUrl('');
      setSuccess('✅ PDF adicionado com sucesso!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err?.message || 'Erro ao salvar o PDF.');
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este PDF?')) return;
    try { await deletePDF(id); setDocuments((current) => current.filter((doc) => doc.id !== id)); }
    catch (err: any) { setError(err?.message || 'Erro ao remover o PDF.'); console.error(err); }
  };

  return (
    <main className="page">
      <header className="header"><div><div className="brand">PDFs</div><small>Biblioteca de recursos</small></div></header>
      <section className="main">
        <div className="hero">
          <div className="kicker">📄 Biblioteca de PDFs</div>
          <h1>Biblioteca de Recursos</h1>
          <p>Cole o link do PDF (Google Drive, Dropbox, etc.) e disponibilize-o para as filhas.</p>
        </div>
        <div className="card">
          <h2>Novo Documento</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Nome do documento</label>
            <input value={newDocName} onChange={(e) => setNewDocName(e.target.value)} placeholder="Ex.: Guia de Oração" style={{ width: '100%', padding: '.75rem', border: '2px solid #E8E8E8', borderRadius: 20, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '1rem' }} />
            <label style={{ display: 'block', margin: '1rem 0 .5rem', fontWeight: 500 }}>Link do PDF</label>
            <input value={newDocUrl} onChange={(e) => setNewDocUrl(e.target.value)} placeholder="https://drive.google.com/file/..." style={{ width: '100%', padding: '.75rem', border: '2px solid #E8E8E8', borderRadius: 20, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '1rem' }} />
            <p style={{ marginTop: '.5rem', fontSize: '.85rem', color: '#999' }}>
              💡 Suba o PDF no Google Drive, clique em "Compartilhar" → "Qualquer pessoa com o link" e cole o link aqui.
            </p>
            {success && <div style={{ backgroundColor: '#E8F5E8', color: '#2E7D32', padding: '.75rem', borderRadius: 16, margin: '1rem 0' }}>{success}</div>}
            {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '.75rem', borderRadius: 16, margin: '1rem 0' }}>{error}</div>}
            <button onClick={handleSave} disabled={!newDocName.trim() || !newDocUrl.trim() || loading || !user} className="btn" style={{ width: '100%', marginTop: '1rem' }}>{loading ? '⏳ Salvando...' : 'Adicionar PDF'}</button>
          </div>
        </div>
        <div className="card">
          <h2>Documentos Publicados ({documents.length})</h2>
          {loadingItems ? <p style={{ marginTop: '1rem', color: '#999' }}>⏳ Carregando...</p> : documents.length === 0 ? <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum documento adicionado ainda.</p> : <div style={{ marginTop: '1rem' }}>{documents.map((item) => (
            <div key={item.id} style={{ padding: '1rem', backgroundColor: '#FAF2F1', borderRadius: 20, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <div><a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><p style={{ fontWeight: 600, color: '#2E2E2E' }}>📄 {item.name}</p></a><small style={{ color: '#999' }}>{new Date(item.uploadedAt).toLocaleDateString('pt-BR')}</small></div>
              <button onClick={() => handleDelete(item.id)} style={{ padding: '.5rem 1rem', backgroundColor: '#E8D7D1', border: 0 as const, borderRadius: 16, cursor: 'pointer', color: '#8B4513', fontWeight: 500 }}>Remover</button>
            </div>
          ))}</div>}
        </div>
        <a href="/admin"><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel Admin</button></a>
      </section>
    </main>
  );
}
