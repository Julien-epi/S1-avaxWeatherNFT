import { useWriteContract } from 'wagmi';
import abi from '@/app/utils/abi.json';
import { contractAddress } from '@/app/utils/address';

export function useMintWeatherNFT() {
  const { writeContract, error, isPending, isSuccess } = useWriteContract();

  async function mintNFT() {
    await writeContract({
      abi,
      address: contractAddress,
      functionName: 'mintWeatherNFT',
      args: [],
    });
  }

  return {
    mintNFT,
    error,
    isPending,
    isSuccess,
  };
}
