import { useWriteContract } from 'wagmi';
import abi from '@/app/utils/abi.json';
import { contractAddress } from '@/app/utils/address';

export function useUpdateWeatherData() {
  const { writeContract, error, isPending, isSuccess } = useWriteContract();

  async function updateWeatherData(tokenId: number) {
    await writeContract({
      abi,
      address: contractAddress,
      functionName: 'updateWeatherData',
      args: [tokenId],
    });
  }

  return {
    updateWeatherData,
    error,
    isPending,
    isSuccess,
  };
}
