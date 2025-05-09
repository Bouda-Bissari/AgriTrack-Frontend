"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/configs/axios";
import toast from "react-hot-toast";
import LocationPickerMap from "@/components/LocationPickerMap";
import { useUserStore } from "@/hooks/useUserStore";

interface LandData {
  id: string;
  user_id: string;
  name: string;
  city: string;
  cultureType: string;
  statut: string;
  area: number;
  latitude: number;
  longitude: number;
  soil_type: string;
  ownershipdoc?: string;
}

interface FormData {
  user_id?: number;
  name: string;
  city: string;
  cultureType: string;
  statut: string;
  area: number;
  latitude: number;
  longitude: number;
  soil_type: string;
  ownershipdoc: File | null;
}

export default function UpdateLandPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams() as { id: string };
  const user = useUserStore((state) => state.user);

  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);
  const [formData, setFormData] = useState<FormData>({
    user_id: user?.id,
    name: "",
    city: "",
    cultureType: "",
    statut: "En culture",
    area: 0,
    latitude: 5.0,
    longitude: 2.3,
    soil_type: "",
    ownershipdoc: null,
  });

  // Fetch land data
  const {
    data: landData,
    isLoading,
    isError,
    error,
  } = useQuery<LandData>({
    queryKey: ["land", id],
    queryFn: () => apiClient.get(`/lands/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });

  if (error)
    return <div className="text-red-500">Erreur de chargement du terrain</div>;

  useEffect(() => {
    if (isError) {
      toast.error("Erreur de chargement du terrain");
      router.push("dashboard/landowner/parcelle");
    }
  }, [isError, router]);

  // Update form data when land data is loaded
  useEffect(() => {
    if (landData) {
      setFormData({
        user_id: user?.id,
        name: landData.name,
        city: landData.city,
        cultureType: landData.cultureType,
        statut: landData.statut,
        area: landData.area,
        latitude: landData.latitude,
        longitude: landData.longitude,
        soil_type: landData.soil_type,
        ownershipdoc: null,
      });

      if (landData.latitude && landData.longitude) {
        setCurrentPosition([landData.latitude, landData.longitude]);
      }
    }
  }, [landData, user?.id]);

  // Geolocation
  useEffect(() => {
    if (navigator.geolocation && !landData?.latitude) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
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
  }, [landData]);

  // Mutation pour la mise à jour
  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });
      const rep = await apiClient.post(`/lands/${id}`, formData);
      console.log("FormData:", formData);
      console.log("Response:", rep.data);
      return rep;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["land", id] });
      toast.success("Terrain mis à jour avec succès !");
      //   router.push("/dashboard/landowner/parcelle");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // console.log("handleChange", e.target.name, e.target.value);
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? target.files?.[0] || null : value,
    }));

    console.log("Updated formData:", {
      ...formData,
      [name]: type === "file" ? target.files?.[0] || null : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["name", "city", "cultureType", "statut", "area"];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast.error(`Le champ "${field}" est requis.`);
        return;
      }
    }

    await updateMutation.mutateAsync(formData);
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5 sm:text-sm";
  const labelClass =
    "block text-sm font-medium text-zinc-900 dark:text-white mb-1";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full w-full">
      {/* Carte */}
      <div className="h-full w-full flex-2">
        <LocationPickerMap
          initialPosition={currentPosition || [6.1319, 1.2228]}
          onLocationChange={(lat, lng) => {
            setFormData((prev) => ({
              ...prev,
              latitude: lat,
              longitude: lng,
            }));
          }}
        />
      </div>

      {/* Formulaire */}
      <div className="overflow-auto flex-1 p-6 bg-sidebar-accent rounded-lg">
        <h1 className="text-2xl font-bold mb-2 text-zinc-800 dark:text-white font-poetsen">
          Modifier le terrain
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          {/* Champs du formulaire */}
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
              value={formData.cultureType}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="statut" className={labelClass}>
              Statut *
            </label>
            <select
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="en_culture">En culture</option>
              <option value="récolte">Récolte</option>
              <option value="jachère">Jachère</option>
            </select>
          </div>

          <div>
            <label htmlFor="area" className={labelClass}>
              Surface (ha) *
            </label>
            <input
              type="number"
              id="area"
              name="area"
              step="0.01"
              value={formData.area}
              onChange={handleChange}
              className={inputClass}
              required
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
          </div>

          <div>
            <label htmlFor="soil_type" className={labelClass}>
              Type de sol
            </label>
            <input
              id="soil_type"
              name="soil_type"
              value={formData.soil_type}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
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
            {landData?.ownershipdoc && (
              <p className="text-sm text-zinc-500 mt-1">
                Document actuel : {landData.ownershipdoc}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="self-end rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-medium text-white"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Enregistrement..." : "Mettre à jour"}
          </button>
        </form>
      </div>
    </div>
  );
}
