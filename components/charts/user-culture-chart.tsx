"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserCultureDistributionChart({ data }: { data: any }) {
  const chartData = data?.map((item: any) => ({
    name: item.cultureType,
    value: item.count,
    fill: `hsl(${Math.random() * 360}, 70%, 50%)` // Couleurs aléatoires
  })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition de Mes Cultures</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="20%"
            outerRadius="100%"
            data={chartData}
            startAngle={180}
            endAngle={-180}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
              label={{ position: 'insideStart', fill: '#fff' }}
            />
            <Legend 
              formatter={(value, entry, index) => (
                <span className="text-foreground">
                  {chartData[index]?.name}: {chartData[index]?.value}
                </span>
              )}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}