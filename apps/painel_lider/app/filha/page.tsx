'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { getDevotionals } from '@/lib/services/devocional-service';
import { getAvisos } from '@/lib/services/avisos-service';
import { Devocional, Aviso } from '@/lib/types';

export default function FilhaHomePage() {
  const { user } = useAuth();
  const [devocional, setDevocional] = useState<Devocional | null>(null);
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Filha';

  useEffect(() => {
    Promise.all([getDevotionals(), getAvisos()])
      .then(([devs, av]) => {
        setDevocional(devs[0] || null);
        setAvisos(av.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'Caveat, cursive', color: 'var(--rosa)' }}>
          {greeting()}, {firstName} 🌸
        </h1>
        <p style={{ margin: '0.25rem 0 0', color: '#8b7770', fontSize: '0.9rem' }}>
          Seu momento com Abba começa aqui.
        </p>
      </div>

      {/* Devocional card */}
      <Link href="/filha/devocional" style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ background: 'linear-gradient(135deg,rgba(232,196,216,0.4),rgba(245,241,237,0.95))', border: '2px solid var(--rosa-pastel)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--rosa-dark)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Devocional do Dia
          </div>
          {devocional ? (
            <>
              <p style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 600, color: '#5a4a47', lineHeight: 1.5, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                "{devocional.versicles}"
              </p>
              <p style={{ margin: '0 0 0.75rem', color: '#8b7770', fontSize: '0.9rem' }}>{devocional.title}</p>
            </>
          ) : (
            <p style={{ color: '#8b7770', margin: 0 }}>Nenhum devocional publicado ainda. Volte mais tarde.</p>
          )}
          <span style={{ fontSize: '0.85rem', color: 'var(--rosa-dark)', fontWeight: 600 }}>Ler devocional completo →</span>
        </div>
      </Link>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { href: '/filha/biblioteca', icon: '📚', label: 'Biblioteca', sub: 'PDFs, áudios e mais' },
          { href: '/filha/calendario', icon: '📅', label: 'Agenda', sub: 'Próximos eventos' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: '1.5rem 1rem', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#5a4a47', fontSize: '0.95rem' }}>{item.label}</div>
              <div style={{ color: '#8b7770', fontSize: '0.8rem', marginTop: '0.25rem' }}>{item.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Avisos */}
      {avisos.length > 0 && (
        <div>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: '#5a4a47' }}>📢 Avisos</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {avisos.map(a => (
              <div key={a.id} style={{ background: priorityBg(a.priority), border: `1.5px solid ${priorityBorder(a.priority)}`, borderRadius: 12, padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 700, color: priorityColor(a.priority), marginBottom: '0.35rem', fontSize: '0.95rem' }}>{a.title}</div>
                <div style={{ color: '#5a4a47', fontSize: '0.9rem', lineHeight: 1.5 }}>{a.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function priorityBg(p: string) { return p === 'alta' ? '#FFE8E8' : p === 'baixa' ? '#F0F4E8' : '#FFF8E8'; }
function priorityBorder(p: string) { return p === 'alta' ? '#f0b0b0' : p === 'baixa' ? '#b8d080' : '#e8d090'; }
function priorityColor(p: string) { return p === 'alta' ? '#C85A54' : p === 'baixa' ? '#5a8000' : '#b07030'; }

function Loader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <div style={{ textAlign: 'center', color: '#8b7770' }}>🌸 Carregando...</div>
    </div>
  );
}
