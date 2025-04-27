"use client";
import LandCard from "@/components/land/LandCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import apiClient from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
function Parcels() {
  const router = useRouter();

  const fetchLands = async () => {
    const response = await apiClient.get("/lands");
    return response.data.data;
  };

  const {
    data: lands,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lands"],
    queryFn: fetchLands,
  });


  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-cabinet">Liste des Parcelles</h1>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard-landowner/add-land-page")}
          className="bg-white text-black hover:bg-gray-100"
        >
          Nouvelle parcelle
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center p-6">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm">
          Erreur lors du chargement des parcelles.
        </div>
      )}

      {!isLoading && lands && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {lands.map((land: any) => (
            <LandCard
              key={land.id}
              id={land.id}
              name={land.name}
              city={land.city}
              culture_type={land.cultureType}
              land_status={land.statut}
              onViewDetails={() => router.push(`/dashboard-landowner/parcelle/${land.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Parcels;
