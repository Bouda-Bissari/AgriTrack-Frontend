"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserMonthlyActivityChart({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mon Activité Mensuelle</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" stackId="a" fill="#10B981" name="Terminées" />
            <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="En cours" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}