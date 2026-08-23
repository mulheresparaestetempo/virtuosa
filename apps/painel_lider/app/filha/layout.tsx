'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';

const NAV = [
  { href: '/filha', label: 'Início', icon: '🏠' },
  { href: '/filha/devocional', label: 'Devocional', icon: '🌿' },
  { href: '/filha/biblioteca', label: 'Biblioteca', icon: '📚' },
  { href: '/filha/calendario', label: 'Agenda', icon: '📅' },
  { href: '/filha/perfil', label: 'Perfil', icon: '👤' },
];

export default function FilhaLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user && pathname !== '/filha/login') {
      router.replace('/filha/login');
    } else {
      setReady(true);
    }
  }, [user, loading, pathname, router]);

  if (pathname === '/filha/login') return <>{children}</>;
  if (!ready || !user) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌸</div>
        <p style={{ color: '#8b7770' }}>Carregando...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'rgba(245,241,237,0.97)',
        borderBottom: '2px dashed rgba(216,155,183,0.3)',
        padding: '0.9rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
      }}>
        <Link href="/filha" style={{ textDecoration: 'none' }}>
          <span className="brand" style={{ fontSize: '1.5rem' }}>FILHA</span>
        </Link>
        <nav style={{ display: 'flex', gap: '0.25rem' }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '20px',
                background: pathname === n.href ? 'var(--rosa-pastel)' : 'transparent',
                color: pathname === n.href ? 'var(--rosa-dark)' : '#8b7770',
                fontWeight: pathname === n.href ? 700 : 400,
                fontSize: '0.82rem',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.1rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>{n.icon}</span>
                <span style={{ display: 'none' }} className="nav-label">{n.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </header>

      <main style={{ flex: 1, maxWidth: 680, width: '100%', margin: '0 auto', padding: '1.5rem 1rem 5rem' }}>
        {children}
      </main>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(245,241,237,0.97)',
        borderTop: '2px dashed rgba(216,155,183,0.3)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '0.5rem 0 0.75rem',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
      }}>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} style={{ textDecoration: 'none', flex: 1 }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.15rem',
              padding: '0.3rem',
              color: pathname === n.href ? 'var(--rosa-dark)' : '#8b7770',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{n.icon}</span>
              <span style={{ fontSize: '0.68rem', fontWeight: pathname === n.href ? 700 : 400 }}>{n.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
