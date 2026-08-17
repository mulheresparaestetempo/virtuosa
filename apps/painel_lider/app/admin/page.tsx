export default function AdminPage() {
  const modules = [
    ['📄 PDFs', 'Biblioteca de Recursos', 'Cole links de PDFs do Google Drive ou Dropbox.', '/admin/pdf-manager'],
    ['🎵 Áudios', 'Louvor e Meditações', 'Cole links do Google Drive, SoundCloud ou Spotify.', '/admin/recursos/audios'],
    ['🎙️ Podcasts', 'Podcasts e Séries', 'Cadastre episódios e links de podcasts.', '/admin/recursos/podcasts'],
    ['📖 Livros', 'Indicações de Livros', 'Publique recomendações de leitura.', '/admin/recursos/livros'],
    ['🔗 Indicações', 'Links Úteis', 'Publique cursos, sites e materiais.', '/admin/recursos/indicacoes'],
    ['📅 Calendário', 'Eventos e Datas', 'Retiros, cultos, encontros e eventos.', '/admin/calendar'],
    ['✦ Devocional', 'Meditações Diárias', 'Publique devocionais com versículos e oração.', '/admin/devocional'],
    ['📢 Avisos', 'Comunicados', 'Publique avisos importantes para as usuárias.', '/admin/avisos'],
  ];
  return <main className="page"><header className="header"><div><div className="brand">Painel Admin</div><small>Central de conteúdo FILHA</small></div></header><section className="main">
    <div className="hero"><div className="kicker">Administração</div><h1>Tudo em um só lugar</h1><p>Entre, publique e atualize o conteúdo pelo navegador. Os dados são persistidos no Firebase.</p></div>
    <div className="grid">{modules.map(([kicker, title, text, href]) => <a href={href} key={href}><div className="card"><div className="kicker">{kicker}</div><h2>{title}</h2><p>{text}</p><button className="btn" style={{ marginTop: '1rem' }}>Abrir módulo</button></div></a>)}</div>
    <div className="card"><h2>✅ Estrutura ativa</h2><div style={{ marginTop: 12 }}><p>🔐 Login com Firebase Authentication</p><p>🗄️ Dados persistentes no Firestore</p><p>🔗 PDFs e áudios via links externos (Google Drive, etc.)</p><p>📱 Conteúdo preparado para consumo pelo app FILHA</p></div></div>
  </section></main>;
}
