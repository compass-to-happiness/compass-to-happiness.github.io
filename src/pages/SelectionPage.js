import { useCallback } from 'react';

import iceCreamImage from '../images/ice-cream.png';
import burgerImage from '../images/burger.png';
import pizzaImage from '../images/pizza.png';
import friedChickenImage from '../images/fried-chicken.png';
import alcoholImage from '../images/beer.png';
import coffeeImage from '../images/coffee.png';
import greenBlob from '../images/green-blob.svg';
import pinkBlob from '../images/pink-blob.svg';

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
    <div className="w-full h-screen p-5 flex flex-col items-center gap-14">
      <div className="text-center flex flex-col gap-6 items-center">
        <h3>Compass to Happiness</h3>
        <h1 className="text-5xl font-bold w-4/6 ">What are you feeling?</h1>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {buttons.map((s) => selectionButton({ ...s, setSelectedLocation: gotoSelectedLocation(s.name) }))}
      </div>
      <img
        src={greenBlob}
        className="fixed -z-10 max-w-md"
        style={{ top: '-150px', right: '-150px', transform: 'rotate(150deg)' }}
        alt="Green Blob"
      />
      <img
        src={pinkBlob}
        className="fixed -z-10 max-w-xl"
        style={{ bottom: '-350px', left: '-200px', transform: 'rotate(168deg)' }}
        alt="Green Blob"
      />
    </div>
  );
}

const selectionButton = ({ name, image, setSelectedLocation }) => (
  <button
    key={name}
    className="grid w-40 h-40 rounded-lg drop-shadow-xl justify-center content-center"
    onClick={() => setSelectedLocation(name)}
    style={{ backgroundColor: 'white' }}
  >
    <img src={image} className="w-28 h-28 object-contain" alt={name} />
  </button>
);
