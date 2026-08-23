'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { createLinkResource, deleteResource, getResources, ResourceItem, ResourceType, uploadAudio } from '@/lib/services/resource-service';

type Props = { type: ResourceType; title: string; icon: string; description: string; upload?: boolean };

export default function ResourceManager({ type, title, icon, description, upload = false }: Props) {
  const { user } = useAuth();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => { try { setItems(await getResources(type)); } catch (e) { console.error(e); setError('Não foi possível carregar os itens.'); } };
  useEffect(() => { load(); }, [type]);

  const save = async () => {
    if (!user) return;
    setLoading(true); setError('');
    try {
      const created = upload ? await uploadAudio(file!, name, desc, user.uid) : await createLinkResource(type, name, desc, url, user.uid);
      setItems((current) => [created, ...current]); setName(''); setDesc(''); setUrl(''); setFile(null);
      const input = document.getElementById('resource-file') as HTMLInputElement | null; if (input) input.value = '';
    } catch (e: any) { setError(e?.message || 'Não foi possível salvar.'); } finally { setLoading(false); }
  };

  const remove = async (item: ResourceItem) => {
    if (!confirm(`Remover “${item.title}”?`)) return;
    try { await deleteResource(item); setItems((current) => current.filter((x) => x.id !== item.id)); }
    catch (e: any) { setError(e?.message || 'Não foi possível remover.'); }
  };

  return <main className="page"><header className="header"><div><div className="brand">{icon} {title}</div><small>Conteúdo persistente no Firebase</small></div></header><section className="main">
    <div className="hero"><div className="kicker">Administração</div><h1>{title}</h1><p>{description}</p></div>
    <div className="card"><h2>Novo {title.slice(0, -1) || title}</h2><div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Título" style={{ width: '100%', padding: 12, border: '2px solid #E8E8E8', borderRadius: 18, boxSizing: 'border-box' }} />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Descrição (opcional)" rows={4} style={{ width: '100%', padding: 12, border: '2px solid #E8E8E8', borderRadius: 18, boxSizing: 'border-box', resize: 'vertical' }} />
      {upload ? <><label style={{ fontWeight: 500 }}>Arquivo de áudio (até 100 MB)</label><input id="resource-file" type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ padding: 12, border: '2px dashed #D4A574', borderRadius: 18 }} /></> : <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Link público (Spotify, YouTube, loja, site etc.)" style={{ width: '100%', padding: 12, border: '2px solid #E8E8E8', borderRadius: 18, boxSizing: 'border-box' }} />}
      {error && <div style={{ background: '#FFE8E8', color: '#A33', padding: 12, borderRadius: 14 }}>{error}</div>}
      <button className="btn" disabled={loading || !user || !name.trim() || (upload ? !file : !url.trim())} onClick={save}>{loading ? '⏳ Salvando...' : 'Salvar e publicar'}</button>
    </div></div>
    <div className="card"><h2>Publicados ({items.length})</h2>{items.length === 0 ? <p style={{ color: '#999', marginTop: 12 }}>Nenhum item cadastrado.</p> : <div style={{ marginTop: 12 }}>{items.map((item) => <div key={item.id} style={{ padding: 16, background: '#FAF2F1', borderRadius: 18, marginBottom: 10, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}><div><a href={item.url} target="_blank" rel="noreferrer" style={{ fontWeight: 600, color: '#2E2E2E' }}>{item.title}</a><p style={{ margin: '4px 0', color: '#666' }}>{item.description}</p><small style={{ color: '#999' }}>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</small></div><button onClick={() => remove(item)} style={{ padding: '8px 12px', border: 0, borderRadius: 14, cursor: 'pointer' }}>Remover</button></div>)}</div>}</div>
    <Link href="/admin"><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel</button></Link>
  </section></main>;
}
