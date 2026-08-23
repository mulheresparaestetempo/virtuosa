'use client';

import { useEffect, useState } from 'react';
import { getDevotionals } from '@/lib/services/devocional-service';
import { Devocional } from '@/lib/types';

export default function FilhaDevocionalPage() {
  const [devs, setDevs] = useState<Devocional[]>([]);
  const [selected, setSelected] = useState<Devocional | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getDevotionals()
      .then(list => {
        setDevs(list);
        setSelected(list[0] || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  if (devs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
        <h2 style={{ color: '#8b7770', fontWeight: 600 }}>Nenhum devocional publicado ainda</h2>
        <p style={{ color: '#aaa' }}>A líder ainda não publicou o devocional de hoje. Volte mais tarde.</p>
      </div>
    );
  }

  const dev = selected!;

  return (
    <div>
      {/* Selector for multiple devocionais */}
      {devs.length > 1 && (
        <div style={{ marginBottom: '1.5rem', overflowX: 'auto', display: 'flex', gap: '0.5rem', paddingBottom: '0.5rem' }}>
          {devs.map(d => (
            <button
              key={d.id}
              onClick={() => { setSelected(d); setCompleted(false); }}
              style={{
                flex: '0 0 auto',
                padding: '0.5rem 1rem',
                borderRadius: 20,
                border: '2px solid',
                borderColor: selected?.id === d.id ? 'var(--rosa)' : 'var(--rosa-pastel)',
                background: selected?.id === d.id ? 'var(--rosa-pastel)' : 'white',
                color: selected?.id === d.id ? 'var(--rosa-dark)' : '#8b7770',
                fontWeight: selected?.id === d.id ? 700 : 400,
                cursor: 'pointer',
                fontSize: '0.85rem',
                font: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              {d.date || d.title.substring(0, 18)}
            </button>
          ))}
        </div>
      )}

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,rgba(232,196,216,0.5),rgba(245,241,237,0.8))', borderRadius: 20, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '4rem' }}>
        🌿
      </div>

      <h1 style={{ fontFamily: 'Caveat, cursive', color: 'var(--rosa)', fontSize: '2rem', margin: '0 0 1.5rem' }}>{dev.title}</h1>

      <Section icon="📖" title="Versículo">
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.7, color: '#5a4a47', margin: 0 }}>
          "{dev.versicles}"
        </p>
      </Section>

      <Section icon="💡" title="Reflexão">
        <p style={{ lineHeight: 1.7, color: '#5a4a47', margin: 0, whiteSpace: 'pre-wrap' }}>{dev.reflection}</p>
      </Section>

      <Section icon="🙏" title="Oração">
        <p style={{ lineHeight: 1.7, color: '#5a4a47', margin: 0, whiteSpace: 'pre-wrap' }}>{dev.prayer}</p>
      </Section>

      <button
        onClick={() => setCompleted(true)}
        disabled={completed}
        className="btn"
        style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}
      >
        {completed ? '✓ Momento concluído' : '💕 Finalizar meu momento'}
      </button>

      {completed && (
        <div style={{ marginTop: '1rem', background: 'linear-gradient(135deg,rgba(232,196,216,0.4),rgba(248,244,240,0.9))', border: '2px solid var(--rosa-pastel)', borderRadius: 16, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#5a4a47', lineHeight: 1.6 }}>
            "Que a Palavra permaneça em seu coração e que Abba fortaleça seus passos."
          </p>
        </div>
      )}
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', border: '1.5px solid var(--rosa-pastel)', borderRadius: 14, padding: '1.25rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.1rem' }}>{icon}</span>
        <span style={{ fontWeight: 700, color: '#5a4a47' }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Loader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <div style={{ textAlign: 'center', color: '#8b7770' }}>🌸 Carregando...</div>
    </div>
  );
}
