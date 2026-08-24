'use client';

import { useEffect, useState } from 'react';
import { getNegocios } from '@/lib/services/negocios-service';
import { Negocio } from '@/lib/types';

const TODAS = 'Todas';

const ICONS: Record<string, string> = {
  'Beleza & Estética': '💅',
  'Alimentação & Confeitaria': '🍰',
  'Moda & Vestuário': '👗',
  'Saúde & Bem-estar': '🌿',
  'Educação & Cursos': '📖',
  'Artesanato & Arte': '🎨',
  'Serviços Domésticos': '🏠',
  'Consultoria & Finanças': '💼',
  'Tecnologia': '💻',
  'Outros': '✨',
};

function isWhatsApp(c: string) { return /^\+?[\d\s\-()]{8,}$/.test(c.replace(/\s/g, '')); }
function isInstagram(c: string) { return /instagram|@/.test(c.toLowerCase()); }

function ContactButton({ contato, link }: { contato: string; link?: string }) {
  const whatsNum = contato.replace(/\D/g, '');
  if (isWhatsApp(contato)) {
    return (
      <a href={`https://wa.me/55${whatsNum}`} target="_blank" rel="noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#25D366', color: 'white', padding: '0.5rem 1rem', borderRadius: 20, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
        💬 WhatsApp
      </a>
    );
  }
  if (isInstagram(contato)) {
    const handle = contato.replace('@', '').trim();
    return (
      <a href={`https://instagram.com/${handle}`} target="_blank" rel="noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: 'white', padding: '0.5rem 1rem', borderRadius: 20, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
        📸 Instagram
      </a>
    );
  }
  if (contato.includes('@')) {
    return (
      <a href={`mailto:${contato}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--rosa)', color: 'white', padding: '0.5rem 1rem', borderRadius: 20, fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
        ✉️ E-mail
      </a>
    );
  }
  return (
    <span style={{ fontSize: '0.85rem', color: '#8b7770' }}>📞 {contato}</span>
  );
}

export default function NegociosPage() {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState(TODAS);

  useEffect(() => {
    getNegocios()
      .then(setNegocios)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categorias = [TODAS, ...Array.from(new Set(negocios.map(n => n.categoria)))];
  const lista = filtro === TODAS ? negocios : negocios.filter(n => n.categoria === filtro);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
      <p style={{ color: '#8b7770' }}>🛍️ Carregando...</p>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'Caveat, cursive', color: 'var(--rosa)' }}>
          Rede de Negócios 🛍️
        </h1>
        <p style={{ margin: '0.3rem 0 0', color: '#8b7770', fontSize: '0.9rem' }}>
          Conheça e apoie as empreendedoras do ministério.
        </p>
      </div>

      {/* Filtros por categoria */}
      {categorias.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 20,
                border: '1.5px solid',
                borderColor: filtro === cat ? 'var(--rosa)' : 'var(--rosa-pastel)',
                background: filtro === cat ? 'var(--rosa-pastel)' : 'white',
                color: filtro === cat ? 'var(--rosa-dark)' : '#8b7770',
                fontWeight: filtro === cat ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}
            >
              {cat === TODAS ? '✨ Todas' : `${ICONS[cat] ?? '•'} ${cat}`}
            </button>
          ))}
        </div>
      )}

      {lista.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#8b7770' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🛍️</div>
          <p>Nenhum negócio cadastrado ainda.<br />Em breve novidades!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {lista.map(item => (
            <div key={item.id} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,244,240,0.95))',
              border: '2px solid var(--rosa-pastel)',
              borderRadius: 16,
              padding: '1.25rem',
              boxShadow: '0 4px 16px rgba(216,155,183,0.1)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{ICONS[item.categoria] ?? '✨'}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#5a4a47', fontSize: '1rem' }}>{item.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--dourado)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.categoria}</div>
                    </div>
                  </div>
                  {item.descricao && (
                    <p style={{ margin: '0.6rem 0', color: '#8b7770', fontSize: '0.9rem', lineHeight: 1.55 }}>{item.descricao}</p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                <ContactButton contato={item.contato} link={item.link} />
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer"
                    style={{ fontSize: '0.82rem', color: 'var(--rosa-dark)', fontWeight: 600, textDecoration: 'none' }}>
                    🔗 Ver mais
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
