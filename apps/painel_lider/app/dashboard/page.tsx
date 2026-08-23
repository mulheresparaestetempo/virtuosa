export default function DashboardPage() {
  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Mulheres Virtuosas</div>
          <small>Dashboard de Acesso</small>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">Bem-vinda</div>
          <h1>Olá! 🌷</h1>
          <p>Acesse as ferramentas conforme seu perfil de acesso.</p>
        </div>

        <div className="grid">
          <div className="card">
            <div className="kicker">📱 App</div>
            <h2>App FILHA</h2>
            <p>Acesse o aplicativo móvel com devocional, comunidade e mais.</p>
            <a href="/">
              <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                Abrir App
              </button>
            </a>
          </div>

          <div className="card">
            <div className="kicker">⚙️ Administração</div>
            <h2>Painel Admin</h2>
            <p>Gerencie PDFs, calendário, devocionais e avisos.</p>
            <a href="/admin">
              <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                Acessar Admin
              </button>
            </a>
          </div>

          <div className="card">
            <div className="kicker">👩‍💼 Liderança</div>
            <h2>Painel de Líder</h2>
            <p>Vincule e acompanhe suas discípulas.</p>
            <a href="/admin">
              <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                Acessar
              </button>
            </a>
          </div>

          <div className="card">
            <div className="kicker">📖 Documentação</div>
            <h2>Guias</h2>
            <p>Veja os guias completos de uso no repositório.</p>
            <a href="https://github.com/mulheresparaestetempo/virtuosa" target="_blank" rel="noopener noreferrer">
              <button className="btn secondary" style={{ marginTop: '1rem', width: '100%' }}>
                GitHub Repo
              </button>
            </a>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <div className="kicker">Status</div>
            <div className="metric">✅</div>
            <div className="meta">Sistema operacional</div>
          </div>

          <div className="card">
            <div className="kicker">Versão</div>
            <div className="metric">1.0</div>
            <div className="meta">App FILHA pronto para produção</div>
          </div>
        </div>

        <div className="card">
          <h2>📚 Documentação Disponível</h2>
          <div style={{ marginTop: '1rem' }}>
            <p>
              <strong>GUIA-FILHA-APP.md</strong><br/>
              Como rodar o app, fazer build, e validação completa.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>PAINEL-ADMIN-GUIA.md</strong><br/>
              Como gerenciar PDFs, calendário, devocionais e avisos.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <strong>Design System</strong><br/>
              Especificação completa de cores, tipografia e componentes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
