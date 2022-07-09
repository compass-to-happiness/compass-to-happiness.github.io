import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Spinner from '../components/Spinner';
import Error from '../components/Error';

const render = (status, changeView) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />;
    case Status.FAILURE:
      return <Error />;
    case Status.SUCCESS:
      return <div> Test ( Compass Component ) </div>;
    default:
      return <Error />;
  }
};

export default function CompassPage({ changeView }) {
  return (
    <div className="w-full h-screen p-5 flex flex-col items-center gap-10">
      <h3>Compass to Happiness</h3>
      <button className="rounded-2xl border-2 pt-3.5 pb-4 px-10"> &lt;- Something Different</button>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={(status) => render(status, changeView)} />
    </div>
  );
}
