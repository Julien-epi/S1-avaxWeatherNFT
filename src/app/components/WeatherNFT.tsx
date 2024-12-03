'use client';

import React from 'react';
import { useTotalSupply } from '../hooks/useTotalSupply';
import { useMintWeatherNFT } from '../hooks/useMintWeatherNFT';

export default function WeatherNFTComponent() {
  const { totalSupply, isError, isLoading } = useTotalSupply();
  const { mintNFT, error, isPending, isSuccess } = useMintWeatherNFT();

  return (
    <div>
      <h2>WeatherNFT Contract</h2>

      {isLoading ? (
        <p>Chargement de la supply totale...</p>
      ) : isError ? (
        <p>Erreur lors du chargement de la supply totale.</p>
      ) : (
        <p>Supply Totale : {totalSupply}</p>
      )}

      <button onClick={mintNFT} disabled={isPending}>
        {isPending ? 'Minting...' : 'Mint un NFT'}
      </button>

      {isSuccess && <p>Mint réussi !</p>}
      {error && <p>Erreur lors du mint : {error.message}</p>}
    </div>
  );
}
