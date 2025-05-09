"use client";
import PaginationWithIconAndLabel from "@/components/pagination-10";
import apiClient from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

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
  const { landId } = useParams();

  async function fetchInterventions(page: number) {
    const response = await apiClient.get(
      `/interventions/land/${landId}?page=${page}`
    );
    return response.data;
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["interventions", currentPage],
    queryFn: () => fetchInterventions(currentPage),
  });

  const interventions: Intervention[] = Array.isArray(data?.data?.data) ? data.data?.data : [];
  console.log("Interventions:", interventions);
  console.log("Data:", data);
  const totalPages: number = data?.data?.last_page ?? 1;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-poetsen font-bold mb-6 text-zinc-800 dark:text-white">
        Liste des interventions
      </h1>

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
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 ease-out"
            >
              <h2 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
                {intervention.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
                {intervention.description}
              </p>
              <div className="space-y-1 text-zinc-700 dark:text-zinc-200 text-sm">
                <p>
                  <span className="font-medium">Type:</span> {intervention.type}
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