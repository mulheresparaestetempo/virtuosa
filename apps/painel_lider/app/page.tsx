import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Mulheres Virtuosas</div>
          <small>Plataforma de Administração</small>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">Bem-vinda</div>
          <h1>Olá! 🌷</h1>
          <p>Sistema de Administração - Gerenciar Conteúdo e Comunicações</p>
        </div>

        <div className="grid">
          <Link href="/admin-dashboard">
            <div className="card">
              <div className="kicker">🎛️ Painel Principal</div>
              <h2>Admin Dashboard</h2>
              <p>Gerencie: Recursos, Avisos, PDFs, Áudios, Podcasts, Livros</p>
              <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                ➜ Acessar Painel
              </button>
            </div>
          </Link>

          <Link href="/admin">
            <div className="card">
              <div className="kicker">⚙️ Módulos Avançados</div>
              <h2>Admin Completo</h2>
              <p>PDFs, Calendário, Devocionais, Avisos com Firebase</p>
              <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                Acessar
              </button>
            </div>
          </Link>

          <Link href="/dashboard">
            <div className="card">
              <div className="kicker">📊 Dashboard</div>
              <h2>Estatísticas</h2>
              <p>Visualize dados e estatísticas do sistema.</p>
              <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                Ver Stats
              </button>
            </div>
          </Link>

          <a href="https://github.com/mulheresparaestetempo/virtuosa" target="_blank" rel="noopener noreferrer">
            <div className="card">
              <div className="kicker">📖 GitHub</div>
              <h2>Repositório</h2>
              <p>Veja o código completo do projeto.</p>
              <button className="btn secondary" style={{ marginTop: '1rem', width: '100%' }}>
                Acessar Repo
              </button>
            </div>
          </a>
        </div>

        <div className="card">
          <h2>📚 Como Usar o Painel</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <p>
              <strong>✨ Painel Admin Dashboard</strong><br/>
              Acesse o painel principal para adicionar e gerenciar todos os recursos da plataforma em um único lugar.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>📦 Recursos Suportados</strong><br/>
              📄 PDFs • 🎵 Áudios • 🎙️ Podcasts • 📖 Livros • 💬 Indicações
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>📢 Comunicações</strong><br/>
              Envie avisos prioritários para todas as usuárias com marcação de importância.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>🔧 Gerenciamento Completo</strong><br/>
              Remova recursos, edite avisos e mantenha a plataforma sempre atualizada.
            </p>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <div className="kicker">Status</div>
            <div className="metric">✅</div>
            <div className="meta">Sistema 100% funcional</div>
          </div>

          <div className="card">
            <div className="kicker">Versão</div>
            <div className="metric">2.0</div>
            <div className="meta">Pronto para produção</div>
          </div>
        </div>
      </section>
    </main>
  );
}
