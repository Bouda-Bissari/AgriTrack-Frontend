"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Leaf,
  Droplets,
  Ruler,
  FileText,
  ArrowLeft,
  CalendarDays,
  Wheat,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

const customIcon = new L.Icon({
  iconUrl: "/images/image.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function LandDetails() {
  const position: [number, number] = [43.2965, 5.3698];
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

  return (
    <div className="w-full h-screen flex flex-row-reverse gap-x-3 ">
      <div className="w-1/2 h-full rounded-lg flex flex-col">
        <MapContainer
          center={position}
          zoom={13}
          className="w-full h-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>Ferme du Soleil - Localisation</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="w-1/2 flex flex-col justify-center gap-y-4">
        <Card className="p-6 shadow-lg bg-white rounded-lg overflow-auto">
          <CardHeader className=" border-b pb-4">
            <Link href="/" className="flex gap-x-2 ">
              {" "}
              <ArrowLeft className="text-gray-500 font-thin" /> retour{" "}
            </Link>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-semibold text-gray-800 font-poetsen">
                Ferme du Soleil
              </CardTitle>
              <p className="text-sm text-gray-500">Propriétaire: Jean Dupont</p>
            </div>
            <Badge
              variant="outline"
              className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"
            >
              En culture
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Marseille, France</span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Culture: Blé</span>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Irrigation: Oui</span>
            </div>
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">
                Superficie: 12 hectares
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Type de sol: Argileux</span>
            </div>
          </CardContent>
        </Card>
        <div className="bg-earth-700 w-full rounded-xl p-4">
          <h1 className="text-center text-3xl font-bold font-poetsen text-white bg-black p-4 rounded-lg mb-3">
            Les Interventions recentes
          </h1>
          <div className="space-y-3">
            {interventions.map((intervention, index) => (
              <div
                key={index}
                className="flex items-center bg-earth-400 p-3 rounded-lg shadow"
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
  );
}
