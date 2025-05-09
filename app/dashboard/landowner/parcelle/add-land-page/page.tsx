"use client";
import { useEffect, useState } from "react";
import apiClient from "@/configs/axios";
import toast from "react-hot-toast";
import LocationPickerMap from "@/components/LocationPickerMap";
import { useUserStore } from "@/hooks/useUserStore";

export default function AddLandPage() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);

  console.log("User:", user);
  console.log("Token:", token);
  const [formData, setFormData] = useState({
    user_id: user?.id,
    name: "",
    city: "",
    cultureType: "",
    statut: "En culture",
    area: 0,
    latitude: "",
    longitude: "",
    // irrigation_system: false,
    ownershipdoc: null,
    // description: "",
  });

  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setFormData((prev) => ({
            ...prev,
            latitude: location.coords.latitude.toString(),
            longitude: location.coords.longitude.toString(),
          }));
          setCurrentPosition([
            location.coords.latitude,
            location.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation rapide
    const requiredFields = [
      "user_id",
      "name",
      "city",
      "cultureType",
      "statut",
      "area",
      "latitude",
      "longitude",
      "ownershipdoc",
    ];

    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData];
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "string" && value.trim() === "")
      ) {
        toast.error(`Le champ "${field}" est requis.`);
        return;
      }
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(
          key,
          typeof value === "boolean" || typeof value === "number"
            ? value.toString()
            : value
        );
      }
    });

    await toast.promise(
      apiClient.post("/lands", data),
      {
        loading: "Ajout du terrain en cours...",
        success: () => {
          // Réinitialisation
          setFormData({
            user_id: user?.id,
            name: "",
            city: "",
            cultureType: "",
            statut: "En culture",
            area: 0,
            latitude: "",
            longitude: "",
            ownershipdoc: null,
          });
          return "Terrain ajouté avec succès !";
        },
        error: (error) => {
          console.error("Erreur lors de l'envoi :", error);
          return (
            error.response?.data?.message ||
            "Erreur lors de l'ajout du terrain."
          );
        },
      },
      {
        success: { duration: 2000, icon: "🌱" },
        error: { duration: 4000 },
        style: { minWidth: "300px" },
      }
    );
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5 sm:text-sm";
  const labelClass =
    "block text-sm font-medium text-zinc-900 dark:text-white mb-1";

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full w-full">
      {/* 🗺️ Map Section */}
      <div className="h-full w-full flex-2">
        <LocationPickerMap
          initialPosition={currentPosition || [6.1319, 1.2228]}
          onLocationChange={(lat, lng) => {
            setFormData((prev) => ({
              ...prev,
              latitude: lat.toString(),
              longitude: lng.toString(),
            }));
          }}
        />
      </div>

      {/* 📝 Form Section */}
      <div className="overflow-auto flex-1 p-6 bg-sidebar-accent rounded-lg">
        <h1 className="text-2xl font-bold mb-2 text-zinc-800 dark:text-white font-poetsen">
          Ajouter un terrain
        </h1>
        <p className="text-sm text-zinc-500 mb-3">
          Remplissez les informations du terrain.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          {/* Champs requis */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Nom *
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              Ville *
            </label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="cultureType" className={labelClass}>
              Type de culture *
            </label>
            <input
              id="cultureType"
              name="cultureType"
              placeholder="Ex: Maïs, Blé, etc."
              type="text"
              value={formData.cultureType}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="statut" className={labelClass}>
              Statut du terrain *
            </label>
            <select
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="En culture">En culture</option>
              <option value="Récolte">Récolte</option>
              <option value="En jachère">Jachère</option>
            </select>
          </div>

          {/* Champs optionnels */}
          <div>
            <label htmlFor="area" className={labelClass}>
              Surface (ha)
            </label>
            <input
              type="number"
              id="area"
              name="area"
              placeholder="Ex: 1.5"
              step="any"
              value={formData.area}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className={labelClass}>
                Latitude
              </label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="longitude" className={labelClass}>
                Longitude
              </label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div> */}

          {/* <div>
            <label htmlFor="soil_type" className={labelClass}>
              Type de sol
            </label>
            <input
              id="soil_type"
              name="soil_type"
              placeholder="Ex: Argileux, Sableux, etc."
              value={formData.soil_type}
              onChange={handleChange}
              className={inputClass}
            />
          </div> */}

          {/* <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="irrigation_system"
              name="irrigation_system"
              checked={formData.irrigation_system}
              onChange={handleChange}
            />
            <label
              htmlFor="irrigation_system"
              className="text-sm text-zinc-900 dark:text-white"
            >
              Système d’irrigation
            </label>
          </div> */}

          <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 mb-4">
            <label htmlFor="ownershipdoc" className={labelClass}>
              Document de propriété (PDF)
            </label>
            <input
              type="file"
              id="ownershipdoc"
              name="ownershipdoc"
              onChange={handleChange}
              accept=".pdf"
              className="text-sm text-zinc-900 dark:text-white"
            />
          </div>

          {/* <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} h-24 resize-none`}
            />
          </div> */}

          <button
            type="submit"
            className="self-end rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-medium text-white"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
