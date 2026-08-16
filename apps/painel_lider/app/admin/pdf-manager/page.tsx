'use client';

import { useState } from 'react';

interface PDFDocument {
  id: string;
  name: string;
  uploadedAt: string;
  size: string;
}

export default function PDFManagerPage() {
  const [documents, setDocuments] = useState<PDFDocument[]>([
    { id: '1', name: 'Guia Espiritual 2024', uploadedAt: '15/08/2024', size: '2.3 MB' },
    { id: '2', name: 'Apostila de Estudo', uploadedAt: '10/08/2024', size: '5.1 MB' },
  ]);
  const [newDocName, setNewDocName] = useState('');
  const [newDocFile, setNewDocFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (newDocName.trim() && newDocFile) {
      const newDoc: PDFDocument = {
        id: Date.now().toString(),
        name: newDocName,
        uploadedAt: new Date().toLocaleDateString('pt-BR'),
        size: (newDocFile.size / 1024 / 1024).toFixed(1) + ' MB',
      };
      setDocuments([newDoc, ...documents]);
      setNewDocName('');
      setNewDocFile(null);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
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

            <button
              onClick={handleUpload}
              disabled={!newDocName.trim() || !newDocFile}
              className="btn"
              style={{ width: '100%' }}
            >
              Enviar PDF
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
                    <p style={{ fontWeight: '600', color: '#2E2E2E' }}>📄 {doc.name}</p>
                    <small style={{ color: '#999' }}>
                      {doc.uploadedAt} • {doc.size}
                    </small>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
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
