'use client';

import { useEffect, useState } from 'react';
import { getPDFs } from '@/lib/services/pdf-service';
import { getResources, ResourceItem } from '@/lib/services/resource-service';
import { PDFDocument } from '@/lib/types';

type Tab = 'pdfs' | 'audios' | 'podcasts' | 'livros' | 'links';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'pdfs', label: 'PDFs', icon: '📄' },
  { id: 'audios', label: 'Áudios', icon: '🎵' },
  { id: 'podcasts', label: 'Podcasts', icon: '🎙️' },
  { id: 'livros', label: 'Livros', icon: '📖' },
  { id: 'links', label: 'Links', icon: '🔗' },
];

export default function FilhaBibliotecaPage() {
  const [tab, setTab] = useState<Tab>('pdfs');
  const [pdfs, setPdfs] = useState<PDFDocument[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getPDFs(),
      getResources(),
    ]).then(([p, r]) => {
      setPdfs(p);
      setResources(r);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const open = (url: string) => {
    try { window.open(url, '_blank', 'noopener,noreferrer'); } catch {}
  };

  const filtered = resources.filter(r => {
    if (tab === 'audios') return r.type === 'audio';
    if (tab === 'podcasts') return r.type === 'podcast';
    if (tab === 'livros') return r.type === 'livro';
    if (tab === 'links') return r.type === 'indicacao';
    return false;
  });

  return (
    <div>
      <h1 style={{ fontFamily: 'Caveat, cursive', color: 'var(--rosa)', fontSize: '2rem', margin: '0 0 1.25rem' }}>
        📚 Biblioteca
      </h1>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: '0 0 auto',
              padding: '0.5rem 1rem',
              borderRadius: 20,
              border: '2px solid',
              borderColor: tab === t.id ? 'var(--rosa)' : 'var(--rosa-pastel)',
              background: tab === t.id ? 'var(--rosa-pastel)' : 'white',
              color: tab === t.id ? 'var(--rosa-dark)' : '#8b7770',
              fontWeight: tab === t.id ? 700 : 400,
              cursor: 'pointer',
              fontSize: '0.85rem',
              font: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : tab === 'pdfs' ? (
        pdfs.length === 0 ? <Empty text="Nenhum PDF publicado ainda." /> : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {pdfs.map(p => (
              <Item key={p.id} title={p.name} sub={''} icon="📄" onOpen={() => open(p.url)} />
            ))}
          </div>
        )
      ) : (
        filtered.length === 0 ? <Empty text="Nenhum item publicado ainda." /> : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {filtered.map(r => (
              <Item key={r.id} title={r.title} sub={r.description} icon={tabIcon(tab)} onOpen={() => open(r.url)} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

function tabIcon(tab: Tab) {
  if (tab === 'audios') return '🎵';
  if (tab === 'podcasts') return '🎙️';
  if (tab === 'livros') return '📖';
  return '🔗';
}

function Item({ title, sub, icon, onOpen }: { title: string; sub: string; icon: string; onOpen: () => void }) {
  return (
    <div onClick={onOpen} style={{ background: 'white', border: '1.5px solid var(--rosa-pastel)', borderRadius: 14, padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s' }}>
      <span style={{ fontSize: '1.5rem', flex: '0 0 auto' }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: '#5a4a47', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        {sub && <div style={{ color: '#8b7770', fontSize: '0.82rem', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</div>}
      </div>
      <span style={{ color: 'var(--rosa)', fontSize: '1.1rem', flex: '0 0 auto' }}>↗</span>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#8b7770' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
      <p style={{ margin: 0 }}>{text}</p>
    </div>
  );
}

function Loader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
      <div style={{ color: '#8b7770' }}>🌸 Carregando...</div>
    </div>
  );
}
