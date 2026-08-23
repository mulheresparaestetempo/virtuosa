'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { publishDevocional, getDevotionals, deleteDevocional } from '@/lib/services/devocional-service';
import { Devocional } from '@/lib/types';

export default function DevocionalPage() {
  const [devotionals, setDevotionals] = useState<Devocional[]>([]);
  const [formData, setFormData] = useState<Partial<Devocional>>({
    date: new Date().toISOString().split('T')[0],
    title: '',
    versicles: '',
    reflection: '',
    prayer: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDevotionals();
  }, []);

  const loadDevotionals = async () => {
    try {
      const devs = await getDevotionals();
      setDevotionals(devs);
    } catch (err) {
      setError('Erro ao carregar devocionais');
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!formData.date || !formData.title || !formData.versicles || !formData.reflection) return;

    setLoading(true);
    setError('');
    try {
      const newDevocional = await publishDevocional(
        {
          date: formData.date,
          title: formData.title,
          versicles: formData.versicles,
          reflection: formData.reflection,
          prayer: formData.prayer || '',
        },
        'admin'
      );
      setDevotionals([newDevocional, ...devotionals]);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        title: '',
        versicles: '',
        reflection: '',
        prayer: '',
      });
    } catch (err) {
      setError('Erro ao publicar devocional');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este devocional?')) return;

    try {
      await deleteDevocional(id);
      setDevotionals(devotionals.filter(dev => dev.id !== id));
    } catch (err) {
      setError('Erro ao deletar devocional');
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Devocionais</div>
          <small>Meditações diárias</small>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">✦ Devocional Diário</div>
          <h1>Escrever Meditação</h1>
          <p>Publique mensagens de esperança e reflexões espirituais para as filhas.</p>
        </div>

        <div className="card">
          <h2>Nova Meditação</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Data da Publicação
              </label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                Título da Meditação
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Confiança em Deus"
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
                Versículo(s) Biblico(s)
              </label>
              <input
                type="text"
                value={formData.versicles || ''}
                onChange={(e) => setFormData({ ...formData, versicles: e.target.value })}
                placeholder="Ex: Salmos 27:10 ou João 3:16"
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
                Reflexão (Meditação)
              </label>
              <textarea
                value={formData.reflection || ''}
                onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                placeholder="Escreva a meditação do dia..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  minHeight: '150px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Oração de Encerramento
              </label>
              <textarea
                value={formData.prayer || ''}
                onChange={(e) => setFormData({ ...formData, prayer: e.target.value })}
                placeholder="Escreva uma oração para encerrar a meditação (opcional)..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  minHeight: '100px',
                  resize: 'vertical',
                }}
              />
            </div>

            {error && (
              <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading} className="btn" style={{ width: '100%' }}>
              {loading ? '⏳ Publicando...' : 'Publicar Devocional'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Devocionais Publicados</h2>
          {devotionals.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum devocional publicado ainda.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {devotionals.map((dev) => (
                <div
                  key={dev.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#FAF2F1',
                    borderRadius: '20px',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <small style={{ color: '#999' }}>✦ {formatDate(dev.date)}</small>
                      </div>
                      <p style={{ fontWeight: '600', fontSize: '1.1rem', color: '#2E2E2E', marginBottom: '0.5rem' }}>
                        {dev.title}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: '#8B4513', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                        {dev.versicles}
                      </p>
                      <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                        {dev.reflection}
                      </p>
                      {dev.prayer && (
                        <p style={{ color: '#666', fontSize: '0.95rem', fontStyle: 'italic', paddingTop: '0.75rem', borderTop: '1px solid #E0C0B0' }}>
                          🙏 {dev.prayer}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(dev.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#E8D7D1',
                        border: 'none',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        color: '#8B4513',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        marginLeft: '1rem',
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link href="/admin" style={{ display: 'block', marginTop: '2rem' }}>
          <button className="btn secondary" style={{ width: '100%' }}>
            Voltar ao Painel Admin
          </button>
        </Link>
      </section>
    </main>
  );
}
