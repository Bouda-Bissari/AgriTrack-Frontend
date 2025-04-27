"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/hooks/useUserStore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Droplets,
  Leaf,
  MapPin,
  Ruler,
  FileText,
  CalendarDays,
  ArrowLeft,
  Wheat,
  Sprout,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/configs/axios";
import LocationPickerMap from "@/components/LocationPickerMap";
import { Button } from "@/components/ui/button";

const customIcon = new L.Icon({
  iconUrl: "/images/image.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function LandDetails() {
  const user = useUserStore((state) => state.user);
  const params = useParams();
  const landId = params?.id as string;
  const router = useRouter();

  const {
    data: land,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["land", landId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/lands/${landId}`);
      return data.data;
    },
  });

  const interventions = [
    {
      type: "Irrigation",
      parcelle: "Parcelle A",
      date: "2025-03-30",
      icon: <Droplets className="text-blue-500" />,
    },
    {
      type: "Fertilisation",
      parcelle: "Parcelle B",
      date: "2025-03-28",
      icon: <Leaf className="text-green-500" />,
    },
    {
      type: "Semis",
      parcelle: "Parcelle C",
      date: "2025-03-25",
      icon: <Sprout className="text-yellow-500" />,
    },
    {
      type: "Récolte",
      parcelle: "Parcelle D",
      date: "2025-03-20",
      icon: <Wheat className="text-orange-500" />,
    },
  ];

  const handleUpdateLand = (id:number) => {
    router.push(`/dashboard-landowner/parcelle/update/${id}`);

  }
  if (isLoading) return <p>Chargement...</p>;
  if (isError || !land) return <p>Erreur lors du chargement du terrain.</p>;

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 ">
      <div className="w-full h-full flex flex-col md:flex-row ">
        <div className="w-full gap-4   flex flex-col md:flex-row justify-center gap-y-2">
          <Card className=" w-full p-6 shadow-lg bg-white rounded-lg overflow-auto">
            <CardHeader className="border-b pb-4">
              {/* <Link href="/" className="flex gap-x-2">
                <ArrowLeft className="text-gray-500 font-thin" /> retour
              </Link> */}
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-semibold text-gray-800 font-poetsen">
                  {land.name}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Propriétaire: {user?.firstName}
                </p>
                <Button
                  effect="expandIcon"
                  icon={ArrowRightIcon}
                  iconPlacement="right"
                  variant={"outline"}
                  className="font-poetsen"
                  onClick={() => handleUpdateLand(land.id)}
                >
                  Modifier
                </Button>{" "}
              </div>
              <Badge
                variant="outline"
                className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"
              >
                {land.statut}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium">{land.city}</span>
              </div>
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">
                  Culture: {land.cultureType}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Irrigation: Oui</span>
              </div>
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium">
                  Superficie: {land.area} hectares
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium">
                  Type de sol: Argileux
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="w-full  bg-sidebar-accent  rounded-xl p-4">
            <h1 className="text-center text-3xl font-bold font-poetsen text-white bg-sidebar-foreground p-4 rounded-lg mb-3">
              Les Interventions associées
            </h1>
            <div className="space-y-3">
              {interventions.map((intervention, index) => (
                <div
                  key={index}
                  className="flex items-center bg-sidebar-accent p-3 rounded-lg shadow"
                >
                  <div className="p-2 bg-gray-200 rounded-full">
                    {intervention.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{intervention.type}</h3>
                    <p className="text-gray-500 text-sm">
                      🌱 {intervention.parcelle}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    <span className="text-sm">{intervention.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  h-full rounded-lg flex flex-col ">
        <MapContainer
          center={[land.latitude, land.longitude]}
          zoom={13}
          className="w-full h-[400px] rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[land.latitude, land.longitude]} icon={customIcon}>
            <Popup>
              {land.name} - {land.city}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
