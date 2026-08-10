import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel da Líder | Mulheres Virtuosas',
  description: 'Acompanhamento das discípulas e vínculos de discipulado.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
