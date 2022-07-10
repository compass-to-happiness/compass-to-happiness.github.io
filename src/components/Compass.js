import { ReactComponent as CompassSVG } from '../images/compass.svg';
import { useCompass } from '../context/CompassContext';
import { useState } from 'react';

export default function Compass({ angle, style, className }) {
  const { bearing, errorMessage } = useCompass();
  const [numFullRotations, setNumFullRotations] = useState(0);
  const [lastDisplacement, setLastDisplacement] = useState();

  let displacement = 0;
  if (!errorMessage) {
    displacement = angle - bearing;
    if (displacement < 0) {
      displacement += 360;
    }
    displacement = Math.round(displacement * 100) / 100;
  }

  // Check if passing through 0 degrees.
  if (lastDisplacement > 330 && displacement < 30) {
    setNumFullRotations(numFullRotations + 1);
  } else if (lastDisplacement < 30 && displacement > 330) {
    setNumFullRotations(numFullRotations - 1);
  }

  if (displacement !== lastDisplacement) {
    setLastDisplacement(displacement);
  }

  const rotation = numFullRotations * 360 + displacement;
  const angleStyle = {
    transform: `rotate(${Math.round(rotation)}deg)`,
    transition: '0.2s ease-in-out',
  };

  return (
    <div className={className} style={{ ...style, ...angleStyle }}>
      <CompassSVG />
    </div>
  );
}
