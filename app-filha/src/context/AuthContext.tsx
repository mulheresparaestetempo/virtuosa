import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from '@firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, firebaseConfigurado } from '../firebase';

export type Papel = 'membro' | 'lider';

export type PerfilUsuaria = {
  nome: string;
  papel: Papel;
  ultimoDiaDevocionalLido?: number;
};

type AuthContextValor = {
  carregando: boolean;
  usuario: User | null;
  perfil: PerfilUsuaria | null;
  erro: string | null;
  cadastrar: (nome: string, email: string, senha: string) => Promise<void>;
  entrar: (email: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValor | null>(null);

function traduzErro(codigo: string): string {
  switch (codigo) {
    case 'auth/email-already-in-use':
      return 'Já existe uma conta com esse e-mail.';
    case 'auth/invalid-email':
      return 'E-mail inválido.';
    case 'auth/weak-password':
      return 'A senha precisa ter pelo menos 6 caracteres.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'E-mail ou senha incorretos.';
    default:
      return 'Não foi possível completar. Tente novamente.';
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [carregando, setCarregando] = useState(firebaseConfigurado);
  const [usuario, setUsuario] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuaria | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseConfigurado) return;
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUsuario(u);
      if (u) {
        const ref = doc(db, 'usuarias', u.uid);
        await updateDoc(ref, { ultimoAcesso: serverTimestamp() }).catch(() => {});
        const snap = await getDoc(ref).catch(() => null);
        setPerfil(snap?.exists() ? (snap.data() as PerfilUsuaria) : null);
      } else {
        setPerfil(null);
      }
      setCarregando(false);
    });
    return unsub;
  }, []);

  async function cadastrar(nome: string, email: string, senha: string) {
    setErro(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
      await setDoc(doc(db, 'usuarias', cred.user.uid), {
        nome: nome.trim(),
        papel: 'membro',
        criadoEm: serverTimestamp(),
        ultimoAcesso: serverTimestamp(),
      });
    } catch (e) {
      setErro(traduzErro((e as { code?: string })?.code ?? ''));
      throw e;
    }
  }

  async function entrar(email: string, senha: string) {
    setErro(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
    } catch (e) {
      setErro(traduzErro((e as { code?: string })?.code ?? ''));
      throw e;
    }
  }

  async function sair() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ carregando, usuario, perfil, erro, cadastrar, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

const valorSemFirebase: AuthContextValor = {
  carregando: false,
  usuario: null,
  perfil: null,
  erro: null,
  cadastrar: async () => {},
  entrar: async () => {},
  sair: async () => {},
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx ?? valorSemFirebase;
}
