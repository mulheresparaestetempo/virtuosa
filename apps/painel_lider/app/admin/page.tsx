export default function AdminPage() {
  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Painel Admin</div>
          <small>Gerenciar conteúdo FILHA</small>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">Administração</div>
          <h1>Painel de Conteúdo</h1>
          <p>Gerencie PDFs, calendário, devocionais e avisos do app FILHA.</p>
        </div>

        <div className="grid">
          <a href="/admin/pdf-manager">
            <div className="card">
              <div className="kicker">📄 PDFs</div>
              <h2>Biblioteca de Recursos</h2>
              <p>Upload de guias, apostilas e documentos em PDF para o app.</p>
              <button className="btn" style={{ marginTop: '1rem' }}>
                Gerenciar PDFs
              </button>
            </div>
          </a>

          <a href="/admin/calendar">
            <div className="card">
              <div className="kicker">📅 Calendário</div>
              <h2>Eventos e Datas</h2>
              <p>Publique retiros, cultos, encontros e eventos do ministério.</p>
              <button className="btn" style={{ marginTop: '1rem' }}>
                Gerenciar Eventos
              </button>
            </div>
          </a>

          <a href="/admin/devocional">
            <div className="card">
              <div className="kicker">✦ Devocional</div>
              <h2>Meditações Diárias</h2>
              <p>Escreva e publique devocionais para as filhas todos os dias.</p>
              <button className="btn" style={{ marginTop: '1rem' }}>
                Publicar Devocional
              </button>
            </div>
          </a>

          <a href="/admin/avisos">
            <div className="card">
              <div className="kicker">📢 Avisos</div>
              <h2>Notificações</h2>
              <p>Envie comunicados importantes para todas as usuárias do app.</p>
              <button className="btn" style={{ marginTop: '1rem' }}>
                Enviar Aviso
              </button>
            </div>
          </a>
        </div>

        <div className="card">
          <h2>📊 Como Usar o Painel Admin</h2>
          <div className="notice">
            <p><strong>Guia Completo:</strong> Veja o arquivo <code>PAINEL-ADMIN-GUIA.md</code> no repositório para instruções detalhadas.</p>
          </div>

          <h3 style={{ marginTop: '2rem', color: '#2E2E2E' }}>4 Funções Principais:</h3>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>1. PDFs</strong> - Upload de arquivos PDF que aparecem na aba Biblioteca do app</p>
            <p><strong>2. Calendário</strong> - Criar eventos com data/hora que sincronizam com o app</p>
            <p><strong>3. Devocional</strong> - Escrever meditações diárias com versículos e reflexões</p>
            <p><strong>4. Avisos</strong> - Enviar notificações importantes para todas as usuárias</p>
          </div>

          <h3 style={{ marginTop: '2rem', color: '#2E2E2E' }}>Status Atual:</h3>
          <div style={{ marginTop: '1rem' }}>
            <p>✅ Painel admin em desenvolvimento</p>
            <p>✅ Integração com Firebase Storage (PDFs)</p>
            <p>✅ Integração com Firestore (Calendário, Devocional, Avisos)</p>
            <p>📖 Veja <code>PAINEL-ADMIN-GUIA.md</code> para documentação completa</p>
          </div>
        </div>

        <div className="card">
          <h2>🔗 Links Rápidos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <a href="/page">
              <button className="btn secondary" style={{ width: '100%' }}>
                Painel de Líder
              </button>
            </a>
            <a href="/dashboard">
              <button className="btn secondary" style={{ width: '100%' }}>
                Dashboard
              </button>
            </a>
            <a href="/">
              <button className="btn secondary" style={{ width: '100%' }}>
                Voltar ao App
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
