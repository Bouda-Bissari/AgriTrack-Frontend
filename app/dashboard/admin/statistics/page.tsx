"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/configs/axios";
import { Users, AlertTriangle, LandPlot, ClipboardList } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DisplayCards from "@/components/ui/display-cards";
import { UserLandDistributionChart } from "@/components/charts/chart1";
import { InterventionTypeChart } from "@/components/charts/chart2";
import { useUserStore } from "@/hooks/useUserStore";

export default function DashboardPage() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await apiClient.get("/admin/dashboard-stats");
      return response.data;
    },
  });
  const user = useUserStore((state) => state.user);

  const role = user?.role;
  if (role !== "admin") {
    return (
      <div className="text-red-500 p-4">
        Vous n'avez pas accès à cette page.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Erreur lors du chargement des statistiques
      </div>
    );
  }

  const getValue = (value: number | undefined) =>
    isLoading ? "Chargement..." : `${value}`;

  const cards = [
    {
      icon: <Users className="size-4 text-blue-300" />,
      title: "Utilisateurs",
      description: getValue(stats?.totalUsers),
      date: "Aujourd'hui",
      iconClassName: "text-blue-500",
      titleClassName: "text-blue-500",
      className: "[grid-area:stack] hover:-translate-y-10",
    },
    {
      icon: <AlertTriangle className="size-4 text-red-300" />,
      title: "Bloqués",
      description: getValue(stats?.blockedUsers),
      date: "Mis à jour",
      iconClassName: "text-red-500",
      titleClassName: "text-red-500",
      className: "[grid-area:stack] translate-x-12 translate-y-10",
    },
    {
      icon: <LandPlot className="size-4 text-green-300" />,
      title: "Parcelles",
      description: getValue(stats?.totalLands),
      date: "Statut Actuel",
      iconClassName: "text-green-500",
      titleClassName: "text-green-500",
      className: "[grid-area:stack] translate-x-24 translate-y-20",
    },
    {
      icon: <ClipboardList className="size-4 text-yellow-300" />,
      title: "Interventions",
      description: getValue(stats?.totalInterventions),
      date: "Aujourd'hui",
      iconClassName: "text-yellow-500",
      titleClassName: "text-yellow-500",
      className: "[grid-area:stack] translate-x-36 translate-y-32",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center font-poetsen">
        Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 📊 Stats à gauche */}
        <div className="md:col-span-1 flex items-start">
          <div className="w-full">
            <DisplayCards cards={cards} />
          </div>
        </div>

        {/* 📈 Charts placeholder */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* <Skeleton className="h-60 w-full rounded-lg" /> */}
          <UserLandDistributionChart />
          {/* <Skeleton className="h-60 w-full rounded-lg" /> */}
          <InterventionTypeChart />
        </div>
      </div>
    </div>
  );
}
