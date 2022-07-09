import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Spinner from '../components/Spinner';
import ErrorComponent from '../components/ErrorComponent';

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />;
    case Status.FAILURE:
      return <ErrorComponent />;
    case Status.SUCCESS:
      return <div> Test ( Compass Component ) </div>;
    default:
      return <ErrorComponent />;
  }
};

export default function CompassPage({ changeView }) {
  return <Wrapper apiKey={process.env.REACT_APP_API_KEY} render={render} />;
}
