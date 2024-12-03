'use client';

import React from 'react';

interface NFTCardProps {
  nft: {
    tokenId: number;
    weatherData: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      weatherImage: string;
      timestamp: number;
    };
  };
}

export default function NFTCard({ nft }: NFTCardProps) {
  const { tokenId, weatherData } = nft;

  return (
    <div style={styles.card}>
      <h3>NFT #{tokenId}</h3>
      <img src={weatherData.weatherImage} alt={`Weather condition for NFT ${tokenId}`} style={styles.image} />
      <p>Température : {weatherData.temperature}°C</p>
      <p>Humidité : {weatherData.humidity}%</p>
      <p>Vitesse du vent : {weatherData.windSpeed} km/h</p>
      <p>Date : {new Date(weatherData.timestamp * 1000).toLocaleString()}</p>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    color: '#000', 
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
};
