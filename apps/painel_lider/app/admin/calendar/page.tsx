'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createEvent, getEvents, deleteEvent } from '@/lib/services/calendar-service';
import { CalendarEvent } from '@/lib/types';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    date: '',
    time: '',
    description: '',
    type: 'culto',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const eventsList = await getEvents();
      setEvents(eventsList);
    } catch (err) {
      setError('Erro ao carregar eventos');
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.time || !formData.type) return;

    setLoading(true);
    setError('');
    try {
      const newEvent = await createEvent(
        {
          title: formData.title,
          date: formData.date,
          time: formData.time,
          description: formData.description || '',
          type: formData.type as CalendarEvent['type'],
        },
        'admin'
      );
      setEvents([...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setFormData({ title: '', date: '', time: '', description: '', type: 'culto' });
    } catch (err) {
      setError('Erro ao criar evento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este evento?')) return;

    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      setError('Erro ao deletar evento');
      console.error(err);
    }
  };

  const getEventIcon = (type: string) => {
    const icons: Record<string, string> = {
      retiro: '🏞️',
      culto: '⛪',
      encontro: '👥',
      outro: '📅',
    };
    return icons[type] || '📅';
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
          <div className="brand">Calendário</div>
          <small>Gerencie eventos e datas</small>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">📅 Eventos e Datas</div>
          <h1>Calendário de Atividades</h1>
          <p>Publique retiros, cultos, encontros e eventos do ministério.</p>
        </div>

        <div className="card">
          <h2>Novo Evento</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Título do Evento
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Retiro de Oração"
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                  Data
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
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                  Horário
                </label>
                <input
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Tipo de Evento
              </label>
              <select
                value={formData.type || 'culto'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as CalendarEvent['type'] })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFF',
                }}
              >
                <option value="retiro">🏞️ Retiro</option>
                <option value="culto">⛪ Culto</option>
                <option value="encontro">👥 Encontro</option>
                <option value="outro">📅 Outro</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Descrição
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detalhes sobre o evento..."
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
              {loading ? '⏳ Criando...' : 'Criar Evento'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Eventos Próximos</h2>
          {events.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum evento criado ainda.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {events.map((event) => (
                <div
                  key={event.id}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#FAF2F1',
                    borderRadius: '20px',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '600', fontSize: '1.1rem', color: '#2E2E2E' }}>
                        {getEventIcon(event.type)} {event.title}
                      </p>
                      <p style={{ color: '#666', marginTop: '0.25rem' }}>
                        📅 {formatDate(event.date)} às {event.time}
                      </p>
                      {event.description && (
                        <p style={{ color: '#999', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                          {event.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(event.id)}
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
