import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';

import { getConfig } from './utils/wagmi';
import { Providers } from './providers';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeatherNFT DApp',
  description: 'Une application pour mint des NFTs météo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(getConfig(), headers().get('cookie'));

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <Navbar /> 
          {children}
        </Providers>
      </body>
    </html>
  );
}
