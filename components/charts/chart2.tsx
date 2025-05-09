"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/configs/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

interface InterventionStats {
  type: string;
  count: number;
}

const typeColors = {
  Semis: "#34c38f", // Vert
  Arrosage: "#5b73e8", // Bleu
  Fertilisation: "#f1b44c", // Jaune
  Recolte: "#f46a6a", // Rouge clair
  Traitement: "#50a5f1", // Bleu ciel
  Autre: "#6f42c1", // Violet foncé (pour fallback)
};

const chartConfig = {
  count: {
    label: "Interventions",
  },
  Semis: {
    label: "Semis",
    color: typeColors.Semis,
  },
  Arrosage: {
    label: "Arrosage",
    color: typeColors.Arrosage,
  },
  Fertilisation: {
    label: "Fertilisation",
    color: typeColors.Fertilisation,
  },
  Recolte: {
    label: "Récolte",
    color: typeColors.Recolte,
  },
  Traitement: {
    label: "Traitement",
    color: typeColors.Traitement,
  },
  Autre: {
    label: "Autre",
    color: typeColors.Autre,
  },
} satisfies ChartConfig;

export function InterventionTypeChart() {
  const { data, isLoading, error } = useQuery<InterventionStats[]>({
    queryKey: ["intervention-stats"],
    queryFn: async () => {
      const response = await apiClient.get("/admin/intervention-stats");
      return response.data;
    },
  });

  const chartData = React.useMemo(() => {
    if (!data) return [];

    return data.map((item) => {
      // Utiliser la clé exacte retournée par l'API (match avec typeColors)
      const key = item.type as keyof typeof typeColors;
      const fill = typeColors[key] || typeColors.Autre;
      return {
        type: item.type,
        count: item.count,
        fill,
      };
    });
  }, [data]);

  const totalInterventions = React.useMemo(() => {
    return data?.reduce((acc, curr) => acc + curr.count, 0) || 0;
  }, [data]);

  // Calcul de la tendance
  const trendPercentage =
    data && data.length > 0
      ? Math.round((data[0].count / totalInterventions) * 100)
      : 0;

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-red-500">Erreur lors du chargement des données</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Répartition des interventions</CardTitle>
        <CardDescription>Par type d'intervention</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <Skeleton className="mx-auto aspect-square max-h-[250px] w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalInterventions.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Interventions
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {data?.[0]?.type} représente {trendPercentage}% des interventions
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {data?.length || "0"} types d'interventions enregistrés
        </div>
      </CardFooter>
    </Card>
  );
}
