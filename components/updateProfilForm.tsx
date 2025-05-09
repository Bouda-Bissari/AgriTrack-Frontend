"use client";

import React, { useState, useEffect } from "react";
import { useUserStore } from "@/hooks/useUserStore";
import { useUpdate } from "@/hooks/useUpdate";
import { useFileUpload } from "@/hooks/use-file-upload";
import { toast } from "react-hot-toast";
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";

export const UpdateProfilForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const { updateProfile, updatePassword } = useUpdate();
  
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    profilImage: null as File | null,
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        profilImage: null,
      });
    }
  }, [user]);
  
  // Update form when a file is uploaded
  useEffect(() => {
    if (files.length > 0) {
      setForm((prev) => ({
        ...prev,
        profilImage: files[0].file instanceof File ? files[0].file : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        profilImage: null,
      }));
    }
  }, [files]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      
      if (form.phoneNumber) {
        formData.append("phoneNumber", form.phoneNumber);
      }
      
      if (form.bio) {
        formData.append("bio", form.bio);
      }
      
      if (form.profilImage) {
        formData.append("profilImage", form.profilImage);
      }
      
      await updateProfile(formData);
      setIsOpen(false);
    } catch (error: any) {
      // Toast will be handled by the hook
      console.error(error);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    try {
      await updatePassword(passwordForm);
      setIsPasswordOpen(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      // Toast will be handled by the hook
      console.error(error);
    }
  };
  
  const inputClass = "w-full h-10 text-black bg-white p-2 font-normal rounded-lg outline-none border";
  
  // Generate preview URL from user's existing image or uploaded file
  const previewUrl = files[0]?.preview || (user?.profilImage ? user.profilImage : null);
  
  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Modifier profil
        </button>
        <button
          onClick={() => setIsPasswordOpen(true)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Changer mot de passe
        </button>
      </div>
      
      {/* Profile Update Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modifier mon profil</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-800">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Image Upload Component */}
              <div className="flex flex-col gap-2">
                <label htmlFor="profilImage">Photo de profil</label>
                <div className="relative">
                  {/* Drop area */}
                  <div
                    role="button"
                    onClick={openFileDialog}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                  >
                    <input
                      {...getInputProps()}
                      className="sr-only"
                      aria-label="Upload file"
                    />
                    {previewUrl ? (
                      <div className="absolute inset-0">
                        <img
                          src={previewUrl}
                          alt="Photo de profil"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                        <div
                          className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                          aria-hidden="true"
                        >
                          <ImageUpIcon className="size-4 opacity-60" />
                        </div>
                        <p className="mb-1.5 text-sm font-medium">
                          Déposez votre image ici ou cliquez pour parcourir
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Taille maximale: {maxSizeMB}MB
                        </p>
                      </div>
                    )}
                  </div>
                  {previewUrl && (
                    <div className="absolute top-4 right-4">
                      <button
                        type="button"
                        className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                        onClick={() => {
                          if (files[0]?.id) {
                            removeFile(files[0].id);
                          } else {
                            // Clear existing profile image
                            setForm(prev => ({ ...prev, profilImage: null }));
                          }
                        }}
                        aria-label="Supprimer l'image"
                      >
                        <XIcon className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
                {errors.length > 0 && (
                  <div
                    className="text-destructive flex items-center gap-1 text-xs text-red-500"
                    role="alert"
                  >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                  </div>
                )}
              </div>
              
              {/* Other form fields */}
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="phoneNumber">Téléphone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="bio">Bio</label>
                <textarea
                  name="bio"
                  id="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className={`${inputClass} min-h-[100px]`}
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Password Update Modal */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Changer mot de passe</h2>
              <button onClick={() => setIsPasswordOpen(false)} className="text-gray-600 hover:text-gray-800">
                &times;
              </button>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="currentPassword">Mot de passe actuel</label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className={inputClass}
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className={inputClass}
                  required
                  minLength={8}
                />
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className={inputClass}
                  required
                  minLength={8}
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Changer le mot de passe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};