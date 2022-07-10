import { ReactComponent as CompassSVG } from '../images/compass.svg';

export default function Compass({ angle, style, className }) {
  const { bearing, errorMessage } = useCompass();
  const displacement = errorMessage ? 0 : angle + bearing;

  const angleStyle = {
    transform: `rotate(${angle}deg)`,
    transition: '0.2s ease-in-out',
  };

  return (
    <div className={className} style={{ ...style, ...angleStyle }}>
      <CompassSVG />
    </div>
  );
}
