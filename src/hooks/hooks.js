import { useQuery } from 'react-query';

export const fetchAll = async () => {
  return fetch('/api/query', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
export const useFetchAll = () => {
  return useQuery(['fetchAll'], fetchAll, {
    // refetchOnWindowFocus: true,
    // staleTime: 10000,
    // cacheTime: 1000,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  });
};
