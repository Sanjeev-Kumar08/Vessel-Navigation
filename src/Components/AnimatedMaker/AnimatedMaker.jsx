import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import frame from '../../assets/icons/Frame.png';
import './AnimatedMaker.css';

const getDistance = (start, end) => {
  const R = 6371; 
  const dLat = toRadians(end.co_ordinate[0] - start.co_ordinate[0]);
  const dLng = toRadians(end.co_ordinate[1] - start.co_ordinate[1]);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(start.co_ordinate[0])) * Math.cos(toRadians(end.co_ordinate[0])) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const toRadians = (degrees) => degrees * (Math.PI / 180);

const getAngle = (start, end) => {
  const dLat = toRadians(end.co_ordinate[0] - start.co_ordinate[0]);
  const dLng = toRadians(end.co_ordinate[1] - start.co_ordinate[1]);
  const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
  return angle;
};

const AnimatedMarker = ({ start, end, speed, refreshRate }) => {
  const [position, setPosition] = useState(start.co_ordinate);
  const [rotation, setRotation] = useState(0);
  const map = useMap();

  useEffect(() => {
    if (!start || !end || speed <= 0) return;

    const startTime = Date.now();
    const distance = getDistance(start, end);

    const duration = (distance / speed) * 1000 * 3600; 

    const initialRotation = getAngle(start, end);
    setRotation(initialRotation);

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const lat = start.co_ordinate[0] + (end.co_ordinate[0] - start.co_ordinate[0]) * progress;
      const lng = start.co_ordinate[1] + (end.co_ordinate[1] - start.co_ordinate[1]) * progress;
      setPosition([lat, lng]);

      if (progress >= 1) {
        clearInterval(intervalId);
      }
    }, refreshRate);

    return () => clearInterval(intervalId);
  }, [start, end, speed, refreshRate]);

  return (
    <Marker
      position={position}
      icon={L.divIcon({
        className: 'animated-icon',
        html: `<div class="icon-wrapper" style="transform: rotate(${rotation}deg);">
                 <img src="${frame}" />
               </div>`,
        iconSize: [30, 90],
        iconAnchor: [12, 108],
        popupAnchor: [10, -30],
      })}
    >
      <Popup className='popUp'>Moving from <span className='coordinate'>{start.co_ordinate.toString()}</span> to <span className='coordinate'>{end.co_ordinate.toString()}</span></Popup>
    </Marker>
  );
};

export default AnimatedMarker;
