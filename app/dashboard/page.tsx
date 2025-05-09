"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/configs/axios";
import { LandPlot, ClipboardList, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DisplayCards from "@/components/ui/display-cards";
import { useUserStore } from "@/hooks/useUserStore";
import { UserInterventionsChart } from "@/components/charts/user-interventions-chart";
import { UserCultureDistributionChart } from "@/components/charts/user-culture-chart";
import { UserMonthlyActivityChart } from "@/components/charts/user-monthly-chart";

export default function UserDashboardPage() {
  const user = useUserStore((state) => state.user);
  
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-stats", user?.id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${user?.id}/stats`);
      return response.data;
    },
    enabled: !!user?.id
  });

  const {
    data: interventionStats,
    isLoading: isLoadingInterventions
  } = useQuery({
    queryKey: ["user-intervention-stats", user?.id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${user?.id}/intervention-stats`);
      return response.data;
    },
    enabled: !!user?.id
  });

  const {
    data: monthlyStats
  } = useQuery({
    queryKey: ["user-monthly-stats", user?.id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${user?.id}/monthly-stats`);
      return response.data;
    },
    enabled: !!user?.id
  });

  const {
    data: cultureStats
  } = useQuery({
    queryKey: ["user-culture-stats", user?.id],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${user?.id}/culture-stats`);
      return response.data;
    },
    enabled: !!user?.id
  });

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Erreur lors du chargement de vos statistiques
      </div>
    );
  }

  const getValue = (value: number | undefined) =>
    isLoading ? "Chargement..." : `${value}`;

  const cards = [
    {
      icon: <LandPlot className="size-4 text-green-300" />,
      title: "Mes Parcelles",
      description: getValue(stats?.totalLands),
      date: "Total",
      iconClassName: "text-green-500",
      titleClassName: "text-green-500",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
    },
    {
      icon: <ClipboardList className="size-4 text-blue-300" />,
      title: "Interventions",
      description: getValue(stats?.totalInterventions),
      date: "Total",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
    },
    {
      icon: <CheckCircle className="size-4 text-emerald-300" />,
      title: "Terminées",
      description: getValue(stats?.completedInterventions),
      date: "Ce mois",
      iconClassName: "text-emerald-500",
      titleClassName: "text-emerald-500",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10"
    },
    {
      icon: <Clock className="size-4 text-amber-300" />,
      title: "En cours",
      description: getValue(stats?.pendingInterventions),
      date: "En attente",
      iconClassName: "text-amber-500",
      titleClassName: "text-amber-500",
      className: "[grid-area:stack] translate-x-36 translate-y-32 hover:translate-y-20"
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center font-poetsen">
        Mon Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Cartes de statistiques en style stack */}
        <div className="flex min-h-[300px] w-full items-center justify-center">
          <div className="w-full max-w-4xl">
            <DisplayCards cards={cards} />
          </div>
        </div>

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserInterventionsChart 
            data={interventionStats} 
            isLoading={isLoadingInterventions} 
          />
          
          <UserCultureDistributionChart 
            data={cultureStats} 
          />
        </div>

        {/* Graphique d'activité mensuelle */}
        <div className="grid grid-cols-1 gap-6">
          <UserMonthlyActivityChart 
            data={monthlyStats} 
          />
        </div>
      </div>
    </div>
  );
}