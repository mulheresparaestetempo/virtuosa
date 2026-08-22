'use client';

import { useState, useEffect } from 'react';
import { createEvent, getEvents, deleteEvent, updateEvent } from '@/lib/services/calendar-service';
import { CalendarEvent } from '@/lib/types';
import { useAuth } from '@/lib/context/auth-context';

type EventType = CalendarEvent['type'];
const EMPTY: Omit<CalendarEvent, 'id' | 'createdAt' | 'createdBy'> = { title: '', date: '', time: '', description: '', type: 'culto' };

const inp: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '2px solid #E8E8E8', borderRadius: '20px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };

export default function CalendarPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    setLoadingItems(true);
    try { setEvents(await getEvents()); }
    catch { setError('Erro ao carregar eventos'); }
    finally { setLoadingItems(false); }
  };

  const startEdit = (ev: CalendarEvent) => {
    setEditingId(ev.id);
    setForm({ title: ev.title, date: ev.date, time: ev.time, description: ev.description, type: ev.type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm(EMPTY); setError(''); };

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.time || !form.type) return;
    setLoading(true); setError(''); setSuccess('');
    try {
      if (editingId) {
        await updateEvent(editingId, form);
        setEvents(events.map(e => e.id === editingId ? { ...e, ...form } : e).sort((a, b) => a.date.localeCompare(b.date)));
        setSuccess('✅ Evento atualizado com sucesso!');
      } else {
        const newEvent = await createEvent(form, user?.uid || 'admin');
        setEvents([...events, newEvent].sort((a, b) => a.date.localeCompare(b.date)));
        setSuccess('✅ Evento criado com sucesso!');
      }
      setForm(EMPTY); setEditingId(null);
      setTimeout(() => setSuccess(''), 4000);
    } catch { setError('Erro ao salvar evento'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este evento?')) return;
    try { await deleteEvent(id); setEvents(events.filter(e => e.id !== id)); }
    catch { setError('Erro ao remover evento'); }
  };

  const icons: Record<EventType, string> = { retiro: '🏞️', culto: '⛪', encontro: '👥', outro: '📅' };
  const formatDate = (s: string) => new Date(s + 'T00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <main className="page">
      <header className="header"><div><div className="brand">Calendário</div><small>Gerencie eventos e datas</small></div></header>
      <section className="main">
        <div className="hero">
          <div className="kicker">📅 Eventos e Datas</div>
          <h1>Calendário de Atividades</h1>
          <p>Publique retiros, cultos, encontros e eventos do ministério.</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{editingId ? '✏️ Editando Evento' : 'Novo Evento'}</h2>
            {editingId && <button onClick={cancelEdit} style={{ padding: '0.4rem 1rem', border: '2px solid #E8E8E8', borderRadius: 14, cursor: 'pointer', background: 'transparent', fontSize: '0.9rem' }}>Cancelar</button>}
          </div>
          <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Título do Evento</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Retiro de Oração" style={inp} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Data</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Horário</label>
                <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={inp} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Tipo de Evento</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as EventType })} style={{ ...inp, backgroundColor: '#FFF' }}>
                <option value="retiro">🏞️ Retiro</option>
                <option value="culto">⛪ Culto</option>
                <option value="encontro">👥 Encontro</option>
                <option value="outro">📅 Outro</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '.5rem', fontWeight: 500 }}>Descrição</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Detalhes sobre o evento..." style={{ ...inp, minHeight: '100px', resize: 'vertical' }} />
            </div>
            {success && <div style={{ backgroundColor: '#E8F5E8', color: '#2E7D32', padding: '0.75rem', borderRadius: '16px' }}>{success}</div>}
            {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px' }}>{error}</div>}
            <button onClick={handleSubmit} disabled={loading || !form.title || !form.date || !form.time} className="btn" style={{ width: '100%' }}>
              {loading ? '⏳ Salvando...' : editingId ? 'Salvar alterações' : 'Criar Evento'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Eventos ({events.length})</h2>
          {loadingItems ? <p style={{ marginTop: '1rem', color: '#999' }}>⏳ Carregando...</p>
            : events.length === 0 ? <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum evento criado ainda.</p>
            : <div style={{ marginTop: '1rem' }}>
              {events.map(ev => (
                <div key={ev.id} style={{ padding: '1rem', backgroundColor: editingId === ev.id ? '#FFFBF0' : '#FAF2F1', borderRadius: '20px', marginBottom: '1rem', border: editingId === ev.id ? '2px solid #D4A574' : '2px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: '1.05rem', color: '#2E2E2E', margin: 0 }}>{icons[ev.type]} {ev.title}</p>
                      <p style={{ color: '#666', margin: '0.25rem 0' }}>📅 {formatDate(ev.date)} às {ev.time}</p>
                      {ev.description && <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>{ev.description}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      <button onClick={() => startEdit(ev)} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#E8E8E8', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}>Editar</button>
                      <button onClick={() => handleDelete(ev.id)} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#E8D7D1', border: 'none', borderRadius: '16px', cursor: 'pointer', color: '#8B4513', fontWeight: 500, fontSize: '0.85rem' }}>Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>}
        </div>

        <a href="/admin" style={{ display: 'block', marginTop: '2rem' }}><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel Admin</button></a>
      </section>
    </main>
  );
}
