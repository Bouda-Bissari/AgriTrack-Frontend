"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  User as UserIcon,
  Phone,
  Edit,
  Trash2,
  MoreHorizontal,
  BookText,
} from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "../alert-dialog-01";
import apiClient from "@/configs/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleUserBlockSwitch from "./ToggleUserBlockSwitch";

type UserCardProps = {
  id: number;
  firstName: string;
  lastName: string;
  bio?: string;
  email: string;
  phoneNumber?: string;
  role: string;
  is_blocked: boolean;
};

export default function UserCard({
  id,
  firstName,
  lastName,
  bio,
  email,
  phoneNumber,
  role,
  is_blocked,
}: UserCardProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/delete/user/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Utilisateur supprimé avec succès");
    },
    onError: (error: any) => {
      toast.error(`Erreur lors de la suppression: ${error.message}`);
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <Card className="w-full max-w-sm p-4 shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-lg font-semibold flex items-center  font-poetsen gap-2">
            <UserIcon className="w-5 h-5" />
            {firstName} {lastName}
          </CardTitle>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/admin/users/edit/${id}`)}
              className="cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <ConfirmDialog
              trigger={
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </DropdownMenuItem>
              }
              title="Confirmer la suppression"
              description={`Voulez-vous vraiment supprimer l'utilisateur ${firstName} ${lastName} ?`}
              confirmText="Supprimer"
              cancelText="Annuler"
              onConfirm={handleDelete}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <ToggleUserBlockSwitch userId={id} initialBlocked={is_blocked} />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-600" />
          <span className="text-sm">{email}</span>
        </div>

        {phoneNumber && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-600" />
            <span className="text-sm">{phoneNumber}</span>
          </div>
        )}

        {bio && (
          <div className="flex items-start gap-2">
            <BookText className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-700">{bio}</span>
          </div>
        )}

        <div className="mt-3">
          <Badge variant="outline" className="capitalize">
            {role}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
