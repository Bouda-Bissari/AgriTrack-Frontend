"use client";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  initialPosition: [number, number];
  onLocationChange: (lat: number, lng: number) => void;
};

const LocationMarker = ({
  initialPosition,
  onLocationChange,
}: {
  initialPosition: [number, number];
  onLocationChange: (lat: number, lng: number) => void;
}) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition);

  useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>Position sélectionnée</Popup>
    </Marker>
  );
};

const LocationPickerMap = ({ initialPosition, onLocationChange }: Props) => {
  return (
    <MapContainer center={initialPosition} zoom={10} className="h-full w-full rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker initialPosition={initialPosition} onLocationChange={onLocationChange} />
    </MapContainer>
  );
};

export default LocationPickerMap;
