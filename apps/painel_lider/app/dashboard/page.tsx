'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import Link from 'next/link';

type Perfil = { nome?: string; papel?: 'membro' | 'lider' | 'admin'; igrejaId?: string | null };

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setCarregando(false); return; }
      const snap = await getDoc(doc(db, 'usuarias', u.uid));
      const p = snap.exists() ? snap.data() as Perfil : null;
      setPerfil(p);
      setCarregando(false);
    });
  }, []);

  if (carregando) return <div className="login"><h1>Carregando…</h1></div>;
  if (!user) return <div className="login"><h1>Faça login</h1></div>;

  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Mulheres Virtuosas</div>
          <small>Dashboard{perfil?.nome ? ` · ${perfil.nome}` : ''}</small>
        </div>
        <button className="btn secondary" onClick={() => signOut(auth)}>Sair</button>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">Bem-vinda</div>
          <h1>Olá, {perfil?.nome || 'Filha'}! 🌷</h1>
          <p>Acesse as ferramentas conforme seu perfil de acesso.</p>
        </div>

        {/* Cards de acesso rápido */}
        <div className="grid">
          {perfil?.papel === 'lider' && (
            <Link href="/page" className="card">
              <div className="kicker">Liderança</div>
              <h2>👩‍💼 Suas Discípulas</h2>
              <p>Vincule e acompanhe suas discípulas.</p>
            </Link>
          )}

          {perfil?.papel === 'admin' && (
            <>
              <Link href="/admin" className="card">
                <div className="kicker">Administração</div>
                <h2>⚙️ Painel Admin</h2>
                <p>Gerenciar PDFs, calendário, devocionais e avisos.</p>
              </Link>

              <Link href="/page" className="card">
                <div className="kicker">Liderança</div>
                <h2>👩‍💼 Gerenciar Líderes</h2>
                <p>Vincular e gerenciar líderes do ministério.</p>
              </Link>
            </>
          )}

          <Link href="/" className="card">
            <div className="kicker">App</div>
            <h2>📱 App FILHA</h2>
            <p>Voltar para o app mobile das filhas.</p>
          </Link>
        </div>

        {/* Info cards */}
        <div className="grid">
          <div className="card">
            <div className="kicker">Seu Perfil</div>
            <div className="metric">{perfil?.papel?.toUpperCase()}</div>
            <div className="meta">Seu papel no ministério</div>
          </div>

          <div className="card">
            <div className="kicker">Status</div>
            <div className="metric">✅</div>
            <div className="meta">Conectado e operacional</div>
          </div>
        </div>

        {/* Quick links */}
        <div className="card">
          <h2>Links Rápidos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <Link href="/page">
              <button className="btn secondary" style={{ width: '100%' }}>
                Página Principal
              </button>
            </Link>
            <Link href="/">
              <button className="btn secondary" style={{ width: '100%' }}>
                Voltar ao App
              </button>
            </Link>
            {perfil?.papel === 'admin' && (
              <Link href="/admin">
                <button className="btn secondary" style={{ width: '100%' }}>
                  Painel Admin
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
