import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import abi from '@/app/utils/abi.json';
import { contractAddress } from '@/app/utils/address';

interface WeatherData {
  temperature: bigint;
  humidity: bigint;
  windSpeed: bigint;
  weatherImage: string;
  timestamp: bigint;
}

export function useWeatherHistory(tokenId: number) {
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);
  const { data, isError, isLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getWeatherHistory',
    args: [tokenId],
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      if (Array.isArray(data)) {
        setWeatherHistory(data as WeatherData[]);
      } else {
        console.error('Les données reçues ne sont pas un tableau.', data);
      }
    }
  }, [data, isError, isLoading]);

  return {
    weatherHistory,
    isError,
    isLoading,
  };
}
