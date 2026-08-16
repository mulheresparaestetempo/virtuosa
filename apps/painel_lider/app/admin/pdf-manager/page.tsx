'use client';

import { useState, useEffect } from 'react';
import { uploadPDF, getPDFs, deletePDF } from '@/lib/services/pdf-service';
import { PDFDocument } from '@/lib/types';

export default function PDFManagerPage() {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [newDocName, setNewDocName] = useState('');
  const [newDocFile, setNewDocFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await getPDFs();
      setDocuments(docs);
    } catch (err) {
      setError('Erro ao carregar PDFs');
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!newDocName.trim() || !newDocFile) return;

    setLoading(true);
    setError('');
    try {
      const newDoc = await uploadPDF(newDocFile, newDocName, 'admin');
      setDocuments([newDoc, ...documents]);
      setNewDocName('');
      setNewDocFile(null);
    } catch (err) {
      setError('Erro ao fazer upload do PDF');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!confirm('Tem certeza que deseja remover este PDF?')) return;

    try {
      await deletePDF(id, storagePath);
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (err) {
      setError('Erro ao deletar PDF');
      console.error(err);
    }
  };

  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">PDFs</div>
          <small>Gerenciar biblioteca de recursos</small>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">📄 Upload de Documentos</div>
          <h1>Biblioteca de Recursos</h1>
          <p>Compartilhe guias, apostilas e documentos com as filhas do app.</p>
        </div>

        <div className="card">
          <h2>Novo Documento</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Nome do Documento
              </label>
              <input
                type="text"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="Ex: Guia de Oração"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Arquivo PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setNewDocFile(e.target.files?.[0] || null)}
                style={{
                  display: 'block',
                  padding: '0.75rem',
                  border: '2px dashed #D4A574',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              {newDocFile && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>✓ {newDocFile.name}</p>}
            </div>

            {error && (
              <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!newDocName.trim() || !newDocFile || loading}
              className="btn"
              style={{ width: '100%' }}
            >
              {loading ? '⏳ Enviando...' : 'Enviar PDF'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Documentos Publicados</h2>
          {documents.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum documento enviado ainda.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#FAF2F1',
                    borderRadius: '20px',
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <p style={{ fontWeight: '600', color: '#2E2E2E', cursor: 'pointer' }}>📄 {doc.name}</p>
                    </a>
                    <small style={{ color: '#999' }}>
                      {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')} • {(doc.size / 1024 / 1024).toFixed(1)} MB
                    </small>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id, doc.url)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#E8D7D1',
                      border: 'none',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      color: '#8B4513',
                      fontWeight: '500',
                    }}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <a href="/admin" style={{ display: 'block', marginTop: '2rem' }}>
          <button className="btn secondary" style={{ width: '100%' }}>
            Voltar ao Painel Admin
          </button>
        </a>
      </section>
    </main>
  );
}
