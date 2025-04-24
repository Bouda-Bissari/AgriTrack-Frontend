import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Leaf, ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";

type LandCardProps = {
  name: string;
  city: string;
  culture_type: string;
  land_status: string;
  onViewDetails: () => void;
};

export default function LandCard({
  name,
  city,
  culture_type,
  land_status,
  onViewDetails,
}: LandCardProps) {
  return (
    <Card className="w-full max-w-sm p-4 shadow-lg bg-nature-300">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle className="text-xl font-poetsen">{name}</CardTitle>
        </div>
        <Badge variant="outline" className="text-sm capitalize">
          {land_status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <span className="text-sm">{city}</span>
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span className="text-sm">Culture: {culture_type}</span>
        </div>
        <Button
          className="bg-nature-500 hover:bg-nature-700"
          onClick={onViewDetails}
        >
          Voir les détails <ArrowUpRight className="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
