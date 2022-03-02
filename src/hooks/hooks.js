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
  // const data  = await res.json();
  // return data;
};
export const useFetchAll = () => {
  return useQuery(['fetchAll'], fetchAll);
};
