import greenBlob from '../images/green-blob.svg';
import pinkBlob from '../images/pink-blob.svg';

export default function IOSPage({ changeView }) {
  const onClick = async () => {
    await DeviceOrientationEvent.requestPermission();
    changeView('select');
  }

  return (
    <>
      <div className="h-full flex items-center justify-center p-8 text-center" onClick={onClick}>
        iOS 13+ requires user interaction before we can ask for access to your compass.
        <br/><br/>
        Please tap anywhere to continue :)
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
    </>
  );
}
