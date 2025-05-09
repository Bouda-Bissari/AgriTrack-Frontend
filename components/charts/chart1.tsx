"use client"

import { useQuery } from "@tanstack/react-query"
import apiClient from "@/configs/axios"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, LandPlot, TrendingUp } from "lucide-react"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface UserLandStats {
  userId: number;
  firstName: string;
  lastName: string;
  landCount: number;
}

const chartConfig = {
  lands: {
    label: "Parcelles",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function UserLandDistributionChart() {
  const { data, isLoading, error } = useQuery<UserLandStats[]>({
    queryKey: ["user-land-stats"],
    queryFn: async () => {
      const response = await apiClient.get("/admin/user-land-stats")
      return response.data
    },
  })

  // Formater les données pour le graphique
  const chartData = data?.map(user => ({
    name: `${user.firstName} ${user.lastName}`.slice(0, 12),
    lands: user.landCount,
    fullName: `${user.firstName} ${user.lastName}`,
    userId: user.userId
  })) || []

  // Calculer la tendance
  const trendPercentage = data && data.length > 1 ? 
    Math.round(((data[0].landCount - data[1].landCount) / data[1].landCount) * 100) : 0

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <LandPlot className="h-5 w-5 text-primary" />
          <CardTitle>Répartition des parcelles par utilisateur</CardTitle>
        </div>
        <CardDescription>Nombre de parcelles détenues par chaque utilisateur</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : error ? (
          <div className="flex h-full items-center justify-center text-red-500">
            Erreur lors du chargement des données
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  hide
                />
                <XAxis dataKey="lands" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="lands"
                  layout="vertical"
                  fill="var(--sidebar-accent)"
                  className="bg-sidebar-accent-foreground"
                  radius={4}
                >
                  <LabelList
                    dataKey="fullName"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="lands"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: number) => `${value} parcelle${value > 1 ? 's' : ''}`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm mt-8">
        {data && data.length > 1 && (
          <div className="flex gap-2 font-medium leading-none">
            {trendPercentage >= 0 ? 'En hausse' : 'En baisse'} de {Math.abs(trendPercentage)}% 
            <TrendingUp className={`h-4 w-4 ${trendPercentage >= 0 ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          {data?.length || '0'} utilisateurs avec parcelles
        </div>
      </CardFooter>
    </Card>
  )
}