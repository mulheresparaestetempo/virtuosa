'use client';

import { useState } from 'react';

interface Recurso {
  id: string;
  tipo: 'pdf' | 'audio' | 'podcast' | 'livro';
  titulo: string;
  descricao: string;
  url?: string;
  data: string;
}

interface Aviso {
  id: string;
  titulo: string;
  mensagem: string;
  prioridade: 'baixa' | 'media' | 'alta';
  data: string;
}

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<'recursos' | 'avisos' | 'dashboard'>('dashboard');

  // Recursos
  const [recursos, setRecursos] = useState<Recurso[]>([
    { id: '1', tipo: 'pdf', titulo: 'Guia de Oração', descricao: 'Guia completo para oração eficaz', data: '2024-08-20' },
    { id: '2', tipo: 'audio', titulo: 'Louvor Abba', descricao: 'Áudio de adoração', url: '#', data: '2024-08-19' },
    { id: '3', tipo: 'podcast', titulo: 'Fé em Ação', descricao: 'Podcast semanal com reflexões', url: '#', data: '2024-08-18' },
  ]);

  const [novoRecurso, setNovoRecurso] = useState<Partial<Recurso>>({
    tipo: 'pdf',
    titulo: '',
    descricao: '',
    url: '',
  });

  // Avisos
  const [avisos, setAvisos] = useState<Aviso[]>([
    { id: '1', titulo: 'Nova Meditação', mensagem: 'Meditação de hoje publicada!', prioridade: 'alta', data: '2024-08-20' },
  ]);

  const [novoAviso, setNovoAviso] = useState({ titulo: '', mensagem: '', prioridade: 'media' as 'baixa' | 'media' | 'alta' });

  // Adicionar recurso
  const adicionarRecurso = () => {
    if (novoRecurso.titulo && novoRecurso.tipo) {
      const recurso: Recurso = {
        id: Date.now().toString(),
        tipo: novoRecurso.tipo as Recurso['tipo'],
        titulo: novoRecurso.titulo,
        descricao: novoRecurso.descricao || '',
        url: novoRecurso.url,
        data: new Date().toISOString().split('T')[0],
      };
      setRecursos([recurso, ...recursos]);
      setNovoRecurso({ tipo: 'pdf', titulo: '', descricao: '', url: '' });
      alert('✅ Recurso adicionado com sucesso!');
    }
  };

  const removerRecurso = (id: string) => {
    setRecursos(recursos.filter(r => r.id !== id));
    alert('✅ Recurso removido!');
  };

  // Avisos
  const adicionarAviso = () => {
    if (novoAviso.titulo && novoAviso.mensagem) {
      const aviso: Aviso = {
        id: Date.now().toString(),
        titulo: novoAviso.titulo,
        mensagem: novoAviso.mensagem,
        prioridade: novoAviso.prioridade,
        data: new Date().toISOString().split('T')[0],
      };
      setAvisos([aviso, ...avisos]);
      setNovoAviso({ titulo: '', mensagem: '', prioridade: 'media' });
      alert('✅ Aviso enviado para todas as usuárias!');
    }
  };

  const removerAviso = (id: string) => {
    setAvisos(avisos.filter(a => a.id !== id));
  };

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, string> = {
      pdf: '📄',
      audio: '🎵',
      podcast: '🎙️',
      livro: '📖',
    };
    return icons[tipo] || '📎';
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      baixa: { bg: '#F0F4E8', text: '#7A9C3B' },
      media: { bg: '#FFF8E8', text: '#D4A574' },
      alta: { bg: '#FFE8E8', text: '#C85A54' },
    };
    return colors[prioridade] || colors.media;
  };

  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Painel Admin Virtuosa</div>
          <small>Gerenciar conteúdo e comunicações</small>
        </div>
        <div style={{ textAlign: 'right' }}>
          <small>👤 Administradora</small>
        </div>
      </header>

      <section className="main">
        {/* Abas */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #E8E8E8', paddingBottom: '1rem' }}>
          <button
            onClick={() => setTab('dashboard')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: tab === 'dashboard' ? '#D89BB7' : 'transparent',
              color: tab === 'dashboard' ? 'white' : '#999',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s',
            }}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setTab('recursos')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: tab === 'recursos' ? '#D89BB7' : 'transparent',
              color: tab === 'recursos' ? 'white' : '#999',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s',
            }}
          >
            📚 Recursos
          </button>
          <button
            onClick={() => setTab('avisos')}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: tab === 'avisos' ? '#D89BB7' : 'transparent',
              color: tab === 'avisos' ? 'white' : '#999',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s',
            }}
          >
            📢 Avisos
          </button>
        </div>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <>
            <div className="hero">
              <div className="kicker">Bem-vinda</div>
              <h1>Dashboard</h1>
              <p>Visualize e gerencie todo o conteúdo da plataforma Virtuosa.</p>
            </div>

            <div className="grid">
              <div className="card">
                <div className="kicker">Total</div>
                <div className="metric">{recursos.length}</div>
                <div className="meta">Recursos publicados</div>
              </div>
              <div className="card">
                <div className="kicker">Avisos</div>
                <div className="metric">{avisos.length}</div>
                <div className="meta">Comunicados enviados</div>
              </div>
              <div className="card">
                <div className="kicker">Status</div>
                <div className="metric">✅</div>
                <div className="meta">Sistema operacional</div>
              </div>
            </div>

            <div className="card">
              <h2>Últimos Recursos Adicionados</h2>
              {recursos.slice(0, 5).map(r => (
                <div key={r.id} style={{ padding: '1rem', borderBottom: '1px solid #E8E8E8' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                    {getTipoIcon(r.tipo)} {r.titulo}
                  </p>
                  <small style={{ color: '#999' }}>{r.data}</small>
                </div>
              ))}
            </div>
          </>
        )}

        {/* RECURSOS */}
        {tab === 'recursos' && (
          <>
            <div className="hero">
              <div className="kicker">Adicione Conteúdo</div>
              <h1>Gerenciar Recursos</h1>
              <p>PDFs, Áudios, Podcasts, Livros e Indicações</p>
            </div>

            {/* Formulário */}
            <div className="card">
              <h2>➕ Novo Recurso</h2>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Tipo de Recurso
                  </label>
                  <select
                    value={novoRecurso.tipo}
                    onChange={(e) => setNovoRecurso({ ...novoRecurso, tipo: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #E8E8E8',
                      borderRadius: '20px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="pdf">📄 PDF</option>
                    <option value="audio">🎵 Áudio</option>
                    <option value="podcast">🎙️ Podcast</option>
                    <option value="livro">📖 Livro</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Título
                  </label>
                  <input
                    type="text"
                    value={novoRecurso.titulo}
                    onChange={(e) => setNovoRecurso({ ...novoRecurso, titulo: e.target.value })}
                    placeholder="Ex: Guia de Oração"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #E8E8E8',
                      borderRadius: '20px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Descrição
                  </label>
                  <textarea
                    value={novoRecurso.descricao}
                    onChange={(e) => setNovoRecurso({ ...novoRecurso, descricao: e.target.value })}
                    placeholder="Descreva o conteúdo..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #E8E8E8',
                      borderRadius: '20px',
                      boxSizing: 'border-box',
                      minHeight: '80px',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Link (opcional)
                  </label>
                  <input
                    type="url"
                    value={novoRecurso.url}
                    onChange={(e) => setNovoRecurso({ ...novoRecurso, url: e.target.value })}
                    placeholder="https://..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #E8E8E8',
                      borderRadius: '20px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button onClick={adicionarRecurso} className="btn" style={{ width: '100%' }}>
                  Adicionar Recurso
                </button>
              </div>
            </div>

            {/* Lista de Recursos */}
            <div className="card">
              <h2>📚 Recursos Publicados ({recursos.length})</h2>
              {recursos.length === 0 ? (
                <p style={{ color: '#999', marginTop: '1rem' }}>Nenhum recurso adicionado ainda.</p>
              ) : (
                <div style={{ marginTop: '1rem' }}>
                  {recursos.map(r => (
                    <div
                      key={r.id}
                      style={{
                        padding: '1.5rem',
                        backgroundColor: '#FAF2F1',
                        borderRadius: '20px',
                        marginBottom: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>
                          {getTipoIcon(r.tipo)} {r.titulo}
                        </p>
                        <p style={{ color: '#666', margin: '0 0 0.5rem 0' }}>{r.descricao}</p>
                        <small style={{ color: '#999' }}>{r.data}</small>
                        {r.url && (
                          <div style={{ marginTop: '0.5rem' }}>
                            <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: '#D89BB7', textDecoration: 'none' }}>
                              🔗 Acessar
                            </a>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removerRecurso(r.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#E8D7D1',
                          border: 'none',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          marginLeft: '1rem',
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* AVISOS */}
        {tab === 'avisos' && (
          <>
            <div className="hero">
              <div className="kicker">Comunicação</div>
              <h1>Enviar Avisos</h1>
              <p>Notifique todas as usuárias sobre novidades importantes</p>
            </div>

            <div className="card">
              <h2>📢 Novo Aviso</h2>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Título
                  </label>
                  <input
                    type="text"
                    value={novoAviso.titulo}
                    onChange={(e) => setNovoAviso({ ...novoAviso, titulo: e.target.value })}
                    placeholder="Ex: Nova Meditação Publicada"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #E8E8E8',
                      borderRadius: '20px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Mensagem
                  </label>
                  <textarea
                    value={novoAviso.mensagem}
                    onChange={(e) => setNovoAviso({ ...novoAviso, mensagem: e.target.value })}
                    placeholder="Escreva o aviso..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #E8E8E8',
                      borderRadius: '20px',
                      boxSizing: 'border-box',
                      minHeight: '100px',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Prioridade
                  </label>
                  <select
                    value={novoAviso.prioridade}
                    onChange={(e) => setNovoAviso({ ...novoAviso, prioridade: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #E8E8E8',
                      borderRadius: '20px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="baixa">📌 Baixa</option>
                    <option value="media">⚠️ Média</option>
                    <option value="alta">🔴 Alta</option>
                  </select>
                </div>

                <button onClick={adicionarAviso} className="btn" style={{ width: '100%' }}>
                  Enviar Aviso
                </button>
              </div>
            </div>

            <div className="card">
              <h2>📋 Avisos Enviados ({avisos.length})</h2>
              {avisos.length === 0 ? (
                <p style={{ color: '#999', marginTop: '1rem' }}>Nenhum aviso enviado ainda.</p>
              ) : (
                <div style={{ marginTop: '1rem' }}>
                  {avisos.map(a => {
                    const color = getPrioridadeColor(a.prioridade);
                    return (
                      <div
                        key={a.id}
                        style={{
                          padding: '1rem',
                          backgroundColor: color.bg,
                          borderRadius: '20px',
                          marginBottom: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', color: color.text, margin: '0 0 0.5rem 0' }}>
                            {a.titulo}
                          </p>
                          <p style={{ color: '#666', margin: '0 0 0.5rem 0' }}>{a.mensagem}</p>
                          <small style={{ color: '#999' }}>{a.data}</small>
                        </div>
                        <button
                          onClick={() => removerAviso(a.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            border: `2px solid ${color.text}`,
                            borderRadius: '16px',
                            cursor: 'pointer',
                            color: color.text,
                            marginLeft: '1rem',
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
