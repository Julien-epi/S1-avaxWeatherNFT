'use client';

import React from 'react';
import { useWeatherData } from '../hooks/useWeatherData';

interface WeatherDataCardProps {
  tokenId: number;
}

export default function WeatherDataCard({ tokenId }: WeatherDataCardProps) {
  const {
    weatherData,
    isLoading,
    isError,
    updateWeatherData,
    isUpdating,
    updateSuccess,
    updateError,
  } = useWeatherData(tokenId);

  if (isLoading) {
    return <p>Chargement des données météo...</p>;
  }

  if (isError) {
    return <p>Erreur lors du chargement des données météo.</p>;
  }

  return (
    <div style={styles.card}>
      <h3>Données météo pour le NFT #{tokenId}</h3>
      {weatherData && (
        <>
          <img
            src={weatherData.weatherImage}
            alt="Condition météorologique"
            style={styles.image}
          />
          <p>Température : {weatherData.temperature}°C</p>
          <p>Humidité : {weatherData.humidity}%</p>
          <p>Vitesse du vent : {weatherData.windSpeed} km/h</p>
          <p>Dernière mise à jour : {new Date(weatherData.timestamp * 1000).toLocaleString()}</p>
        </>
      )}
      <button
        onClick={updateWeatherData}
        disabled={isUpdating}
        style={styles.button}
      >
        {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
      </button>
      {updateSuccess && <p style={styles.success}>Données mises à jour avec succès !</p>}
      {updateError && <p style={styles.error}>Erreur lors de la mise à jour.</p>}
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
    marginBottom: '1rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    marginTop: '1rem',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
};
