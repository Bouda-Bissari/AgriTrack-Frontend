"use client";

import PaginationWithIconAndLabel from "@/components/pagination-10";
import apiClient from "@/configs/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import ConfirmDialog from "@/components/alert-dialog-01";
import UpdateInterventionStatusSwitch from "@/components/switch-01";

interface Intervention {
  id: number;
  title: string;
  type: string;
  isDone: boolean;
  quantity: number;
  unit: string;
  product_name: string;
  description: string;
  land_id: number;
}

export default function InterventionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const router = useRouter();

  async function fetchInterventions(page: number) {
    const params = new URLSearchParams();

    params.append("page", page.toString());

    if (searchTitle) params.append("title", searchTitle);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const response = await apiClient.get(
      `/myinterventions/?${params.toString()}`
    );
    return response.data;
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["interventions", currentPage, searchTitle, startDate, endDate],
    queryFn: () => fetchInterventions(currentPage),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/interventions/${id}`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeleteIntervention = (id: number) => {
    deleteMutation.mutate(id);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTitle("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
    refetch();
  };

  // Debounce sur le searchTitle (300ms)
  // useEffect(() => {
  //   const debouncedRefetch = debounce(() => {
  //     refetch();
  //   }, 300);

  //   debouncedRefetch();

  //   return () => {
  //     debouncedRefetch.cancel();
  //   };
  // }, [searchTitle, startDate, endDate, currentPage]);

  const interventions: Intervention[] = Array.isArray(data?.data?.data)
    ? data.data?.data
    : [];
  const totalPages: number = data?.data?.last_page ?? 1;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-poetsen font-bold mb-6 text-zinc-800 dark:text-white">
        Liste des interventions
      </h1>

      {/* Formulaire de recherche */}
      <div className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-zinc-700">
            Titre
          </label>
          <input
            type="text"
            placeholder="Rechercher par titre..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-zinc-700">
            Date de début
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-2 w-full text-zinc-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-zinc-700">
            Date de fin
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg p-2 w-full text-zinc-500"
          />
        </div>

        <div className="flex justify-start md:justify-end">
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="w-full md:w-auto"
          >
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Affichage des interventions */}
      {isLoading ? (
        <div className="text-center py-10 text-zinc-500">Chargement...</div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">
          Erreur lors de la récupération des interventions.
        </div>
      ) : interventions.length === 0 ? (
        <div className="text-center py-10 text-zinc-500">
          Aucune intervention trouvée.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interventions.map((intervention, idx) => (
            <motion.div
              key={intervention.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() =>
                router.push(
                  `/dashboard-landowner/interventions/details/${intervention.id}`
                )
              }
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:cursor-pointer transition-shadow duration-300 ease-out flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between ">
                  <div>
                    <h2 className="text-xl font-semibold font-poetsen mb-2 text-zinc-800 dark:text-white">
                      {intervention.title}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                      {intervention.description}
                    </p>
                  </div>
                  <UpdateInterventionStatusSwitch
                    initialStatus={intervention.isDone}
                    interventionId={intervention.id}
                  />
                </div>

                <div className="space-y-1 text-zinc-700 dark:text-zinc-200 text-sm">
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {intervention.type}
                  </p>
                  <p>
                    <span className="font-medium">Statut:</span>{" "}
                    {intervention.isDone ? "Terminé" : "En cours"}
                  </p>
                  <p>
                    <span className="font-medium">Quantité:</span>{" "}
                    {intervention.quantity} {intervention.unit}
                  </p>
                  <p>
                    <span className="font-medium">Produit:</span>{" "}
                    {intervention.product_name}
                  </p>
                  <p>
                    <span className="font-medium">Terrain ID:</span>{" "}
                    {intervention.land_id}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="default"
                  className="font-poetsen flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/dashboard/landowner/interventions/update/${intervention.id}`
                    );
                  }}
                >
                  <Pencil size={16} /> Modifier
                </Button>

                <ConfirmDialog
                  trigger={
                    <Button
                      size="sm"
                      variant="destructive"
                      className="font-poetsen flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash size={16} /> Supprimer
                    </Button>
                  }
                  title="Confirmation de suppression"
                  description="Êtes-vous sûr de vouloir supprimer cette intervention ? Cette action est irréversible."
                  confirmText="Oui, supprimer"
                  cancelText="Annuler"
                  onConfirm={() => handleDeleteIntervention(intervention.id)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8">
          <PaginationWithIconAndLabel
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              refetch();
            }}
          />
        </div>
      )}
    </div>
  );
}
