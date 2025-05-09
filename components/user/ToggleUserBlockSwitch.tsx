"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/configs/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Switch } from "../ui/switch";

interface ToggleUserBlockSwitchProps {
  userId: number;
  initialBlocked: boolean;
}

export default function ToggleUserBlockSwitch({
  userId,
  initialBlocked,
}: ToggleUserBlockSwitchProps) {
  const [isBlocked, setIsBlocked] = useState(initialBlocked);
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (newStatus: boolean) => {
      await apiClient.post(`/block/${userId}`, {
        is_blocked: newStatus,
      });
    },
    onSuccess: (_, newStatus) => {
      toast.success(
        newStatus ? "Utilisateur bloqué avec succès." : "Utilisateur débloqué avec succès."
      );
      setIsBlocked(newStatus);
      router.refresh();
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du statut de l'utilisateur.");
    },
  });

  const handleSwitchClick = (checked: boolean) => {
    setPendingStatus(checked);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (pendingStatus !== null) {
      mutation.mutate(pendingStatus);
    }
    setOpen(false);
  };

  return (
    <>
      <Switch
        checked={isBlocked}
        onCheckedChange={handleSwitchClick}
        disabled={mutation.isPending}
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Changer le statut de l'utilisateur</AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              Voulez-vous vraiment {pendingStatus ? "bloquer" : "débloquer"} cet utilisateur ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Oui, confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
