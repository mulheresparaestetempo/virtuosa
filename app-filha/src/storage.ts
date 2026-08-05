import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIXO = '@filha/';

export async function carregar<T>(chave: string, valorPadrao: T): Promise<T> {
  try {
    const bruto = await AsyncStorage.getItem(PREFIXO + chave);
    return bruto ? (JSON.parse(bruto) as T) : valorPadrao;
  } catch {
    return valorPadrao;
  }
}

export async function salvar<T>(chave: string, valor: T): Promise<void> {
  try {
    await AsyncStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    // armazenamento indisponível — a sessão continua funcionando só em memória
  }
}
