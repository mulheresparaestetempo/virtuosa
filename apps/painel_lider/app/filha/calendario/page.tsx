'use client';

import { useEffect, useState } from 'react';
import { getEvents } from '@/lib/services/calendar-service';
import { CalendarEvent } from '@/lib/types';

const TYPE_LABELS: Record<string, string> = {
  retiro: '🏕️ Retiro',
  culto: '⛪ Culto',
  encontro: '🤝 Encontro',
  outro: '📌 Evento',
};

const TYPE_COLORS: Record<string, string> = {
  retiro: '#e8d5f5',
  culto: '#d5e8f5',
  encontro: '#f5e8d5',
  outro: '#f5f5d5',
};

export default function FilhaCalendarioPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(evs => {
        const today = new Date().toISOString().split('T')[0];
        setEvents(evs.filter(e => e.date >= today));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: 'Caveat, cursive', color: 'var(--rosa)', fontSize: '2rem', margin: '0 0 1.25rem' }}>
        📅 Agenda
      </h1>

      {loading ? (
        <Loader />
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#8b7770' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📅</div>
          <p style={{ margin: 0 }}>Nenhum evento agendado no momento.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {events.map(ev => {
            const [year, month, day] = ev.date.split('-');
            const dateLabel = `${day}/${month}/${year}`;
            return (
              <div key={ev.id} style={{ background: TYPE_COLORS[ev.type] || '#f5f5f5', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 14, padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 700, color: '#5a4a47', fontSize: '1rem', flex: 1 }}>{ev.title}</div>
                  <span style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 10, padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: '#5a4a47', flex: '0 0 auto', fontWeight: 600 }}>
                    {TYPE_LABELS[ev.type] || '📌'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#8b7770', flexWrap: 'wrap' }}>
                  <span>📅 {dateLabel}</span>
                  {ev.time && <span>🕐 {ev.time}</span>}
                </div>
                {ev.description && (
                  <p style={{ margin: '0.75rem 0 0', fontSize: '0.9rem', color: '#5a4a47', lineHeight: 1.5 }}>{ev.description}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
      <div style={{ color: '#8b7770' }}>🌸 Carregando...</div>
    </div>
  );
}
