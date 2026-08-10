'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type Perfil = { nome?: string; papel?: 'membro' | 'lider'; igrejaId?: string | null };
type Filha = { id: string; nome: string; email: string; discipuladoraId?: string | null; igrejaId?: string | null };

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [filhas, setFilhas] = useState<Filha[]>([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, async (u) => {
    setUser(u);
    if (!u) { setPerfil(null); setFilhas([]); setCarregando(false); return; }
    const snap = await getDoc(doc(db, 'usuarias', u.uid));
    const p = snap.exists() ? snap.data() as Perfil : null;
    setPerfil(p);
    if (p?.papel !== 'lider') { setErro('Esta conta não possui permissão de Líder.'); setCarregando(false); return; }
    await carregarFilhas();
    setCarregando(false);
  }), []);

  async function carregarFilhas() {
    const snap = await getDocs(query(collection(db, 'usuarias'), where('papel', '==', 'membro')));
    setFilhas(snap.docs.map((d) => ({ id: d.id, nome: String(d.data().nome ?? 'Sem nome'), email: String(d.data().email ?? ''), discipuladoraId: d.data().discipuladoraId ?? null, igrejaId: d.data().igrejaId ?? null })));
  }

  async function entrar(e: React.FormEvent) {
    e.preventDefault(); setErro(''); setCarregando(true);
    try { await signInWithEmailAndPassword(auth, email.trim(), senha); }
    catch { setErro('Não foi possível entrar. Confira e-mail e senha.'); setCarregando(false); }
  }

  async function vincular(filha: Filha) {
    if (!user) return;
    setSalvando(filha.id); setErro('');
    try {
      await updateDoc(doc(db, 'usuarias', filha.id), {
        discipuladoraId: user.uid,
        ultimoVinculoEm: serverTimestamp(),
      });
      setFilhas((lista) => lista.map((f) => f.id === filha.id ? { ...f, discipuladoraId: user.uid } : f));
    } catch { setErro('Não foi possível salvar o vínculo. Verifique as regras do Firestore.'); }
    finally { setSalvando(null); }
  }

  const filtradas = useMemo(() => filhas.filter((f) => f.nome.toLowerCase().includes(busca.toLowerCase()) || f.email.toLowerCase().includes(busca.toLowerCase())), [filhas, busca]);

  if (carregando) return <div className="login"><div className="kicker">Mulheres Virtuosas</div><h1>Carregando…</h1></div>;

  if (!user) return <main className="page"><div className="login"><div className="kicker">Painel da Líder</div><h1>Bem-vinda</h1><p>Acesse o acompanhamento das discípulas vinculadas à sua liderança.</p><form className="form" onSubmit={entrar}><input className="input" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required /><input className="input" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} /><button className="btn">Entrar</button>{erro && <div className="error">{erro}</div>}</form></div></main>;

  if (perfil?.papel !== 'lider') return <main className="page"><div className="login"><h1>Acesso restrito</h1><p>{erro || 'Esta conta não é uma conta de Líder.'}</p><button className="btn secondary" onClick={() => signOut(auth)}>Sair</button></div></main>;

  return <main className="page"><header className="header"><div><div className="brand">Mulheres Virtuosas</div><small>Painel da Líder{perfil.nome ? ` · ${perfil.nome}` : ''}</small></div><button className="btn secondary" onClick={() => signOut(auth)}>Sair</button></header><section className="main"><div className="hero"><div className="kicker">Discipulado</div><h1>Suas discípulas</h1><p>Vincule cada filha à sua discipuladora. O vínculo aparece automaticamente no App FILHA.</p></div><div className="grid"><div className="card"><div className="kicker">Discípulas</div><div className="metric">{filhas.length}</div><div className="meta">contas de membro encontradas</div></div><div className="card"><div className="kicker">Vinculadas a você</div><div className="metric">{filhas.filter((f) => f.discipuladoraId === user.uid).length}</div><div className="meta">acompanhamentos ativos</div></div></div><div className="toolbar"><input className="input" placeholder="Buscar por nome ou e-mail" value={busca} onChange={(e) => setBusca(e.target.value)} /><button className="btn secondary" onClick={carregarFilhas}>Atualizar</button></div>{erro && <div className="notice">{erro}</div>}<div className="card"><h2>Lista de discípulas</h2><div className="list">{filtradas.length ? filtradas.map((filha) => <div className="row" key={filha.id}><div><div className="name">{filha.nome}</div><div className="meta">{filha.email || 'E-mail não informado'}</div></div><button className="btn" disabled={salvando === filha.id} onClick={() => vincular(filha)}>{salvando === filha.id ? 'Salvando…' : filha.discipuladoraId === user.uid ? 'Vinculada a você' : 'Vincular a mim'}</button></div>) : <div className="notice">Nenhuma discípula encontrada.</div>}</div></div></section></main>;
}
