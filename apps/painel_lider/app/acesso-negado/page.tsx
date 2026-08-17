export default function AcessoNegadoPage() {
  return (
    <main className="page">
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="card" style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{ color: '#C85A54', marginBottom: '1rem' }}>Acesso Negado</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Sua conta não possui permissão para acessar o painel administrativo.
            Entre em contato com a administradora do sistema.
          </p>
          <a href="/login">
            <button className="btn" style={{ width: '100%' }}>Voltar ao Login</button>
          </a>
        </div>
      </section>
    </main>
  );
}
