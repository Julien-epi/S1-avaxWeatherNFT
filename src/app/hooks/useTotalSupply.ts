import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import abi from '@/app/utils/abi.json';
import { contractAddress } from '@/app/utils/address';

export function useTotalSupply() {
  const [totalSupply, setTotalSupply] = useState<number | null>(null);

  const { data: totalSupplyData, isError, isLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'totalSupply',
  });

  useEffect(() => {
    if (!isLoading && !isError && totalSupplyData) {
      setTotalSupply(Number(totalSupplyData));
    }
  }, [totalSupplyData, isError, isLoading]);

  return {
    totalSupply,
    isError,
    isLoading,
  };
}
