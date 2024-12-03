import { useEffect, useState } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import abi from '@/app/utils/abi.json';
import { contractAddress } from '@/app/utils/address';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherImage: string;
  timestamp: number;
}

export function useUserNFTs() {
  const { address } = useAccount(); 
  const [nfts, setNfts] = useState<{ tokenId: number; weatherData: WeatherData }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { data, error, isLoading: isContractLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getUserNFTs',
    args: [address],
  });

  useEffect(() => {
    if (!isContractLoading && !error && data) {
      try {
        const [tokenIds, weatherData]: [bigint[], any[]] = data as [bigint[], any[]];

        const formattedNFTs = tokenIds.map((id, index) => ({
          tokenId: Number(id),
          weatherData: {
            temperature: Number(weatherData[index].temperature),
            humidity: Number(weatherData[index].humidity),
            windSpeed: Number(weatherData[index].windSpeed),
            weatherImage: weatherData[index].weatherImage,
            timestamp: Number(weatherData[index].timestamp),
          },
        }));

        setNfts(formattedNFTs);
      } catch (e) {
        console.error('Erreur lors du traitement des données:', e);
        setIsError(true);
      }
    } else if (error) {
      console.error('Erreur du contrat:', error);
      setIsError(true);
    }

    setIsLoading(isContractLoading);
  }, [data, error, isContractLoading]);

  return {
    nfts,
    isLoading,
    isError,
  };
}
