'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import WeatherNFTComponent from './components/WeatherNFT';
import UserNFTs from './components/UserNFTs';

function App() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
        <h2>Compte</h2>

        

      {isConnected && (
        <>
          <WeatherNFTComponent />
          <UserNFTs />
        </>
      )}
    </>
  );
}

export default App;
