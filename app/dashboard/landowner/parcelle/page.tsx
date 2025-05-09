"use client";
import LandCard from "@/components/land/LandCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import apiClient from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Parcels() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [cultureType, setCultureType] = useState("");
  const [landStatus, setLandStatus] = useState("");
  const [city, setCity] = useState("");

  const fetchLands = async (page: number) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    if (searchName) params.append("name", searchName);
    if (cultureType) params.append("culture_type", cultureType);
    if (landStatus) params.append("land_status", landStatus);
    if (city) params.append("city", city);

    const response = await apiClient.get(`/lands?${params.toString()}`);
    return response.data;
  };

  const {
    data: landsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lands", currentPage, searchName, cultureType, landStatus, city],
    queryFn: () => fetchLands(currentPage),
  });

  const handleResetFilters = () => {
    setSearchName("");
    setCultureType("");
    setLandStatus("");
    setCity("");
    setCurrentPage(1);
  };

  const lands = landsData?.data || [];
  const totalPages = landsData?.last_page || 1;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-cabinet">Liste des Parcelles</h1>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/landowner/add-land-page")}
          className="bg-white text-black hover:bg-gray-100"
        >
          Nouvelle parcelle
        </Button>
      </div>

      {/* Formulaire de recherche */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type de culture</label>
          <select
            value={cultureType}
            onChange={(e) => setCultureType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Tous</option>
            <option value="Céréales">Céréales</option>
            <option value="Légumes">Légumes</option>
            <option value="Fruits">Fruits</option>
            {/* Ajoutez d'autres options selon vos besoins */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Statut</label>
          <select
            value={landStatus}
            onChange={(e) => setLandStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Tous</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            {/* Ajoutez d'autres options selon vos besoins */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ville</label>
          <input
            type="text"
            placeholder="Filtrer par ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="mr-2"
        >
          Réinitialiser
        </Button>
      </div>

      {/* Affichage des résultats */}
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

      {!isLoading && lands.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Aucune parcelle trouvée.
        </div>
      )}

      {!isLoading && lands.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {lands.map((land: any) => (
              <LandCard
                key={land.id}
                id={land.id}
                name={land.name}
                city={land.city}
                culture_type={land.cultureType}
                land_status={land.statut}
                onViewDetails={() =>
                  router.push(`/dashboard/landowner/parcelle/${land.id}`)
                }
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Parcels;