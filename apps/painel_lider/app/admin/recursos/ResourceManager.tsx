'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { createLinkResource, deleteResource, getResources, updateResource, ResourceItem, ResourceType } from '@/lib/services/resource-service';

type Props = { type: ResourceType; title: string; icon: string; description: string; urlPlaceholder?: string };

function MediaPlayer({ url, title }: { url: string; title: string }) {
  const isYouTube = /youtube\.com|youtu\.be/.test(url);
  const isSpotify = /spotify\.com/.test(url);
  const isSoundCloud = /soundcloud\.com/.test(url);
  const isAnchor = /anchor\.fm|podcasters\.spotify\.com/.test(url);
  const isAudio = /\.(mp3|wav|ogg|m4a|aac|flac|opus)(\?|$)/i.test(url);
  const isDriveAudio = /drive\.google\.com/.test(url);

  if (isYouTube) {
    const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
    if (!id) return <a href={url} target="_blank" rel="noreferrer" style={{ color: '#2A5C9E' }}>▶ Abrir no YouTube</a>;
    return <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${id}`} style={{ border: 'none', borderRadius: 12, marginTop: 8 }} title={title} allowFullScreen />;
  }
  if (isSpotify) {
    const match = url.match(/spotify\.com\/(episode|track|show|playlist)\/([^?]+)/);
    if (!match) return <a href={url} target="_blank" rel="noreferrer" style={{ color: '#1DB954' }}>▶ Abrir no Spotify</a>;
    const height = match[1] === 'show' || match[1] === 'playlist' ? 232 : 152;
    return <iframe src={`https://open.spotify.com/embed/${match[1]}/${match[2]}`} width="100%" height={height} style={{ border: 'none', borderRadius: 12, marginTop: 8 }} title={title} allowFullScreen />;
  }
  if (isSoundCloud) {
    return <iframe width="100%" height="120" style={{ border: 'none', borderRadius: 12, marginTop: 8 }} src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23D4A574&auto_play=false&hide_related=true&show_comments=false&show_user=true`} title={title} />;
  }
  if (isAnchor) {
    const epMatch = url.match(/episodes\/([^/?]+)/);
    if (epMatch) {
      return <iframe src={`https://anchor.fm/s/embed/${epMatch[1]}`} width="100%" height="102" style={{ border: 'none', borderRadius: 12, marginTop: 8 }} title={title} />;
    }
    return <a href={url} target="_blank" rel="noreferrer" style={{ color: '#6940a5', fontWeight: 600, marginTop: 8, display: 'inline-block' }}>▶ Abrir podcast</a>;
  }
  if (isAudio || isDriveAudio) {
    return (
      <div style={{ marginTop: 8 }}>
        <audio controls src={url} style={{ width: '100%', borderRadius: 12 }}>
          Seu navegador não suporta o player de áudio.
        </audio>
      </div>
    );
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" style={{ color: '#D89BB7', fontWeight: 600, marginTop: 8, display: 'inline-block', fontSize: '0.88rem' }}>
      ▶ Abrir link externo
    </a>
  );
}

export default function ResourceManager({ type, title, icon, description, urlPlaceholder }: Props) {
  const { user } = useAuth();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [form, setForm] = useState({ name: '', desc: '', url: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setLoadingItems(true);
    try { setItems(await getResources(type)); }
    catch { setError('Não foi possível carregar os itens.'); }
    finally { setLoadingItems(false); }
  };
  useEffect(() => { load(); }, [type]);

  const startEdit = (item: ResourceItem) => {
    setEditingId(item.id);
    setForm({ name: item.title, desc: item.description, url: item.url });
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({ name: '', desc: '', url: '' }); setError(''); };

  const save = async () => {
    if (!user || !form.name.trim() || !form.url.trim()) return;
    setLoading(true); setError(''); setSuccess('');
    try {
      if (editingId) {
        await updateResource(editingId, form.name, form.desc, form.url);
        setItems(items.map(i => i.id === editingId ? { ...i, title: form.name.trim(), description: form.desc.trim(), url: form.url.trim() } : i));
        setSuccess('✅ Atualizado com sucesso!');
        setEditingId(null);
      } else {
        const created = await createLinkResource(type, form.name, form.desc, form.url, user.uid);
        setItems([created, ...items]);
        setSuccess('✅ Publicado com sucesso!');
      }
      setForm({ name: '', desc: '', url: '' });
      setTimeout(() => setSuccess(''), 4000);
    } catch (e: any) { setError(e?.message || 'Não foi possível salvar.'); }
    finally { setLoading(false); }
  };

  const remove = async (item: ResourceItem) => {
    if (!confirm(`Remover "${item.title}"?`)) return;
    try { await deleteResource(item); setItems(items.filter(x => x.id !== item.id)); }
    catch (e: any) { setError(e?.message || 'Não foi possível remover.'); }
  };

  const inp: React.CSSProperties = { width: '100%', padding: 12, border: '2px solid #E8E8E8', borderRadius: 18, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '1rem' };
  const isAudioType = type === 'audio' || type === 'podcast';

  const defaultPlaceholder = type === 'audio'
    ? 'https://drive.google.com/file/... · YouTube · SoundCloud · Spotify'
    : type === 'podcast'
    ? 'https://open.spotify.com/show/... · YouTube · Anchor · SoundCloud'
    : urlPlaceholder || 'Link público (Spotify, YouTube, site, loja, etc.)';

  return (
    <main className="page">
      <header className="header"><div><div className="brand">{icon} {title}</div><small>Conteúdo persistente no Firebase</small></div></header>
      <section className="main">
        <div className="hero"><div className="kicker">Administração</div><h1>{title}</h1><p>{description}</p></div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{editingId ? '✏️ Editando' : `Novo ${title.slice(0, -1) || title}`}</h2>
            {editingId && <button onClick={cancelEdit} style={{ padding: '0.4rem 1rem', border: '2px solid #E8E8E8', borderRadius: 14, cursor: 'pointer', background: 'transparent', fontSize: '0.9rem' }}>Cancelar</button>}
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Título" style={inp} />
            <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Descrição (opcional)" rows={3} style={{ ...inp, resize: 'vertical' }} />
            <div>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder={defaultPlaceholder} style={inp} />
              {type === 'audio' && <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#999' }}>Aceita: Google Drive · YouTube · SoundCloud · Spotify · link direto de áudio (.mp3 etc.)</p>}
              {type === 'podcast' && <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#999' }}>Aceita: Spotify (show/episode) · YouTube · Anchor · SoundCloud · qualquer link de podcast</p>}
            </div>
            {success && <div style={{ background: '#E8F5E8', color: '#2E7D32', padding: 12, borderRadius: 14 }}>{success}</div>}
            {error && <div style={{ background: '#FFE8E8', color: '#A33', padding: 12, borderRadius: 14 }}>{error}</div>}
            <button className="btn" disabled={loading || !user || !form.name.trim() || !form.url.trim()} onClick={save}>
              {loading ? '⏳ Salvando...' : editingId ? 'Salvar alterações' : 'Salvar e publicar'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Publicados ({items.length})</h2>
          {loadingItems ? <p style={{ color: '#999', marginTop: 12 }}>⏳ Carregando...</p>
            : items.length === 0 ? <p style={{ color: '#999', marginTop: 12 }}>Nenhum item cadastrado.</p>
            : <div style={{ marginTop: 12 }}>
              {items.map(item => (
                <div key={item.id} style={{ padding: 16, background: editingId === item.id ? '#FFFBF0' : '#FAF2F1', borderRadius: 18, marginBottom: 10, border: editingId === item.id ? '2px solid #D4A574' : '2px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <a href={item.url} target="_blank" rel="noreferrer" style={{ fontWeight: 600, color: '#2E2E2E', display: 'block', wordBreak: 'break-word' }}>{item.title}</a>
                      {item.description && <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9rem' }}>{item.description}</p>}
                      <small style={{ color: '#999' }}>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</small>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {isAudioType && <button onClick={() => setExpandedId(expandedId === item.id ? null : item.id)} style={{ padding: '6px 12px', background: '#EBF1FA', border: 0, borderRadius: 12, cursor: 'pointer', color: '#2A5C9E', fontWeight: 500, fontSize: '0.82rem' }}>{expandedId === item.id ? 'Fechar' : '▶ Player'}</button>}
                      <button onClick={() => startEdit(item)} style={{ padding: '6px 12px', background: '#E8E8E8', border: 0, borderRadius: 12, cursor: 'pointer', fontWeight: 500, fontSize: '0.82rem' }}>Editar</button>
                      <button onClick={() => remove(item)} style={{ padding: '6px 12px', background: '#E8D7D1', border: 0, borderRadius: 12, cursor: 'pointer', color: '#8B4513', fontWeight: 500, fontSize: '0.82rem' }}>Remover</button>
                    </div>
                  </div>
                  {isAudioType && expandedId === item.id && <MediaPlayer url={item.url} title={item.title} />}
                </div>
              ))}
            </div>}
        </div>

        <Link href="/admin"><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel</button></Link>
      </section>
    </main>
  );
}
