"use client";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import apiClient from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: "/image.png",
//   iconRetinaUrl: "/marker-icon-2x.png",
//   shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Land {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  surface: number;
  city: string;
  cultureType: string;
}

export default function MapPage() {
  const router = useRouter();
  const [mapCenter, setMapCenter] = useState<[number, number]>([8.6195, 0.8248]); // Lomé, Togo
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const fetchLands = async () => {
    const response = await apiClient.get("/lands");
    console.log("Lands data:", response.data.data); // Log the lands data
    return response.data.data;
  };

  const { data: lands, isLoading, error } = useQuery<Land[]>({
    queryKey: ["lands"],
    queryFn: fetchLands,
  });

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  useEffect(() => {
    // Set initial map center based on first land if available
    if (lands && lands.length > 0) {
      setMapCenter([lands[0].latitude, lands[0].longitude]);
    }
  }, [lands]);

  if (typeof window === "undefined") {
    return null; // Don't render on server
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Localisation des Parcelles</h1>
        <div className="flex gap-2">
          <Button onClick={getUserLocation} variant="outline">
            Centrer sur ma position
          </Button>
          <Button onClick={() => router.push("/dashboard/landowner/parcels")}>
            Liste des parcelles
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <p>Chargement des données...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center p-4">
          Erreur lors du chargement des parcelles
        </div>
      )}

      {!isLoading && lands && (
        <div className="relative h-[calc(100vh-150px)] rounded-lg overflow-hidden border">
          <MapContainer
            center={mapCenter}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {userLocation && (
              <Marker position={userLocation}>
                <Popup>Votre position actuelle</Popup>
              </Marker>
            )}

            {lands.map((land) => (
              <Marker
                key={land.id}
                position={[land.latitude, land.longitude]}
                eventHandlers={{
                  click: () => {
                    router.push(`/dashboard/landowner/parcelle/${land.id}`);
                  },
                }}
              >
                <Popup>
                  <div className="space-y-1">
                    <h3 className="font-bold">{land.name}</h3>
                    <p>Surface: {land.surface} ha</p>
                    <p>Ville: {land.city}</p>
                    <p>Culture: {land.cultureType}</p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        router.push(`/dashboard/landowner/parcelle/${land.id}`)
                      }
                    >
                      Voir détails
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}