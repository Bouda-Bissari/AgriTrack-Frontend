"use client";

import ConfirmDialog from "@/components/alert-dialog-01";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/configs/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface UpdateInterventionStatusSwitchProps {
  interventionId: number;
  initialStatus: boolean;
}

export default function UpdateInterventionStatusSwitch({
  interventionId,
  initialStatus,
}: UpdateInterventionStatusSwitchProps) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false); 
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (newStatus: boolean) => {
      await apiClient.post(`/update/status/${interventionId}`, {
        isDone: newStatus,
      });
    },
    onSuccess: () => {
      toast.success("Statut mis à jour avec succès !");
      router.refresh();
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du statut.");
    },
  });

  const handleSwitchClick = (checked: boolean) => {
    setPendingStatus(checked);
    setOpen(true); 
  };

  const handleConfirm = () => {
    if (pendingStatus !== null) {
      setCurrentStatus(pendingStatus);
      mutation.mutate(pendingStatus);
    }
    setOpen(false);
  };

  return (
    <>
      <Switch
        checked={currentStatus}
        onCheckedChange={handleSwitchClick}
        disabled={mutation.isPending}
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Changer le statut</AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">
              Voulez-vous vraiment marquer cette intervention comme {pendingStatus ? "terminée" : "en cours"} ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Oui, changer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
