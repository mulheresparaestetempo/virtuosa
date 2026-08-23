'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginWithEmail, registerMember } from '@/lib/services/auth-service';

export default function FilhaLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'signup') {
        if (!name.trim()) { setError('Informe seu nome.'); setLoading(false); return; }
        await registerMember(name.trim(), email, password);
      } else {
        await loginWithEmail(email, password);
      }
      router.push('/filha');
    } catch (err: any) {
      const msg: string = err?.code || err?.message || '';
      if (msg.includes('user-not-found') || msg.includes('invalid-credential')) setError('Email não encontrado ou senha incorreta.');
      else if (msg.includes('wrong-password')) setError('Senha incorreta.');
      else if (msg.includes('email-already-in-use')) setError('Este email já está cadastrado. Faça login.');
      else if (msg.includes('weak-password')) setError('Senha muito fraca (mínimo 6 caracteres).');
      else if (msg.includes('invalid-email')) setError('Email inválido.');
      else setError('Erro ao autenticar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem 1rem' }}>
        <div className="login" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌸</div>
            <div className="brand">FILHA</div>
            <p style={{ color: '#8b7770', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              {mode === 'login' ? 'Bem-vinda de volta' : 'Criar sua conta'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Seu nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Como você se chama?"
                  required
                  style={inputStyle}
                />
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={inputStyle}
              />
            </div>

            {error && (
              <div style={{ background: '#FFE8E8', color: '#C85A54', padding: '0.75rem 1rem', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn" style={{ width: '100%' }}>
              {loading ? '⏳ Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
              {mode === 'login' ? 'Não tem conta ainda?' : 'Já tem uma conta?'}{' '}
              <button
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--rosa)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}
              >
                {mode === 'login' ? 'Criar conta' : 'Fazer login'}
              </button>
            </p>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--rosa-pastel)', paddingTop: '1.5rem' }}>
            <Link href="/" style={{ color: '#bbb', fontSize: '0.85rem' }}>← Voltar ao início</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.4rem', color: '#5a4a47', fontWeight: 600, fontSize: '0.9rem' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--rosa-pastel)', borderRadius: '20px', fontSize: '1rem', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit', color: '#5a4a47' };
