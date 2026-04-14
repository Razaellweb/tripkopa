import type {Metadata} from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Tripkopa | Book Your Flight. Pay Small Small.',
  description: 'WhatsApp-native flight booking and installment payment system.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#fcfcfc] text-[#1a1c20] antialiased selection:bg-emerald-500/30">
        {children}
        <Toaster position="top-center" expand={false} richColors />
      </body>
    </html>
  );
}
