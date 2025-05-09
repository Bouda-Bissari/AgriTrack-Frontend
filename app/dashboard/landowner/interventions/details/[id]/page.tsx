"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import apiClient from "@/configs/axios";
import { CalendarDays, CheckCircle, Clock } from "lucide-react";

interface Intervention {
  id: number;
  title: string;
  description: string;
  type: string;
  quantity: number;
  unit: string;
  product_name: string;
  isDone: boolean;
  created_at: string;
  land_id: number;
}

export default function InterventionDetailPage() {
  const { id } = useParams();

  async function fetchIntervention() {
    const response = await apiClient.get(`/intervention/${id}`);
    return response.data;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["intervention", id],
    queryFn: fetchIntervention,
  });

  const intervention: Intervention = data?.data;

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Chargement...</div>;
  }

  if (isError || !intervention) {
    return <div className="text-center py-10 text-red-500">Erreur lors du chargement de l'intervention.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold font-poetsen text-zinc-800 dark:text-white mb-6">
        Détails de l'intervention
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-2">
            {intervention.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{intervention.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-200">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="font-semibold">Type:</span> {intervention.type}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="font-semibold">Produit utilisé:</span> {intervention.product_name}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="font-semibold">Quantité:</span> {intervention.quantity} {intervention.unit}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-2">
            {intervention.isDone ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <Clock className="text-yellow-500 w-5 h-5" />
            )}
            <span className="font-semibold">Statut:</span> {intervention.isDone ? "Terminé" : "En cours"}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <span className="font-semibold">Créé le:</span> {new Date(intervention.created_at).toLocaleDateString()}
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="font-semibold">Terrain ID:</span> {intervention.land_id}
          </div>
        </div>
      </div>
    </div>
  );
}
