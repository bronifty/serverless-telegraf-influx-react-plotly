import { useQuery } from 'react-query';

export const fetchAll = async () => {
  const res = await fetch('/api/query', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  const data = await res.json();
  console.log({ data });
  return data;
};
export const useFetchAll = () => {
  return useQuery(['fetchAll'], fetchAll);
};
