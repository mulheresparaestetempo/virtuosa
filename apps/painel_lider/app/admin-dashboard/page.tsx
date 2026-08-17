'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { isAdminEmail } from '@/lib/config';

interface Stats {
  devotionals: number;
  events: number;
  avisos: number;
  pdfs: number;
  resources: number;
}

const MODULES = [
  { icon: '✦', label: 'Devocionais', href: '/admin/devocional', desc: 'Publicar meditações diárias' },
  { icon: '📢', label: 'Avisos', href: '/admin/avisos', desc: 'Comunicados para as filhas' },
  { icon: '📅', label: 'Calendário', href: '/admin/calendar', desc: 'Eventos e retiros' },
  { icon: '📄', label: 'PDFs', href: '/admin/pdf-manager', desc: 'Biblioteca de documentos' },
  { icon: '🎵', label: 'Áudios', href: '/admin/recursos/audios', desc: 'Louvores e meditações' },
  { icon: '🎙️', label: 'Podcasts', href: '/admin/recursos/podcasts', desc: 'Séries e episódios' },
  { icon: '📖', label: 'Livros', href: '/admin/recursos/livros', desc: 'Indicações de leitura' },
  { icon: '🔗', label: 'Indicações', href: '/admin/recursos/indicacoes', desc: 'Sites e cursos úteis' },
];

export default function AdminDashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsError, setStatsError] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || loading) return;
    if (!user) { router.push('/login'); return; }
    if (!isAdminEmail(user.email)) { router.push('/acesso-negado'); }
  }, [user, loading, mounted, router]);

  useEffect(() => {
    if (!user) return;
    const loadStats = async () => {
      try {
        const [devs, evts, avss, pdfs, ress] = await Promise.all([
          getDocs(collection(db, 'devotionals')),
          getDocs(collection(db, 'events')),
          getDocs(collection(db, 'avisos')),
          getDocs(collection(db, 'pdfs')),
          getDocs(collection(db, 'resources')),
        ]);
        setStats({ devotionals: devs.size, events: evts.size, avisos: avss.size, pdfs: pdfs.size, resources: ress.size });
      } catch {
        setStatsError(true);
      }
    };
    loadStats();
  }, [user]);

  if (!mounted || loading) {
    return (
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#999' }}>Carregando...</p>
      </main>
    );
  }

  if (!user || !isAdminEmail(user.email)) return null;

  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Mulheres Virtuosas</div>
          <small>Painel Administrativo</small>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <small style={{ color: '#8b7770' }}>👤 {user.email}</small>
          <button
            onClick={logout}
            style={{ padding: '0.4rem 1rem', backgroundColor: '#E8D7D1', border: 'none', borderRadius: 16, cursor: 'pointer', color: '#8B4513', fontWeight: 600, fontSize: '0.85rem' }}
          >
            Sair
          </button>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">🎛️ Admin</div>
          <h1>Painel Administrativo</h1>
          <p>Bem-vinda! Gerencie todo o conteúdo do app FILHA a partir daqui.</p>
        </div>

        {/* Estatísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Devocionais', value: stats?.devotionals, icon: '✦' },
            { label: 'Avisos', value: stats?.avisos, icon: '📢' },
            { label: 'Eventos', value: stats?.events, icon: '📅' },
            { label: 'PDFs', value: stats?.pdfs, icon: '📄' },
            { label: 'Recursos', value: stats?.resources, icon: '🎵' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#D89BB7', margin: '0.25rem 0' }}>
                {statsError ? '—' : value ?? '...'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#8b7770' }}>{label}</div>
            </div>
          ))}
        </div>

        {statsError && (
          <div style={{ backgroundColor: '#FFF8E8', border: '1px solid #D4A574', padding: '1rem', borderRadius: 16, marginBottom: '1.5rem', fontSize: '0.9rem', color: '#8B4513' }}>
            ⚠️ Não foi possível carregar as estatísticas. As regras do Firestore precisam ser atualizadas para permitir leitura das coleções admin. Consulte a seção de implantação no README.
          </div>
        )}

        {/* Módulos */}
        <h2 style={{ color: '#5a4a47', marginBottom: '1rem' }}>Módulos de Conteúdo</h2>
        <div className="grid">
          {MODULES.map(({ icon, label, href, desc }) => (
            <a href={href} key={href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.15s', height: '100%' }}>
                <div className="kicker" style={{ fontSize: '1.5rem' }}>{icon}</div>
                <h2 style={{ marginTop: '0.5rem' }}>{label}</h2>
                <p style={{ color: '#8b7770', fontSize: '0.9rem' }}>{desc}</p>
                <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>Acessar</button>
              </div>
            </a>
          ))}
        </div>

        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h2>ℹ️ Informações</h2>
          <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
            <p>✅ Login com Firebase Authentication</p>
            <p>🗄️ Dados persistentes no Firestore</p>
            <p>☁️ Arquivos no Firebase Storage</p>
            <p>📱 Conteúdo sincronizado com o app FILHA</p>
          </div>
        </div>
      </section>
    </main>
  );
}
