import { useCallback } from 'react';

import iceCreamImage from '../images/ice-cream.png';
import burgerImage from '../images/burger.png';
import pizzaImage from '../images/pizza.png';
import friedChickenImage from '../images/fried-chicken.png';
import alcoholImage from '../images/beer.png';
import coffeeImage from '../images/coffee.png';

export default function SelectionPage({ changeView, setSelectedLocation }) {
  const gotoSelectedLocation = useCallback(
    (name) => () => {
      setSelectedLocation(name);
      changeView('compass');
    },
    [setSelectedLocation, changeView],
  );
  const buttons = [
    {
      name: 'ice-cream',
      image: iceCreamImage,
    },
    {
      name: 'burger',
      image: burgerImage,
    },
    {
      name: 'pizza',
      image: pizzaImage,
    },
    {
      name: 'fried-chicken',
      image: friedChickenImage,
    },
    {
      name: 'alcohol',
      image: alcoholImage,
    },
    {
      name: 'coffee',
      image: coffeeImage,
    },
  ];

  return (
    <div className={'w-full h-screen p-5 flex flex-col items-center gap-10'}>
      <div className={'text-center flex flex-col gap-10'}>
        <h3>Compass to Happiness</h3>
        <h1 className={'text-5xl'}>What are you feeling?</h1>
      </div>
      <div className={'flex-grow flex items-center'}>
        <div className={'flex flex-wrap gap-5 justify-center'}>
          {buttons.map((s) => selectionButton({ ...s, setSelectedLocation: gotoSelectedLocation(s.name) }))}
        </div>
      </div>
    </div>
  );
}

const selectionButton = ({ name, image, setSelectedLocation }) => (
  <button
    key={name}
    className={
      'flex button w-40 h-40 radius-lg border-2 drop-shadow-sm drop-shadow-md grid justify-center content-center'
    }
    onClick={() => setSelectedLocation(name)}
  >
    <img src={image} className={'w-28 h-28 object-contain'} alt={name} />
  </button>
);
