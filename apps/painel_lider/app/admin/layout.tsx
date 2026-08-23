'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAdminEmail } from '@/lib/config';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isAdminEmail(user.email)) {
      router.push('/acesso-negado');
    }
  }, [user, loading, mounted, router]);

  if (!mounted || loading) {
    return (
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#999' }}>Carregando...</p>
      </main>
    );
  }

  if (!user || !isAdminEmail(user.email)) return null;

  return (
    <>
      <header style={{
        backgroundColor: 'rgba(245,241,237,0.97)',
        padding: '1rem 2rem',
        borderBottom: '2px dashed rgba(216,155,183,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/admin" style={{ textDecoration: 'none', color: '#D89BB7', fontWeight: 700, fontSize: '1.1rem' }}>
            ← Painel
          </a>
          <span style={{ color: '#E8E8E8' }}>|</span>
          <p style={{ margin: 0, color: '#8b7770', fontSize: '0.9rem' }}>👤 {user.email}</p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '0.4rem 1rem',
            backgroundColor: '#E8D7D1',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            color: '#8B4513',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
        >
          Sair
        </button>
      </header>
      {children}
    </>
  );
}
