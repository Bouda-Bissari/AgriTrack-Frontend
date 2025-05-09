"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../motion-primitives/dialog";
import { Plus } from "lucide-react";
import apiClient from "@/configs/axios";
import toast from "react-hot-toast";
import LocationPickerMap from "../LocationPickerMap";

export function LandAdd() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    culture_type: "",
    land_status: "en_culture",
    area: "",
    latitude: "",
    longitude: "",
    soil_type: "",
    irrigation_system: false,
    ownership_document: null,
    description: "",
  });

  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    if (open && !currentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.warn("Erreur de géolocalisation:", error);
          setCurrentPosition([14.7167, -17.4677]); // Dakar
        }
      );
    }
  }, [open]);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, typeof value === "boolean" ? value.toString() : value);
      }
    });

    try {
      const response = await apiClient.post("/lands", data);
      setOpen(false);
      setFormData({
        name: "",
        city: "",
        culture_type: "",
        land_status: "en_culture",
        area: "",
        latitude: "",
        longitude: "",
        soil_type: "",
        irrigation_system: false,
        ownership_document: null,
        description: "",
      });
      toast.success("creation de la pacerelle");
    } catch (error) {
      setOpen(false);
      console.error("Erreur dans l:", error);
    }
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5 sm:text-sm";
  const labelClass =
    "block text-sm font-medium text-zinc-900 dark:text-white mb-1";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-nature-600 px-4 py-2 text-sm text-white hover:bg-nature-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
        <Plus /> Ajouter un terrain
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-6  shadow-[0_4px_12px_#0000001a] backdrop:bg-nature-600/40 backdrop:backdrop-blur-xs">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white">
            Ajouter un terrain
          </DialogTitle>
          <DialogDescription className="text-zinc-600 dark:text-zinc-400">
            Fournissez les détails concernant votre terrain agricole
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4">
          {/* Required Fields */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Nom *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Nom du terrain"
              required
            />
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              Ville *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
              placeholder="Ville"
              required
            />
          </div>

          <div>
            <label htmlFor="culture_type" className={labelClass}>
              Type de culture *
            </label>
            <input
              type="text"
              id="culture_type"
              name="culture_type"
              value={formData.culture_type}
              onChange={handleChange}
              className={inputClass}
              placeholder="Type de culture"
              required
            />
          </div>

          <div>
            <label htmlFor="land_status" className={labelClass}>
              Statut du terrain *
            </label>
            <select
              id="land_status"
              name="land_status"
              value={formData.land_status}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="en_culture">En culture</option>
              <option value="recolte">Récolte</option>
              <option value="jachere">Jachère</option>
            </select>
          </div>

          {/* Optional Fields */}
          <div>
            <label htmlFor="area" className={labelClass}>
              Surface (hectares)
            </label>
            <input
              type="number"
              step="0.01"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className={inputClass}
              placeholder="Surface en hectares"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                placeholder="Latitude"
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
                placeholder="Longitude"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Emplacement sur la carte <span className="text-red-500">*</span>
            </label>
            <LocationPickerMap
              initialPosition={currentPosition || [14.7167, -17.4677]} 
              onLocationChange={(lat, lng) => {
                setFormData((prev) => ({
                  ...prev,
                  latitude: lat.toString(),
                  longitude: lng.toString(),
                }));
              }}
            />
            <p className="text-sm text-zinc-500 mt-1">
              Cliquez sur la carte pour sélectionner l’emplacement.
            </p>
          </div>

          <div>
            <label htmlFor="soil_type" className={labelClass}>
              Type de sol
            </label>
            <input
              type="text"
              id="soil_type"
              name="soil_type"
              value={formData.soil_type}
              onChange={handleChange}
              className={inputClass}
              placeholder="Type de sol"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="irrigation_system"
              name="irrigation_system"
              checked={formData.irrigation_system}
              onChange={handleChange}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-white"
            />
            <label
              htmlFor="irrigation_system"
              className="text-sm text-zinc-900 dark:text-white"
            >
              Système d'irrigation
            </label>
          </div>

          <div>
            <label htmlFor="ownership_document" className={labelClass}>
              Document de propriété (PDF)
            </label>
            <input
              type="file"
              id="ownership_document"
              name="ownership_document"
              onChange={handleChange}
              className="block w-full text-sm text-zinc-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-zinc-100 file:text-zinc-900 hover:file:bg-zinc-200 dark:text-white dark:file:bg-zinc-700 dark:file:text-white"
              accept=".pdf"
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} h-24 resize-none`}
              placeholder="Description du terrain"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center self-end rounded-lg bg-earth-600 hover:bg-earth-700 px-4 py-2 text-sm font-medium text-zinc-50 dark:bg-white dark:text-zinc-900"
          >
            Ajouter le terrain
          </button>
        </form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
