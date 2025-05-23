import { useEffect, useState, useCallback } from 'react';
import api from '../Api';

export interface UseNormalFetchProps<TResponse> {
  url: string;
  params?: Record<string, unknown>;
  enabled?: boolean;
}

export interface UseNormalFetchResult<TResponse> {
  data: TResponse | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

function useNormalFetch<TResponse>({
  url,
  params,
  enabled = true
}: UseNormalFetchProps<TResponse>): UseNormalFetchResult<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await api.get<TResponse>(url, { params });

      if (response.status === 200 && response.data !== undefined) {
        setData(response.data);
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err: any) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [url, JSON.stringify(params), enabled, reloadKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => setReloadKey((prev) => prev + 1);

  return { data, isLoading, isError, error, refetch };
}

export default useNormalFetch;
