
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddParcelDialogProps {
  onParcelAdded?: () => void;
}

const AddParcelDialog = ({ onParcelAdded }: AddParcelDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the submitted values (replace with actual API call in production)
      console.log('Submitted parcel:', values);
      
      // Show success message
      toast.success('Parcelle ajoutée avec succès!');
      
      // Close the dialog
      setOpen(false);
      
      // Call the callback if provided
      if (onParcelAdded) {
        onParcelAdded();
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'ajout de la parcelle.');
      console.error('Error adding parcel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="bg-nature-500 hover:bg-nature-600"
        >
          <Plus className="mr-2 h-5 w-5" />
          Ajouter une parcelle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-clash">Ajouter une nouvelle parcelle</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour ajouter une nouvelle parcelle à votre exploitation.
          </DialogDescription>
        </DialogHeader>
        {/* <AddParcelForm onSubmit={handleSubmit} isLoading={isLoading} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddParcelDialog;
