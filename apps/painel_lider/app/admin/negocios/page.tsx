'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/auth-context';
import { createNegocio, deleteNegocio, getNegocios, updateNegocio } from '@/lib/services/negocios-service';
import { Negocio } from '@/lib/types';

const CATEGORIAS = [
  'Beleza & Estética',
  'Alimentação & Confeitaria',
  'Moda & Vestuário',
  'Saúde & Bem-estar',
  'Educação & Cursos',
  'Artesanato & Arte',
  'Serviços Domésticos',
  'Consultoria & Finanças',
  'Tecnologia',
  'Outros',
];

const inp: React.CSSProperties = {
  width: '100%', padding: 12, border: '2px solid #E8E8E8',
  borderRadius: 18, boxSizing: 'border-box', fontFamily: 'inherit', fontSize: '1rem',
};

export default function NegociosAdminPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Negocio[]>([]);
  const [form, setForm] = useState({ nome: '', descricao: '', categoria: CATEGORIAS[0], contato: '', link: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setLoadingItems(true);
    try { setItems(await getNegocios()); }
    catch { setError('Não foi possível carregar os negócios.'); }
    finally { setLoadingItems(false); }
  };
  useEffect(() => { load(); }, []);

  const startEdit = (item: Negocio) => {
    setEditingId(item.id);
    setForm({ nome: item.nome, descricao: item.descricao, categoria: item.categoria, contato: item.contato, link: item.link ?? '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditingId(null); setForm({ nome: '', descricao: '', categoria: CATEGORIAS[0], contato: '', link: '' }); setError(''); };

  const save = async () => {
    if (!user || !form.nome.trim() || !form.contato.trim()) return;
    setLoading(true); setError(''); setSuccess('');
    try {
      if (editingId) {
        await updateNegocio(editingId, form.nome, form.descricao, form.categoria, form.contato, form.link);
        setItems(items.map(i => i.id === editingId ? { ...i, ...form } : i));
        setSuccess('✅ Atualizado com sucesso!');
        setEditingId(null);
      } else {
        const created = await createNegocio(form.nome, form.descricao, form.categoria, form.contato, form.link, user.uid);
        setItems([created, ...items]);
        setSuccess('✅ Negócio publicado!');
      }
      setForm({ nome: '', descricao: '', categoria: CATEGORIAS[0], contato: '', link: '' });
      setTimeout(() => setSuccess(''), 4000);
    } catch (e: any) { setError(e?.message || 'Não foi possível salvar.'); }
    finally { setLoading(false); }
  };

  const remove = async (item: Negocio) => {
    if (!confirm(`Remover "${item.nome}"?`)) return;
    try { await deleteNegocio(item.id); setItems(items.filter(x => x.id !== item.id)); }
    catch (e: any) { setError(e?.message || 'Não foi possível remover.'); }
  };

  return (
    <main className="page">
      <header className="header">
        <div><div className="brand">🛍️ Rede de Negócios</div><small>Divulgação e apoio às empreendedoras</small></div>
      </header>
      <section className="main">
        <div className="hero">
          <div className="kicker">Administração</div>
          <h1>Rede de Negócios</h1>
          <p>Cadastre os negócios das mulheres do ministério para que toda a comunidade possa conhecer e apoiar.</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{editingId ? '✏️ Editando' : 'Novo Negócio'}</h2>
            {editingId && <button onClick={cancelEdit} style={{ padding: '0.4rem 1rem', border: '2px solid #E8E8E8', borderRadius: 14, cursor: 'pointer', background: 'transparent', fontSize: '0.9rem' }}>Cancelar</button>}
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            <input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Nome do negócio / empreendedora" style={inp} />
            <textarea value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} placeholder="Descrição do produto ou serviço" rows={3} style={{ ...inp, resize: 'vertical' }} />
            <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} style={inp}>
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={form.contato} onChange={e => setForm({ ...form, contato: e.target.value })} placeholder="Contato: WhatsApp, Instagram ou e-mail" style={inp} />
            <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="Link (opcional): site, loja, catálogo..." style={inp} />
            {success && <div style={{ background: '#E8F5E8', color: '#2E7D32', padding: 12, borderRadius: 14 }}>{success}</div>}
            {error && <div style={{ background: '#FFE8E8', color: '#A33', padding: 12, borderRadius: 14 }}>{error}</div>}
            <button className="btn" disabled={loading || !user || !form.nome.trim() || !form.contato.trim()} onClick={save}>
              {loading ? '⏳ Salvando...' : editingId ? 'Salvar alterações' : 'Publicar negócio'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2>Publicados ({items.length})</h2>
          {loadingItems ? <p style={{ color: '#999', marginTop: 12 }}>⏳ Carregando...</p>
            : items.length === 0 ? <p style={{ color: '#999', marginTop: 12 }}>Nenhum negócio cadastrado ainda.</p>
            : <div style={{ marginTop: 12 }}>
              {items.map(item => (
                <div key={item.id} style={{ padding: 16, background: editingId === item.id ? '#FFFBF0' : '#FAF2F1', borderRadius: 18, marginBottom: 10, border: editingId === item.id ? '2px solid #D4A574' : '2px solid transparent' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: '#2E2E2E', fontSize: '0.95rem' }}>{item.nome}</div>
                      <div style={{ fontSize: '0.78rem', color: '#D4A574', fontWeight: 600, marginTop: 2 }}>{item.categoria}</div>
                      {item.descricao && <p style={{ margin: '6px 0 4px', color: '#666', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.descricao}</p>}
                      <div style={{ fontSize: '0.82rem', color: '#8b7770' }}>📞 {item.contato}</div>
                      {item.link && <div style={{ fontSize: '0.82rem', color: '#2A5C9E', marginTop: 2, wordBreak: 'break-all' }}>🔗 {item.link}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <button onClick={() => startEdit(item)} style={{ padding: '6px 12px', background: '#E8E8E8', border: 0, borderRadius: 12, cursor: 'pointer', fontWeight: 500, fontSize: '0.82rem' }}>Editar</button>
                      <button onClick={() => remove(item)} style={{ padding: '6px 12px', background: '#E8D7D1', border: 0, borderRadius: 12, cursor: 'pointer', color: '#8B4513', fontWeight: 500, fontSize: '0.82rem' }}>Remover</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>}
        </div>

        <Link href="/admin"><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel</button></Link>
      </section>
    </main>
  );
}
