'use client';

import React from 'react';
import { useUserNFTs } from '../hooks/useUserNFTs';
import WeatherDataCard from './WeatherDataCard';

export default function UserNFTs() {
  const { nfts, isLoading, isError } = useUserNFTs();

  if (isLoading) {
    return <p>Chargement des NFTs...</p>;
  }

  if (isError) {
    return <p>Erreur lors du chargement des NFTs.</p>;
  }

  if (nfts.length === 0) {
    return <p>Vous ne possédez aucun NFT.</p>;
  }

  return (
    <div>
      <h2>Vos NFTs</h2>
      {nfts.map((nft) => (
        <WeatherDataCard key={nft.tokenId} tokenId={nft.tokenId} />
      ))}
    </div>
  );
}
