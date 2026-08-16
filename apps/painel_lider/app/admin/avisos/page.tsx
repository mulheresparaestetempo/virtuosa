'use client';

import { useState } from 'react';

interface Aviso {
  id: string;
  title: string;
  message: string;
  priority: 'baixa' | 'média' | 'alta';
  sentAt: string;
  sentTo: number;
}

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([
    {
      id: '1',
      title: 'Atualizações do App',
      message: 'Uma nova versão do app FILHA foi lançada com novas funcionalidades.',
      priority: 'média',
      sentAt: '2024-08-20',
      sentTo: 245,
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'média' as 'baixa' | 'média' | 'alta',
  });

  const handleSend = () => {
    if (formData.title.trim() && formData.message.trim()) {
      const newAviso: Aviso = {
        id: Date.now().toString(),
        title: formData.title,
        message: formData.message,
        priority: formData.priority,
        sentAt: new Date().toLocaleDateString('pt-BR'),
        sentTo: Math.floor(Math.random() * 300) + 100,
      };
      setAvisos([newAviso, ...avisos]);
      setFormData({ title: '', message: '', priority: 'média' });
    }
  };

  const handleDelete = (id: string) => {
    setAvisos(avisos.filter(aviso => aviso.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      baixa: { bg: '#F0F4E8', text: '#7A9C3B' },
      média: { bg: '#FFF8E8', text: '#D4A574' },
      alta: { bg: '#FFE8E8', text: '#C85A54' },
    };
    return colors[priority] || colors.média;
  };

  const getPriorityIcon = (priority: string) => {
    const icons: Record<string, string> = {
      baixa: '📌',
      média: '⚠️',
      alta: '🔴',
    };
    return icons[priority] || '📌';
  };

  return (
    <main className="page">
      <header className="header">
        <div>
          <div className="brand">Avisos</div>
          <small>Notificações importantes</small>
        </div>
      </header>

      <section className="main">
        <div className="hero">
          <div className="kicker">📢 Comunicados</div>
          <h1>Enviar Notificações</h1>
          <p>Comunique informações importantes para todas as usuárias do app FILHA.</p>
        </div>

        <div className="card">
          <h2>Novo Aviso</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Título do Aviso
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Manutenção Programada"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Nível de Prioridade
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {(['baixa', 'média', 'alta'] as const).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setFormData({ ...formData, priority })}
                    style={{
                      padding: '0.75rem',
                      border: formData.priority === priority ? '2px solid #D4A574' : '2px solid #E8E8E8',
                      borderRadius: '16px',
                      backgroundColor: formData.priority === priority ? '#FFFBF7' : '#FFF',
                      cursor: 'pointer',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      transition: 'all 0.2s',
                    }}
                  >
                    {getPriorityIcon(priority)} {priority}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Mensagem
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Escreva a notificação importante para o app..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  minHeight: '120px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ backgroundColor: '#F5F5F5', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                ℹ️ Este aviso será enviado para <strong>todas as usuárias ativas</strong> do app FILHA como uma notificação.
              </p>
            </div>

            <button onClick={handleSend} className="btn" style={{ width: '100%' }}>
              Enviar Notificação
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Histórico de Avisos</h2>
          {avisos.length === 0 ? (
            <p style={{ marginTop: '1rem', color: '#999' }}>Nenhum aviso enviado ainda.</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {avisos.map((aviso) => {
                const priorityColor = getPriorityColor(aviso.priority);
                return (
                  <div
                    key={aviso.id}
                    style={{
                      padding: '1rem',
                      backgroundColor: priorityColor.bg,
                      borderRadius: '20px',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <p style={{ fontWeight: '600', color: priorityColor.text, margin: 0, fontSize: '1rem' }}>
                          {getPriorityIcon(aviso.priority)} {aviso.title}
                        </p>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            backgroundColor: priorityColor.text,
                            color: '#FFF',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            textTransform: 'capitalize',
                          }}
                        >
                          {aviso.priority}
                        </span>
                      </div>
                      <p style={{ color: '#666', margin: '0.5rem 0 0 0', lineHeight: '1.5' }}>
                        {aviso.message}
                      </p>
                      <small style={{ color: '#999', marginTop: '0.5rem', display: 'block' }}>
                        📤 Enviado em {aviso.sentAt} para {aviso.sentTo} usuárias
                      </small>
                    </div>
                    <button
                      onClick={() => handleDelete(aviso.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        border: `2px solid ${priorityColor.text}`,
                        borderRadius: '16px',
                        cursor: 'pointer',
                        color: priorityColor.text,
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
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

        <a href="/admin" style={{ display: 'block', marginTop: '2rem' }}>
          <button className="btn secondary" style={{ width: '100%' }}>
            Voltar ao Painel Admin
          </button>
        </a>
      </section>
    </main>
  );
}
