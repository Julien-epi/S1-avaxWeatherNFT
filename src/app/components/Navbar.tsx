'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Link from 'next/link';

export function Navbar() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnected = account.status === 'connected';

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link href="/" style={styles.link}>
          WeatherNFT DApp
        </Link>
      </div>
      <div style={styles.links}>
        <Link href="/about" style={styles.link}>
          À propos
        </Link>
      </div>
      <div style={styles.wallet}>
        {isConnected ? (
          <div>
            <span style={styles.address}>
              {account.addresses?.[0]?.slice(0, 6)}...
              {account.addresses?.[0]?.slice(-4)}
            </span>
            <button onClick={() => disconnect()} style={styles.button}>
              Déconnecter
            </button>
          </div>
        ) : (
          connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
              style={styles.button}
            >
              {connector.name}
            </button>
          ))
        )}
        {error && <div>{error.message}</div>}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '1rem',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
  },
  links: {
    display: 'flex' as const,
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  wallet: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '0.5rem',
  },
  address: {
    marginRight: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Navbar;
