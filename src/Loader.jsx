import { useFetchAll } from './hooks';
import PlotlyComponent from './components/PlotlyComponent';

const Loader = () => {
  const { data, isLoading, isError, error } = useFetchAll();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {data && <PlotlyComponent {...data} />}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};
export default Loader;
