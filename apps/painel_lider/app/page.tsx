import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: 540, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌸</div>
          <div className="brand" style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>Ministério Virtuosa</div>
          <p style={{ color: '#8b7770', marginBottom: '3rem', fontSize: '1rem', fontStyle: 'italic' }}>
            Mulheres para este Tempo
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <Link href="/filha" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: '2.5rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌺</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--rosa)', marginBottom: '0.5rem' }}>
                  Acessar o FILHA
                </div>
                <p style={{ color: '#8b7770', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  Devocional, biblioteca, avisos e muito mais
                </p>
              </div>
            </Link>

            <Link href="/login" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: '2.5rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚙️</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--rosa)', marginBottom: '0.5rem' }}>
                  Painel Admin
                </div>
                <p style={{ color: '#8b7770', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                  Publicar conteúdo, gerenciar usuárias
                </p>
              </div>
            </Link>
          </div>

          <p style={{ color: '#bbb', fontSize: '0.8rem', marginTop: '3rem' }}>
            Mulheres para este Tempo · Ministério Virtuosa
          </p>
        </div>
      </section>
    </main>
  );
}
