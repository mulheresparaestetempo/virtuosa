'use client';

import { useState, useEffect } from 'react';
import { publishDevocional, getDevotionals, deleteDevocional, updateDevocional } from '@/lib/services/devocional-service';
import { Devocional } from '@/lib/types';
import { useAuth } from '@/lib/context/auth-context';

const EMPTY: Omit<Devocional, 'id' | 'publishedAt' | 'publishedBy'> = { date: '', title: '', versicles: '', reflection: '', prayer: '' };

const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '2px solid #E8E8E8', borderRadius: '20px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical' };

export default function DevocionalPage() {
  const { user } = useAuth();
  const [devotionals, setDevotionals] = useState<Devocional[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { loadDevotionals(); }, []);

  const loadDevotionals = async () => {
    setLoadingItems(true);
    try { setDevotionals(await getDevotionals()); }
    catch { setError('Erro ao carregar devocionais'); }
    finally { setLoadingItems(false); }
  };

  const startEdit = (dev: Devocional) => {
    setEditingId(dev.id);
    setForm({ date: dev.date, title: dev.title, versicles: dev.versicles, reflection: dev.reflection, prayer: dev.prayer });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm(EMPTY); setError(''); };

  const handleSubmit = async () => {
    if (!form.date || !form.title || !form.versicles || !form.reflection) return;
    setLoading(true); setError(''); setSuccess('');
    try {
      if (editingId) {
        await updateDevocional(editingId, form);
        setDevotionals(devotionals.map(d => d.id === editingId ? { ...d, ...form } : d));
        setSuccess('✅ Devocional atualizado com sucesso!');
      } else {
        const newDev = await publishDevocional(form, user?.uid || 'admin');
        setDevotionals([newDev, ...devotionals]);
        setSuccess('✅ Devocional publicado com sucesso!');
      }
      setForm({ ...EMPTY, date: new Date().toISOString().split('T')[0] });
      setEditingId(null);
      setTimeout(() => setSuccess(''), 4000);
    } catch { setError('Erro ao salvar devocional'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este devocional?')) return;
    try { await deleteDevocional(id); setDevotionals(devotionals.filter(d => d.id !== id)); }
    catch { setError('Erro ao remover devocional'); }
  };

  const formatDate = (s: string) => new Date(s + 'T00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <main className="page">
      <header className="header"><div><div className="brand">Devocionais</div><small>Meditações diárias</small></div></header>
      <section className="main">
        <div className="hero">
          <div className="kicker">✦ Devocional Diário</div>
          <h1>Escrever Meditação</h1>
          <p>Publique mensagens de esperança e reflexões espirituais para as filhas.</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{editingId ? '✏️ Editando Devocional' : 'Nova Meditação'}</h2>
            {editingId && <button onClick={cancelEdit} style={{ padding: '0.4rem 1rem', border: '2px solid #E8E8E8', borderRadius: 14, cursor: 'pointer', background: 'transparent', fontSize: '0.9rem' }}>Cancelar edição</button>}
          </div>
          <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Data da Publicação</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Título da Meditação</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Confiança em Deus" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Versículo(s) Bíblico(s)</label>
              <input type="text" value={form.versicles} onChange={e => setForm({ ...form, versicles: e.target.value })} placeholder="Ex: Salmos 27:10 ou João 3:16" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Reflexão (Meditação)</label>
              <textarea value={form.reflection} onChange={e => setForm({ ...form, reflection: e.target.value })} placeholder="Escreva a meditação do dia..." style={{ ...textareaStyle, minHeight: '150px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Oração de Encerramento (opcional)</label>
              <textarea value={form.prayer} onChange={e => setForm({ ...form, prayer: e.target.value })} placeholder="Escreva uma oração para encerrar..." style={{ ...textareaStyle, minHeight: '100px' }} />
            </div>
            {success && <div style={{ backgroundColor: '#E8F5E8', color: '#2E7D32', padding: '0.75rem', borderRadius: '16px' }}>{success}</div>}
            {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px' }}>{error}</div>}
            <button onClick={handleSubmit} disabled={loading || !form.date || !form.title || !form.versicles || !form.reflection} className="btn" style={{ width: '100%' }}>
              {loading ? '⏳ Salvando...' : editingId ? 'Salvar alterações' : 'Publicar Devocional'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Devocionais Publicados ({devotionals.length})</h2>
          {loadingItems ? <p style={{ marginTop: '1rem', color: '#999' }}>⏳ Carregando...</p>
            : devotionals.length === 0 ? <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum devocional publicado ainda.</p>
            : <div style={{ marginTop: '1rem' }}>
              {devotionals.map(dev => (
                <div key={dev.id} style={{ padding: '1.5rem', backgroundColor: editingId === dev.id ? '#FFFBF0' : '#FAF2F1', borderRadius: '20px', marginBottom: '1rem', border: editingId === dev.id ? '2px solid #D4A574' : '2px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <small style={{ color: '#999' }}>✦ {formatDate(dev.date)}</small>
                      <p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#2E2E2E', margin: '0.25rem 0' }}>{dev.title}</p>
                      <p style={{ fontSize: '0.9rem', color: '#8B4513', fontStyle: 'italic', marginBottom: '0.5rem' }}>{dev.versicles}</p>
                      <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '0.5rem' }}>{dev.reflection}</p>
                      {dev.prayer && <p style={{ color: '#666', fontSize: '0.95rem', fontStyle: 'italic', paddingTop: '0.5rem', borderTop: '1px solid #E0C0B0' }}>🙏 {dev.prayer}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      <button onClick={() => startEdit(dev)} style={{ padding: '0.5rem 1rem', backgroundColor: '#E8E8E8', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}>Editar</button>
                      <button onClick={() => handleDelete(dev.id)} style={{ padding: '0.5rem 1rem', backgroundColor: '#E8D7D1', border: 'none', borderRadius: '16px', cursor: 'pointer', color: '#8B4513', fontWeight: 500, fontSize: '0.85rem' }}>Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>}
        </div>

        <a href="/admin"><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel Admin</button></a>
      </section>
    </main>
  );
}
