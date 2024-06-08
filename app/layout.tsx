import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import Logo from './_components/Logo';
import InfoButton from './_components/InfoButton';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Encyklopedia Jaschikina',
  description: 'Encyklopedia Jaschikina',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <header className="flex items-center justify-between w-full">
          <Logo />
          <InfoButton />
        </header>
        {children}
      </body>
    </html>
  );
}
