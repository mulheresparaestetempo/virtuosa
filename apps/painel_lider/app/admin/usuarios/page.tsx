'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Usuaria } from '@/lib/types';

export default function UsuariasPage() {
  const [usuarias, setUsuarias] = useState<Usuaria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busca, setBusca] = useState('');

  useEffect(() => { loadUsuarias(); }, []);

  const loadUsuarias = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'usuarias'), orderBy('nome')));
      setUsuarias(snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          nome: data.nome || 'Sem nome',
          email: data.email,
          papel: data.papel || 'membro',
          discipuladoraId: data.discipuladoraId,
          igrejaId: data.igrejaId,
          liderId: data.liderId,
          ultimoAcesso: data.ultimoAcesso?.toDate?.() || undefined,
          ultimoDiaDevocionalLido: data.ultimoDiaDevocionalLido,
        } as Usuaria;
      }));
    } catch (e) {
      console.error(e);
      setError('Erro ao carregar usuárias. Verifique as regras do Firestore.');
    } finally { setLoading(false); }
  };

  const filtradas = usuarias.filter(u =>
    busca === '' || u.nome.toLowerCase().includes(busca.toLowerCase()) || (u.email || '').toLowerCase().includes(busca.toLowerCase())
  );

  const lideres = filtradas.filter(u => u.papel === 'lider');
  const membras = filtradas.filter(u => u.papel === 'membro');

  const inp: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '2px solid #E8E8E8', borderRadius: '20px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };

  return (
    <main className="page">
      <header className="header"><div><div className="brand">Usuárias</div><small>Membras cadastradas no app</small></div></header>
      <section className="main">
        <div className="hero">
          <div className="kicker">👥 Comunidade</div>
          <h1>Usuárias do App FILHA</h1>
          <p>Veja as mulheres cadastradas e acompanhe o crescimento da comunidade.</p>
        </div>

        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div style={{ padding: '1rem', background: '#FAF2F1', borderRadius: 16 }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: '#D4A574', margin: 0 }}>{usuarias.length}</p>
              <p style={{ color: '#666', margin: 0, fontSize: '0.85rem' }}>Total</p>
            </div>
            <div style={{ padding: '1rem', background: '#F0F4E8', borderRadius: 16 }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: '#7A9C3B', margin: 0 }}>{usuarias.filter(u => u.papel === 'lider').length}</p>
              <p style={{ color: '#666', margin: 0, fontSize: '0.85rem' }}>Líderes</p>
            </div>
            <div style={{ padding: '1rem', background: '#EBF1FA', borderRadius: 16 }}>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: '#2A5C9E', margin: 0 }}>{usuarias.filter(u => u.papel === 'membro').length}</p>
              <p style={{ color: '#666', margin: 0, fontSize: '0.85rem' }}>Membras</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="card"><p style={{ color: '#999' }}>⏳ Carregando usuárias...</p></div>
        ) : error ? (
          <div className="card"><p style={{ color: '#C85A54' }}>⚠️ {error}</p></div>
        ) : usuarias.length === 0 ? (
          <div className="card">
            <p style={{ color: '#999', marginBottom: '0.5rem' }}>Nenhuma usuária cadastrada ainda.</p>
            <p style={{ color: '#999', fontSize: '0.85rem' }}>As usuárias aparecem aqui após se cadastrarem no app FILHA.</p>
          </div>
        ) : (
          <>
            <div className="card" style={{ padding: '1rem 1.5rem' }}>
              <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="🔍 Buscar por nome ou email..." style={inp} />
            </div>

            {lideres.length > 0 && (
              <div className="card">
                <h2>Líderes ({lideres.length})</h2>
                <div style={{ marginTop: '1rem' }}>
                  {lideres.map(u => <UsuariaCard key={u.id} u={u} />)}
                </div>
              </div>
            )}

            {membras.length > 0 && (
              <div className="card">
                <h2>Membras ({membras.length})</h2>
                <div style={{ marginTop: '1rem' }}>
                  {membras.map(u => <UsuariaCard key={u.id} u={u} />)}
                </div>
              </div>
            )}

            {filtradas.length === 0 && busca && (
              <div className="card"><p style={{ color: '#999' }}>Nenhuma usuária encontrada para "{busca}".</p></div>
            )}
          </>
        )}

        <a href="/admin" style={{ display: 'block', marginTop: '2rem' }}><button className="btn secondary" style={{ width: '100%' }}>Voltar ao Painel Admin</button></a>
      </section>
    </main>
  );
}

function UsuariaCard({ u }: { u: Usuaria }) {
  const isLider = u.papel === 'lider';
  return (
    <div style={{ padding: '0.75rem 1rem', background: '#FAF2F1', borderRadius: 16, marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <p style={{ fontWeight: 600, color: '#2E2E2E', margin: 0 }}>{u.nome}</p>
          <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 8, backgroundColor: isLider ? '#F0F4E8' : '#EBF1FA', color: isLider ? '#7A9C3B' : '#2A5C9E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{u.papel}</span>
        </div>
        {u.email && <p style={{ color: '#999', fontSize: '0.82rem', margin: '0.15rem 0 0' }}>{u.email}</p>}
        {u.ultimoAcesso && <small style={{ color: '#bbb', fontSize: '0.78rem' }}>Último acesso: {u.ultimoAcesso.toLocaleDateString('pt-BR')}</small>}
        {u.ultimoDiaDevocionalLido && <small style={{ color: '#bbb', fontSize: '0.78rem', display: 'block' }}>Último devocional: {u.ultimoDiaDevocionalLido}</small>}
      </div>
      <div style={{ fontSize: '1.5rem', opacity: 0.3 }}>👤</div>
    </div>
  );
}
