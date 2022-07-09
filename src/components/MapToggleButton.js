import mapIcon from '../images/map.png';
import compassIcon from '../images/compass.svg';

export default function MapToggleButton({ onClick, isCurrentlyMap }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#fff] drop-shadow-md shadow-black w-10 h-10 p-2 fixed right-8 bottom-8 rounded-md cursor-pointer"
    >
      <img src={isCurrentlyMap ? compassIcon : mapIcon} alt={isCurrentlyMap ? 'Compass icon' : 'Map icon'} />
    </div>
  );
}
