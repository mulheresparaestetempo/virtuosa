'use client';

import { useEffect, useState } from 'react';
import { savePDFLink, getPDFs, deletePDF, updatePDF } from '@/lib/services/pdf-service';
import { PDFDocument } from '@/lib/types';
import { useAuth } from '@/lib/context/auth-context';

const inp: React.CSSProperties = { width: '100%', padding: '.75rem', border: '2px solid #E8E8E8', borderRadius: 20, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '1rem' };

function getGoogleDriveViewerUrl(url: string): string {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
}

export default function PDFManagerPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [form, setForm] = useState({ name: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { loadDocs(); }, []);

  const loadDocs = async () => {
    setLoadingItems(true);
    try { setDocuments(await getPDFs()); }
    catch { setError('Não foi possível carregar os PDFs.'); }
    finally { setLoadingItems(false); }
  };

  const startEdit = (doc: PDFDocument) => {
    setEditingId(doc.id);
    setForm({ name: doc.name, url: doc.url });
    setPreviewId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({ name: '', url: '' }); setError(''); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.url.trim()) return;
    setLoading(true); setError(''); setSuccess('');
    try {
      if (editingId) {
        await updatePDF(editingId, form.name, form.url);
        setDocuments(documents.map(d => d.id === editingId ? { ...d, name: form.name.trim(), url: form.url.trim() } : d));
        setSuccess('✅ PDF atualizado com sucesso!');
        setEditingId(null);
      } else {
        const newDoc = await savePDFLink(form.url, form.name, user!.uid);
        setDocuments([newDoc, ...documents]);
        setSuccess('✅ PDF adicionado com sucesso!');
      }
      setForm({ name: '', url: '' });
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err?.message || 'Erro ao salvar o PDF.');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este PDF?')) return;
    try { await deletePDF(id); setDocuments(documents.filter(d => d.id !== id)); if (previewId === id) setPreviewId(null); }
    catch (err: any) { setError(err?.message || 'Erro ao remover.'); }
  };

  return (
    <main className="page">
      <header className="header"><div><div className="brand">PDFs</div><small>Biblioteca de recursos</small></div></header>
      <section className="main">
        <div className="hero">
          <div className="kicker">📄 Biblioteca de PDFs</div>
          <h1>Biblioteca de Recursos</h1>
          <p>Cole o link do PDF (Google Drive, Dropbox, etc.) para disponibilizá-lo para as filhas.</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{editingId ? '✏️ Editando PDF' : 'Novo Documento'}</h2>
            {editingId && <button onClick={cancelEdit} style={{ padding: '0.4rem 1rem', border: '2px solid #E8E8E8', borderRadius: 14, cursor: 'pointer', background: 'transparent', fontSize: '0.9rem' }}>Cancelar</button>}
          </div>
          <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Nome do documento</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ex.: Guia de Oração" style={inp} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Link do PDF</label>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://drive.google.com/file/..." style={inp} />
              <p style={{ marginTop: '.4rem', fontSize: '.82rem', color: '#999' }}>
                💡 Google Drive: compartilhe com "Qualquer pessoa com o link" e cole aqui.
              </p>
            </div>
            {success && <div style={{ backgroundColor: '#E8F5E8', color: '#2E7D32', padding: '.75rem', borderRadius: 16 }}>{success}</div>}
            {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '.75rem', borderRadius: 16 }}>{error}</div>}
            <button onClick={handleSave} disabled={!form.name.trim() || !form.url.trim() || loading || !user} className="btn" style={{ width: '100%' }}>
              {loading ? '⏳ Salvando...' : editingId ? 'Salvar alterações' : 'Adicionar PDF'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Documentos Publicados ({documents.length})</h2>
          {loadingItems ? <p style={{ marginTop: '1rem', color: '#999' }}>⏳ Carregando...</p>
            : documents.length === 0 ? <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum documento adicionado ainda.</p>
            : <div style={{ marginTop: '1rem' }}>
              {documents.map(item => (
                <div key={item.id} style={{ marginBottom: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: editingId === item.id ? '#FFFBF0' : '#FAF2F1', borderRadius: 20, border: editingId === item.id ? '2px solid #D4A574' : '2px solid transparent', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 600, color: '#2E2E2E', margin: 0 }}>📄 {item.name}</p>
                      <small style={{ color: '#999' }}>{new Date(item.uploadedAt).toLocaleDateString('pt-BR')}</small>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      <button onClick={() => setPreviewId(previewId === item.id ? null : item.id)} style={{ padding: '.5rem .75rem', backgroundColor: '#EBF1FA', border: 'none', borderRadius: 14, cursor: 'pointer', color: '#2A5C9E', fontWeight: 500, fontSize: '0.85rem' }}>{previewId === item.id ? 'Fechar' : 'Visualizar'}</button>
                      <button onClick={() => startEdit(item)} style={{ padding: '.5rem .75rem', backgroundColor: '#E8E8E8', border: 'none', borderRadius: 14, cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}>Editar</button>
                      <a href={item.url} target="_blank" rel="noopener noreferrer"><button style={{ padding: '.5rem .75rem', backgroundColor: '#E8F5E8', border: 'none', borderRadius: 14, cursor: 'pointer', color: '#1B6B3A', fontWeight: 500, fontSize: '0.85rem' }}>Abrir</button></a>
                      <button onClick={() => handleDelete(item.id)} style={{ padding: '.5rem .75rem', backgroundColor: '#E8D7D1', border: 'none', borderRadius: 14, cursor: 'pointer', color: '#8B4513', fontWeight: 500, fontSize: '0.85rem' }}>Remover</button>
                    </div>
                  </div>
                  {previewId === item.id && (
                    <div style={{ marginTop: '0.5rem', borderRadius: 16, overflow: 'hidden', border: '2px solid #E8E8E8' }}>
                      <iframe src={getGoogleDriveViewerUrl(item.url)} width="100%" height="500px" style={{ border: 'none', display: 'block' }} title={item.name} />
                    </div>
                  )}
                </div>
              ))}
            </div>}
        </div>

        <a href="/admin"><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel Admin</button></a>
      </section>
    </main>
  );
}
