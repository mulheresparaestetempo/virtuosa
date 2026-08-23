'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sendAviso, getAvisos, deleteAviso, updateAviso } from '@/lib/services/avisos-service';
import { Aviso } from '@/lib/types';
import { useAuth } from '@/lib/context/auth-context';

const EMPTY = { title: '', message: '', priority: 'média' as const };

export default function AvisosPage() {
  const { user } = useAuth();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [form, setForm] = useState<{ title: string; message: string; priority: 'baixa' | 'média' | 'alta' }>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { loadAvisos(); }, []);

  const loadAvisos = async () => {
    setLoadingItems(true);
    try { setAvisos(await getAvisos()); }
    catch { setError('Erro ao carregar avisos'); }
    finally { setLoadingItems(false); }
  };

  const startEdit = (aviso: Aviso) => {
    setEditingId(aviso.id);
    setForm({ title: aviso.title, message: aviso.message, priority: aviso.priority });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm(EMPTY); setError(''); };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.message.trim()) return;
    setLoading(true); setError(''); setSuccess('');
    try {
      if (editingId) {
        await updateAviso(editingId, form);
        setAvisos(avisos.map(a => a.id === editingId ? { ...a, ...form } : a));
        setSuccess('✅ Aviso atualizado com sucesso!');
      } else {
        const newAviso = await sendAviso(form, user?.uid || 'admin', 0);
        setAvisos([newAviso, ...avisos]);
        setSuccess('✅ Aviso enviado com sucesso!');
      }
      setForm(EMPTY); setEditingId(null);
      setTimeout(() => setSuccess(''), 4000);
    } catch { setError('Erro ao salvar aviso'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este aviso?')) return;
    try { await deleteAviso(id); setAvisos(avisos.filter(a => a.id !== id)); }
    catch { setError('Erro ao remover aviso'); }
  };

  const priorityColors: Record<string, { bg: string; text: string }> = {
    baixa: { bg: '#F0F4E8', text: '#7A9C3B' },
    média: { bg: '#FFF8E8', text: '#D4A574' },
    alta: { bg: '#FFE8E8', text: '#C85A54' },
  };

  const priorityIcons: Record<string, string> = { baixa: '📌', média: '⚠️', alta: '🔴' };
  const inp: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '2px solid #E8E8E8', borderRadius: '20px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };

  return (
    <main className="page">
      <header className="header"><div><div className="brand">Avisos</div><small>Notificações importantes</small></div></header>
      <section className="main">
        <div className="hero">
          <div className="kicker">📢 Comunicados</div>
          <h1>Enviar Notificações</h1>
          <p>Comunique informações importantes para todas as usuárias do app FILHA.</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{editingId ? '✏️ Editando Aviso' : 'Novo Aviso'}</h2>
            {editingId && <button onClick={cancelEdit} style={{ padding: '0.4rem 1rem', border: '2px solid #E8E8E8', borderRadius: 14, cursor: 'pointer', background: 'transparent', fontSize: '0.9rem' }}>Cancelar</button>}
          </div>
          <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Título do Aviso</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Manutenção Programada" style={inp} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Nível de Prioridade</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {(['baixa', 'média', 'alta'] as const).map(p => (
                  <button key={p} onClick={() => setForm({ ...form, priority: p })} style={{ padding: '0.75rem', border: form.priority === p ? '2px solid #D4A574' : '2px solid #E8E8E8', borderRadius: '16px', backgroundColor: form.priority === p ? '#FFFBF7' : '#FFF', cursor: 'pointer', fontWeight: 500, textTransform: 'capitalize' }}>
                    {priorityIcons[p]} {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Mensagem</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Escreva a notificação importante..." style={{ ...inp, minHeight: '120px', resize: 'vertical' }} />
            </div>
            {!editingId && <div style={{ backgroundColor: '#F5F5F5', padding: '1rem', borderRadius: '16px' }}>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>ℹ️ Este aviso será visível para <strong>todas as usuárias</strong> do app FILHA.</p>
            </div>}
            {success && <div style={{ backgroundColor: '#E8F5E8', color: '#2E7D32', padding: '0.75rem', borderRadius: '16px' }}>{success}</div>}
            {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px' }}>{error}</div>}
            <button onClick={handleSubmit} disabled={loading || !form.title.trim() || !form.message.trim()} className="btn" style={{ width: '100%' }}>
              {loading ? '⏳ Salvando...' : editingId ? 'Salvar alterações' : 'Enviar Notificação'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Histórico de Avisos ({avisos.length})</h2>
          {loadingItems ? <p style={{ marginTop: '1rem', color: '#999' }}>⏳ Carregando...</p>
            : avisos.length === 0 ? <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum aviso enviado ainda.</p>
            : <div style={{ marginTop: '1rem' }}>
              {avisos.map(aviso => {
                const pc = priorityColors[aviso.priority] || priorityColors.média;
                return (
                  <div key={aviso.id} style={{ padding: '1rem', backgroundColor: editingId === aviso.id ? '#FFFBF0' : pc.bg, borderRadius: '20px', marginBottom: '1rem', border: editingId === aviso.id ? '2px solid #D4A574' : '2px solid transparent' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          <p style={{ fontWeight: 600, color: pc.text, margin: 0 }}>{priorityIcons[aviso.priority]} {aviso.title}</p>
                          <span style={{ fontSize: '0.75rem', backgroundColor: pc.text, color: '#FFF', padding: '0.2rem 0.5rem', borderRadius: '12px', textTransform: 'capitalize' }}>{aviso.priority}</span>
                        </div>
                        <p style={{ color: '#666', lineHeight: '1.5', margin: '0 0 0.5rem' }}>{aviso.message}</p>
                        <small style={{ color: '#999' }}>📤 {new Date(aviso.sentAt).toLocaleDateString('pt-BR')}</small>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <button onClick={() => startEdit(aviso)} style={{ padding: '0.5rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.7)', border: `2px solid ${pc.text}`, borderRadius: '16px', cursor: 'pointer', color: pc.text, fontWeight: 500, fontSize: '0.85rem' }}>Editar</button>
                        <button onClick={() => handleDelete(aviso.id)} style={{ padding: '0.5rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.5)', border: `2px solid ${pc.text}`, borderRadius: '16px', cursor: 'pointer', color: pc.text, fontWeight: 500, fontSize: '0.85rem' }}>Remover</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>}
        </div>

        <Link href="/admin" style={{ display: 'block', marginTop: '2rem' }}><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel Admin</button></Link>
      </section>
    </main>
  );
}
