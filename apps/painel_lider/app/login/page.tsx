'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail, registerWithEmail, resetPassword } from '@/lib/services/auth-service';

type View = 'login' | 'register' | 'reset' | 'reset-sent';

export default function LoginPage() {
  const router = useRouter();
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const friendlyError = (msg: string) => {
    if (msg.includes('user-not-found') || msg.includes('invalid-credential')) return 'E-mail ou senha incorretos';
    if (msg.includes('wrong-password')) return 'Senha incorreta';
    if (msg.includes('email-already-in-use')) return 'E-mail já está em uso';
    if (msg.includes('weak-password')) return 'Senha muito fraca (mínimo 6 caracteres)';
    if (msg.includes('invalid-email')) return 'E-mail inválido';
    if (msg.includes('too-many-requests')) return 'Muitas tentativas. Tente novamente mais tarde.';
    return msg;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithEmail(email, password, remember);
      router.push('/admin');
    } catch (err: any) {
      setError(friendlyError(err?.message || 'Erro ao autenticar'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerWithEmail(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(friendlyError(err?.message || 'Erro ao criar conta'));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await resetPassword(email);
      setView('reset-sent');
    } catch (err: any) {
      setError(friendlyError(err?.message || 'Erro ao enviar e-mail'));
    } finally {
      setLoading(false);
    }
  };

  const switchView = (v: View) => { setView(v); setError(''); };

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '2px solid #E8E8E8',
    borderRadius: '20px', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit',
  };

  return (
    <main className="page">
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="login">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="brand">Painel Admin</div>
            <p style={{ color: '#999', marginTop: '0.5rem' }}>Mulheres para este Tempo</p>
          </div>

          {/* ── LOGIN ── */}
          {view === 'login' && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required style={inp} />
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} style={inp} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#555' }}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    style={{ accentColor: '#D4A574', width: 16, height: 16, cursor: 'pointer' }}
                  />
                  Lembrar login
                </label>
                <button type="button" onClick={() => switchView('reset')} style={{ background: 'none', border: 'none', color: '#D89BB7', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>
                  Esqueceu a senha?
                </button>
              </div>

              {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

              <button type="submit" disabled={loading} className="btn" style={{ width: '100%' }}>
                {loading ? '⏳ Entrando...' : 'Entrar'}
              </button>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
                  Não tem uma conta?{' '}
                  <button type="button" onClick={() => switchView('register')} style={{ background: 'none', border: 'none', color: '#D89BB7', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>
                    Registre-se
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ── REGISTRO ── */}
          {view === 'register' && (
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required style={inp} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} style={inp} />
              </div>

              {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

              <button type="submit" disabled={loading} className="btn" style={{ width: '100%' }}>
                {loading ? '⏳ Criando conta...' : 'Criar Conta'}
              </button>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
                  Já tem uma conta?{' '}
                  <button type="button" onClick={() => switchView('login')} style={{ background: 'none', border: 'none', color: '#D89BB7', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>
                    Fazer login
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ── RECUPERAR SENHA ── */}
          {view === 'reset' && (
            <form onSubmit={handleReset}>
              <p style={{ color: '#555', marginBottom: '1.25rem', textAlign: 'center', fontSize: '0.95rem', lineHeight: '1.5' }}>
                Digite seu e-mail e enviaremos um link para redefinir sua senha.
              </p>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#2E2E2E', fontWeight: '500' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required style={inp} />
              </div>

              {error && <div style={{ backgroundColor: '#FFE8E8', color: '#C85A54', padding: '0.75rem', borderRadius: '16px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

              <button type="submit" disabled={loading} className="btn" style={{ width: '100%' }}>
                {loading ? '⏳ Enviando...' : 'Enviar link de recuperação'}
              </button>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button type="button" onClick={() => switchView('login')} style={{ background: 'none', border: 'none', color: '#D89BB7', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>
                  ← Voltar ao login
                </button>
              </div>
            </form>
          )}

          {/* ── LINK ENVIADO ── */}
          {view === 'reset-sent' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
              <h2 style={{ color: '#2E2E2E', marginBottom: '0.75rem' }}>E-mail enviado!</h2>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Verifique sua caixa de entrada (e a pasta de spam) em <strong>{email}</strong> para redefinir sua senha.
              </p>
              <button onClick={() => switchView('login')} className="btn" style={{ width: '100%' }}>
                Voltar ao login
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
