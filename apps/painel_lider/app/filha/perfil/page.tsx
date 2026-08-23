'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';

export default function FilhaPerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const name = user?.displayName || user?.email?.split('@')[0] || 'Filha';
  const email = user?.email || '';
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    router.replace('/filha/login');
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'Caveat, cursive', color: 'var(--rosa)', fontSize: '2rem', margin: '0 0 1.5rem' }}>
        Minha Caminhada
      </h1>

      {/* Profile card */}
      <div style={{ background: 'linear-gradient(135deg,rgba(232,196,216,0.4),rgba(245,241,237,0.95))', border: '2px solid var(--rosa-pastel)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--rosa-pastel)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 700, color: 'var(--rosa-dark)', flex: '0 0 auto' }}>
          {initial}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#5a4a47' }}>{name}</div>
          {email && <div style={{ color: '#8b7770', fontSize: '0.9rem', marginTop: '0.2rem' }}>{email}</div>}
          <div style={{ color: '#8b7770', fontSize: '0.85rem', marginTop: '0.2rem' }}>Filha · Ministério Virtuosa</div>
        </div>
      </div>

      {/* Info items */}
      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <InfoItem icon="🌿" title="Devocional diário" sub="Seu lugar secreto com Abba" />
        <InfoItem icon="📚" title="Biblioteca" sub="PDFs, áudios, podcasts e livros" />
        <InfoItem icon="📅" title="Agenda" sub="Próximos eventos do ministério" />
      </div>

      {/* Logout */}
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          style={{ width: '100%', padding: '1rem', borderRadius: 20, border: '2px solid #f0b0b0', background: '#FFF5F5', color: '#C85A54', fontWeight: 700, cursor: 'pointer', font: 'inherit', fontSize: '0.95rem' }}
        >
          Sair da conta
        </button>
      ) : (
        <div style={{ background: '#FFF5F5', border: '2px solid #f0b0b0', borderRadius: 16, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ margin: '0 0 1rem', color: '#5a4a47' }}>Tem certeza que deseja sair?</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setConfirming(false)}
              style={{ flex: 1, padding: '0.75rem', borderRadius: 20, border: '2px solid var(--rosa-pastel)', background: 'white', color: '#8b7770', cursor: 'pointer', font: 'inherit', fontWeight: 600 }}
            >
              Cancelar
            </button>
            <button
              onClick={handleLogout}
              disabled={loading}
              style={{ flex: 1, padding: '0.75rem', borderRadius: 20, border: '2px solid #f0b0b0', background: '#C85A54', color: 'white', cursor: 'pointer', font: 'inherit', fontWeight: 700 }}
            >
              {loading ? 'Saindo...' : 'Sair'}
            </button>
          </div>
        </div>
      )}

      <p style={{ textAlign: 'center', color: '#ccc', fontSize: '0.78rem', marginTop: '2rem' }}>
        FILHA · Mulheres para este Tempo
      </p>
    </div>
  );
}

function InfoItem({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div style={{ background: 'white', border: '1.5px solid var(--rosa-pastel)', borderRadius: 14, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 700, color: '#5a4a47', fontSize: '0.95rem' }}>{title}</div>
        <div style={{ color: '#8b7770', fontSize: '0.82rem', marginTop: '0.1rem' }}>{sub}</div>
      </div>
    </div>
  );
}
