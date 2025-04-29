import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Leaf, ArrowUpRight, Trash2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "../alert-dialog-01";
import apiClient from "@/configs/axios";
import { toast } from "react-hot-toast"; // Attention ici : import corrigé !
import { useRouter } from "next/navigation";

type LandCardProps = {
  id: number;
  name: string;
  city: string;
  culture_type: string;
  land_status: string;
  onViewDetails: () => void;
};

export default function LandCard({
  id,
  name,
  city,
  culture_type,
  land_status,
  onViewDetails,
}: LandCardProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/lands/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lands"] });
    },
    
  });

  const handleDelete = async () => {
    const promise = deleteMutation.mutateAsync(); 
    toast.promise(promise, {
      loading: "Suppression du terrain...",
      success: "Terrain supprimé avec succès !",
      error: (err) => `This just happened: ${err.toString()}`,
    });
  };

  return (
    <Card className="w-full max-w-sm p-4 shadow-lg bg-nature-300">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle className="text-xl font-poetsen">{name}</CardTitle>
        </div>
        <div className="flex justify-between space-x-3">
        <Badge variant="outline" className="text-sm capitalize">
          {land_status}
        </Badge>

        <ConfirmDialog
            trigger={
              <Button variant="destructive" size="icon" className="w-full p-3">
                <Trash2 className="w-5 h-5" />
              </Button>
            }
            title="Confirmer la suppression"
            description="Voulez-vous vraiment supprimer ce terrain ? Cette action est irréversible."
            confirmText="Supprimer"
            cancelText="Annuler"
            onConfirm={handleDelete}
          />
        </div>
        
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
        <div className="flex items-center justify-around space-x-2">
          <Button
            className="bg-nature-500 hover:bg-nature-700"
            onClick={onViewDetails}
          >
            Voir les détails <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
       

          <Button onClick={() => router.push(`/dashboard-landowner/interventions/add-intervention-page/${id}`)}><Plus /> Intervention </Button>



        </div>
      </CardContent>
    </Card>
  );
}
