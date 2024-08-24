import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import startCoordinateIcon from '../../assets/icons/End_Coordinate.png';
import endCoordinateIcon from '../../assets/icons/Start_Coordinate.png';
import AnimatedMarker from '../AnimatedMaker/AnimatedMaker';

import './mapComponent.css'


const icons = [
  new L.Icon({
    iconUrl: endCoordinateIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, 17],
  }),
  new L.Icon({
    iconUrl: startCoordinateIcon,
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, 17],
  }),
];


const MapViewAdjuster = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};


const MapComponent = () => {
  
  const [speed, setSpeed] = useState(20);
  const [fps, setFPS] = useState(2); 
  const [start, setStart] = useState({ co_ordinate: [22.1696, 91.4996]});
  const [end, setEnd] = useState({ co_ordinate: [22.2637, 91.7159]});

  const coordinates = [
    { position: start.co_ordinate, popupText: 'Start' },
    { position: end.co_ordinate, popupText: 'Destination' },
  ];
  
  const bounds = coordinates.map((coordinate) => coordinate.position);
  const refreshRate = 1000 / fps;

  return (
    <MapContainer className='mapContainer'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={coordinate.position} icon={icons[index]}>
          <Popup className='popUpText'>{coordinate.popupText}</Popup>
        </Marker>
      ))}

      <MapViewAdjuster bounds={bounds} />
      <AnimatedMarker start={start} end={end} speed={speed} refreshRate={refreshRate}/>
    </MapContainer>
  );
};

export default MapComponent;
