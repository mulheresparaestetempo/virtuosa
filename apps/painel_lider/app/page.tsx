import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="page">
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="card" style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✦</div>
          <div className="brand" style={{ marginBottom: '0.5rem' }}>Mulheres para este Tempo</div>
          <p style={{ color: '#8b7770', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Painel Administrativo
          </p>
          <p style={{ color: '#aaa', marginBottom: '2rem', fontSize: '0.85rem' }}>
            Publique devocionais, avisos, PDFs, áudios e eventos para o app FILHA.
          </p>

          <Link href="/login">
            <button className="btn" style={{ width: '100%', marginBottom: '1rem' }}>
              Entrar no Painel
            </button>
          </Link>

          <div style={{ marginTop: '2rem', display: 'grid', gap: '0.5rem', textAlign: 'left' }}>
            {[
              ['✦', 'Devocionais diários'],
              ['📢', 'Avisos e comunicados'],
              ['📅', 'Calendário de eventos'],
              ['📄', 'Biblioteca de PDFs'],
              ['🎵', 'Áudios e podcasts'],
              ['📖', 'Livros e indicações'],
            ].map(([icon, label]) => (
              <p key={label} style={{ color: '#8b7770', fontSize: '0.9rem', margin: 0 }}>
                {icon} {label}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
