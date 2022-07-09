import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import Compass from '../components/Compass';
import mapIcon from '../images/map.png';

const render = (status, changeView) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />;
    case Status.FAILURE:
      return <Error />;
    case Status.SUCCESS:
      return;
    default:
      return <Error />;
  }
};

export default function CompassPage({ changeView }) {
  return (
    <div className="w-full h-screen p-5 flex flex-col items-center gap-10">
      <div className="h-1/6">
        <h3 className="font-bold text-base text-center mb-12">Compass to Happiness</h3>
        <button
          onClick={() => changeView('select')}
          className="rounded-2xl border-2 pt-3.5 pb-4 px-10 text-base font-semibold"
        >
          {' '}
          &lt;- Something Different
        </button>
      </div>
      <div className="h-1/2">
        <Compass angle={30} className={'w-40 h-40'} />
      </div>

      <div className="h-1/3">
        <h2 className="font-bold text-5xl text-center mb-4">246m Away</h2>
        <h3 className="font-bold text-base text-center">Gelatimmo</h3>
        <img className="w-24 h-24 rounded-2xl bg-white p-3" src={mapIcon} alt="Map icon" />
      </div>
      <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={(status) => render(status, changeView)} />
    </div>
  );
}
