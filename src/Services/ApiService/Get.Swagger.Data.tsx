import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../Api';

export interface UseSwaggerDataProps<TResponse> {
  url: string;
  params?: Record<string, unknown>;
  queryKey?: string | unknown[];
  enabled?: boolean;
}

async function fetchSwaggerData<TResponse>(
  url: string,
  params?: Record<string, unknown>
): Promise<TResponse> {
  const response = await api.get<TResponse>(url, { params });

  if (response.status === 200 && response.data !== undefined) {
    return response.data;
  }

  throw new Error('Failed to fetch data');
}

function useSwaggerData<TResponse>({
  url,
  params,
  queryKey,
  enabled = true
}: UseSwaggerDataProps<TResponse>): UseQueryResult<TResponse, Error> {
  const queryKeyFinal = queryKey || [url, params];

  return useQuery<TResponse, Error>({
    queryKey: queryKeyFinal,
    queryFn: () => fetchSwaggerData<TResponse>(url, params),
    enabled
  });
}

export default useSwaggerData;
