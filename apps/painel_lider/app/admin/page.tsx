import Link from 'next/link';

export default function AdminPage() {
  const modules: [string, string, string, string][] = [
    ['✦ Devocional', 'Meditações Diárias', 'Publique devocionais com versículos, reflexão e oração.', '/admin/devocional'],
    ['📢 Avisos', 'Comunicados', 'Publique avisos importantes para as usuárias.', '/admin/avisos'],
    ['📅 Calendário', 'Eventos e Datas', 'Retiros, cultos, encontros e eventos do ministério.', '/admin/calendar'],
    ['📄 PDFs', 'Biblioteca de Recursos', 'Adicione links de PDFs (Google Drive, Dropbox, etc.).', '/admin/pdf-manager'],
    ['🎵 Áudios', 'Louvor e Meditações', 'Links de áudios: Google Drive, YouTube, SoundCloud, Spotify.', '/admin/recursos/audios'],
    ['🎙️ Podcasts', 'Podcasts e Séries', 'Cadastre episódios e links de podcasts.', '/admin/recursos/podcasts'],
    ['📖 Livros', 'Indicações de Livros', 'Publique recomendações de leitura.', '/admin/recursos/livros'],
    ['🔗 Indicações', 'Links Úteis', 'Publique cursos, sites e materiais.', '/admin/recursos/indicacoes'],
    ['👥 Usuárias', 'Comunidade', 'Visualize as mulheres cadastradas no app FILHA.', '/admin/usuarios'],
    ['📊 Estatísticas', 'Visão Geral', 'Veja contagens e resumo de todo o conteúdo publicado.', '/admin-dashboard'],
  ];
  return (
    <main className="page">
      <header className="header"><div><div className="brand">Painel Admin</div><small>Central de conteúdo FILHA</small></div></header>
      <section className="main">
        <div className="hero">
          <div className="kicker">Administração</div>
          <h1>Tudo em um só lugar</h1>
          <p>Entre, publique e atualize o conteúdo pelo navegador. Os dados são persistidos no Firebase Firestore.</p>
        </div>
        <div className="grid">
          {modules.map(([kicker, title, text, href]) => (
            <Link href={href} key={href} style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="kicker">{kicker}</div>
                <h2>{title}</h2>
                <p>{text}</p>
                <button className="btn" style={{ marginTop: '1rem' }}>Abrir módulo</button>
              </div>
            </Link>
          ))}
        </div>
        <div className="card">
          <h2>✅ Funcionalidades ativas</h2>
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            <p>🔐 Login com Firebase Authentication</p>
            <p>🗄️ Dados persistentes no Firestore</p>
            <p>🔗 PDFs e áudios via links externos (Google Drive, YouTube, Spotify, SoundCloud)</p>
            <p>✏️ Criar, editar e excluir em todos os módulos</p>
            <p>▶️ Player de áudio integrado (YouTube, Spotify, SoundCloud, link direto)</p>
            <p>📊 Visualizador de PDF inline</p>
            <p>👥 Listagem de usuárias cadastradas no app</p>
          </div>
        </div>
      </section>
    </main>
  );
}
