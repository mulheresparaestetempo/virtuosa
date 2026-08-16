'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail, registerWithEmail } from '@/lib/services/auth-service';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      router.push('/admin');
    } catch (err: any) {
      const errorMsg = err?.message || 'Erro ao autenticar';
      if (errorMsg.includes('user-not-found')) {
        setError('Usuário não encontrado');
      } else if (errorMsg.includes('wrong-password')) {
        setError('Senha incorreta');
      } else if (errorMsg.includes('email-already-in-use')) {
        setError('Email já está em uso');
      } else if (errorMsg.includes('weak-password')) {
        setError('Senha muito fraca (mínimo 6 caracteres)');
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="login">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="brand">Painel Admin</div>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>Mulheres para este Tempo</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8E8E8',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {error && (
              <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn" style={{ width: '100%' }}>
              {loading ? '⏳ Autenticando...' : isRegistering ? 'Criar Conta' : 'Entrar'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
              {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#D89BB7',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {isRegistering ? 'Fazer login' : 'Registre-se'}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
