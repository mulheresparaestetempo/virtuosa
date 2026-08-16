'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { storage, auth, db } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

type Perfil = { nome?: string; papel?: 'membro' | 'lider' | 'admin'; igrejaId?: string | null };

type Recurso = {
  id: string;
  tipo: 'pdf' | 'calendario' | 'devocional' | 'aviso';
  titulo: string;
  descricao: string;
  url?: string;
  data?: string;
  conteudo?: string;
  criadoEm: any;
  atualizadoEm: any;
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [aba, setAba] = useState<'pdfs' | 'calendario' | 'devocional' | 'avisos'>('pdfs');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  // Form states
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [data, setData] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setPerfil(null); setCarregando(false); return; }
      const snap = await getDoc(doc(db, 'usuarias', u.uid));
      const p = snap.exists() ? snap.data() as Perfil : null;
      setPerfil(p);
      if (p?.papel !== 'admin') { setErro('Acesso restrito. Apenas admins.'); setCarregando(false); return; }
      await carregarRecursos();
      setCarregando(false);
    });
  }, []);

  async function carregarRecursos() {
    const snap = await getDocs(collection(db, 'recursos'));
    setRecursos(snap.docs.map(d => ({ id: d.id, ...d.data() } as Recurso)));
  }

  async function salvarRecurso(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo || !descricao) { setErro('Preencha título e descrição'); return; }

    setSalvando(true);
    setErro('');
    try {
      let url = '';
      if (arquivo) {
        const storageRef = ref(storage, `recursos/${aba}/${Date.now()}_${arquivo.name}`);
        await uploadBytes(storageRef, arquivo);
        url = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'recursos'), {
        tipo: aba === 'calendario' ? 'calendario' : aba === 'devocional' ? 'devocional' : aba === 'avisos' ? 'aviso' : 'pdf',
        titulo,
        descricao,
        conteudo: conteudo || '',
        url: url || '',
        data: data || new Date().toISOString(),
        criadoEm: serverTimestamp(),
        atualizadoEm: serverTimestamp(),
      });

      setTitulo('');
      setDescricao('');
      setConteudo('');
      setArquivo(null);
      setData('');
      await carregarRecursos();
    } catch (e) {
      setErro('Erro ao salvar: ' + String(e));
    } finally {
      setSalvando(false);
    }
  }

  async function deletarRecurso(id: string) {
    if (!confirm('Tem certeza?')) return;
    try {
      await deleteDoc(doc(db, 'recursos', id));
      await carregarRecursos();
    } catch (e) {
      setErro('Erro ao deletar: ' + String(e));
    }
  }

  const recursosFiltrados = useMemo(
    () => recursos.filter(r =>
      r.tipo === (aba === 'calendario' ? 'calendario' : aba === 'devocional' ? 'devocional' : aba === 'avisos' ? 'aviso' : 'pdf')
    ),
    [recursos, aba]
  );

  if (carregando) return <div className="login"><h1>Carregando…</h1></div>;
  if (!user) return <div className="login"><h1>Faça login</h1></div>;
  if (perfil?.papel !== 'admin') return <div className="login"><h1>Acesso Restrito</h1><p>Apenas administradores podem acessar.</p></div>;

  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Painel Admin</div>
          <small>Gerenciar conteúdo FILHA{perfil?.nome ? ` · ${perfil.nome}` : ''}</small>
        </div>
        <button className="btn secondary" onClick={() => signOut(auth)}>Sair</button>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">Administração</div>
          <h1>Gerenciar Conteúdo</h1>
          <p>Upload de PDFs, calendários, devocionais e avisos.</p>
        </div>

        {/* Abas de navegação */}
        <div className="toolbar">
          <button
            className={`btn ${aba === 'pdfs' ? '' : 'secondary'}`}
            onClick={() => setAba('pdfs')}
          >
            📄 PDFs
          </button>
          <button
            className={`btn ${aba === 'calendario' ? '' : 'secondary'}`}
            onClick={() => setAba('calendario')}
          >
            📅 Calendário
          </button>
          <button
            className={`btn ${aba === 'devocional' ? '' : 'secondary'}`}
            onClick={() => setAba('devocional')}
          >
            ✦ Devocional
          </button>
          <button
            className={`btn ${aba === 'avisos' ? '' : 'secondary'}`}
            onClick={() => setAba('avisos')}
          >
            📢 Avisos
          </button>
        </div>

        {erro && <div className="notice">{erro}</div>}

        {/* Formulário */}
        <div className="card">
          <h2>Novo {
            aba === 'pdfs' ? 'PDF' :
            aba === 'calendario' ? 'Evento de Calendário' :
            aba === 'devocional' ? 'Devocional' :
            'Aviso'
          }</h2>

          <form className="form" onSubmit={salvarRecurso}>
            <input
              className="input"
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />

            <textarea
              className="input"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              style={{ minHeight: '80px' }}
            />

            {aba === 'devocional' && (
              <textarea
                className="input"
                placeholder="Conteúdo do devocional"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                style={{ minHeight: '120px' }}
              />
            )}

            {aba === 'calendario' && (
              <input
                className="input"
                type="datetime-local"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            )}

            {aba === 'pdfs' && (
              <input
                className="input"
                type="file"
                accept=".pdf"
                onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                required
              />
            )}

            <button className="btn" disabled={salvando}>
              {salvando ? 'Salvando…' : 'Salvar'}
            </button>
          </form>
        </div>

        {/* Lista de recursos */}
        <div className="card">
          <h2>
            {aba === 'pdfs' ? 'PDFs Publicados' :
             aba === 'calendario' ? 'Eventos' :
             aba === 'devocional' ? 'Devocionais' :
             'Avisos'}
            ({recursosFiltrados.length})
          </h2>

          <div className="list">
            {recursosFiltrados.length ? (
              recursosFiltrados.map((recurso) => (
                <div className="row" key={recurso.id}>
                  <div>
                    <div className="name">{recurso.titulo}</div>
                    <div className="meta">{recurso.descricao}</div>
                    {recurso.data && <div className="meta">📅 {new Date(recurso.data).toLocaleDateString('pt-BR')}</div>}
                  </div>
                  <button className="btn secondary" onClick={() => deletarRecurso(recurso.id)}>
                    🗑️
                  </button>
                </div>
              ))
            ) : (
              <div className="notice">Nenhum recurso publicado nesta categoria.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
