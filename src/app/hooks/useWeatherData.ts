import { useState, useEffect, useCallback } from 'react';
import { useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi';
import abi from '@/app/utils/abi.json';
import { contractAddress } from '@/app/utils/address';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherImage: string;
  timestamp: number;
}

export function useWeatherData(tokenId: number) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { data, error, isLoading: isReading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getWeatherHistory',
    args: [tokenId],
  });

  const { writeContract, isPending, isSuccess, error: updateError } = useWriteContract();

  const reloadWeatherData = useCallback(() => {
    if (!isReading && !error && data) {
      try {
        const weatherHistory = data as WeatherData[];
        if (weatherHistory.length > 0) {
          const latestData = weatherHistory[weatherHistory.length - 1];
          setWeatherData({
            temperature: Number(latestData.temperature),
            humidity: Number(latestData.humidity),
            windSpeed: Number(latestData.windSpeed),
            weatherImage: latestData.weatherImage,
            timestamp: Number(latestData.timestamp),
          });
        }
      } catch (e) {
        console.error('Erreur lors du traitement des données météo:', e);
        setIsError(true);
      }
    } else if (error) {
      setIsError(true);
    }

    setIsLoading(isReading);
  }, [data, error, isReading]);

  useEffect(() => {
    reloadWeatherData();
  }, [reloadWeatherData]);

  useWatchContractEvent({
    abi,
    address: contractAddress,
    eventName: 'WeatherNFTUpdated',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
    onError: (error) => {
      console.error('Erreur lors de l’écoute de l’événement:', error);
    },
  });

  const updateWeatherData = async () => {
    try {
      await writeContract({
        abi,
        address: contractAddress,
        functionName: 'updateWeatherData',
        args: [tokenId],
      });
    } catch (e) {
      console.error('Erreur lors de la mise à jour des données météo:', e);
    }
  };

  return {
    weatherData,
    isLoading,
    isError,
    updateWeatherData,
    reloadWeatherData,
    isUpdating: isPending,
    updateSuccess: isSuccess,
    updateError,
  };
}
