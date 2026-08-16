'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, mounted, router]);

  if (!mounted || loading) {
    return (
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p>Carregando...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <header style={{ backgroundColor: '#FAF2F1', padding: '1rem 2rem', borderBottom: '1px solid #E8E8E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ margin: 0, fontWeight: '600', color: '#2E2E2E' }}>👤 {user.email}</p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#E8D7D1',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            color: '#8B4513',
            fontWeight: '500',
          }}
        >
          Sair
        </button>
      </header>
      {children}
    </>
  );
}
