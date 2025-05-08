"use client";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./motion-primitives/dialog";
import { Plus, Camera, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdate } from "@/hooks/useUpdate";
import { useUserStore } from "@/hooks/useUserStore";

export function UpdateProfilForm() {
  const [open, setOpen] = useState(false);  
  const [profilForm, setProfilForm] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const {updateProfil} = useUpdate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    profilImage: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        profilImage: user.profilImage || "",
      });
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      setForm((prev) => ({ ...prev, profilImage: imageURL}))
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      console.log(form);
  
      e.preventDefault();

      setOpen(false);

      await updateProfil(form);
      
  };

  const inputClass =
    "w-full h-10 focus:text-black text-gray-500 border border-gray-300 px-2 py-1 font-bold rounded-lg outline-none focus:border-2 focus:border-[var(--sidebar-accent-foreground)]/80 focus:ring-3 ring-[var(--sidebar-accent)]";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-nature-600 px-4 py-2 text-sm text-white hover:bg-nature-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
        <Plus /> Modifier profil
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-6  shadow-[0_4px_12px_#0000001a] backdrop:bg-nature-600/40 backdrop:backdrop-blur-xs">

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        <div className="w-full rounded-lg flex items-center justify-between gap-4 py-2 ">
            {/* image */}
            <div className="flex items-center gap-2">
              <div className="relative w-18 h-18">
                <img
                  src={form.profilImage || "/images/agri1.jpg"}
                  alt="photo profil"
                  className="object-cover w-18 h-18 rounded-full border-2"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-1 bg-white p-1 rounded-full shadow-sm hover:bg-gray-100 cursor-pointer"
                  type="button"
                >
                  <Camera className="size-3" />
                </button>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg">{user?.lastName} {user?.firstName}</h1>
                <p className="text-gray-600">
                  {user?.role === "landOwner" ? "Exploitant agricole" : "Travailleur agricole"}
                </p>
              </div>
            </div>

            <div className="w-35 h-10 flex items-center text-base gap-2 cursor-pointer rounded-lg p-2 bg-[var(--color-nature-500)]">
              <Pencil size={15}/>
              <p onClick={() => fileInputRef.current?.click()}  className="text-sm font-semibold">Modifier image</p>
            </div>
          </div>

          {/* Info personnelle */}
          <div className="w-full rounded-lg flex flex-col gap-5">

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleInput}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName">Prénoms</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleInput}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Adresse Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleInput}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone">Numéro de Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={form.phoneNumber}
                  onChange={handleInput}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"  
                value={form.bio}
                onChange={handleInput}
                className="min-h-5 max-h-10 focus:text-black text-gray-500 border border-gray-300 px-2 py-1 font-bold rounded-lg outline-none focus:border-2 focus:border-[var(--sidebar-accent-foreground)]/80 focus:ring-3 ring-[var(--sidebar-accent)]"
              ></textarea>
            </div>
          </div>  

          <Button 
            type="submit" 
            className="self-center w-full bg-black">Enregistrer le profil
          </Button>
            
        </form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
