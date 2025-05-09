"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import apiClient from "@/configs/axios";
import toast from "react-hot-toast";

export default function EditInterventionPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    type: "Semis",
    quantity: "",
    unit: "",
    product_name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntervention = async () => {
      try {
        const { data } = await apiClient.get(`/intervention/${id}`);
        const datas = data.data;
        console.log("Intervention data:", data);
        setFormData({
          title: datas.title || "",
          type: datas.type || "Semis",
          quantity: datas.quantity || "",
          unit: datas.unit || "",
          product_name: datas.product_name || "",
          description: datas.description || "",
        });
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        toast.error("Erreur lors du chargement de l'intervention.");
      } finally {
        setLoading(false);
      }
    };

    fetchIntervention();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = ["title", "type", "description"];
    for (const field of requiredFields) {
      const value = formData[field as keyof typeof formData];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        toast.error(`Le champ "${field}" est requis.`);
        return;
      }
    }

    if (["Semis", "Fertilisation", "Traitement"].includes(formData.type)) {
      if (
        !formData.quantity ||
        isNaN(Number(formData.quantity)) ||
        Number(formData.quantity) < 0
      ) {
        toast.error("La quantité est requise et doit être un nombre positif.");
        return;
      }
      if (!formData.unit || formData.unit.trim() === "") {
        toast.error("L'unité est requise.");
        return;
      }
      if (!formData.product_name || formData.product_name.trim() === "") {
        toast.error("Le nom du produit est requis.");
        return;
      }
    }

    const payload = {
      title: formData.title,
      type: formData.type,
      description: formData.description,
      quantity: formData.quantity || null,
      unit: formData.unit || null,
      product_name: formData.product_name || null,
    };
    await toast.promise(
      apiClient.post(`/intervention/${id}`, payload),
      {
        loading: "Mise à jour de l'intervention...",
        success: (data) => {
            router.back();
          console.log("Payload:", payload);
          console.log("Intervention mise à jour :", data);
          return "Intervention mise à jour avec succès !";
        },
        error: (error) => {
          console.error("Erreur lors de la mise à jour :", error);
          return (
            error.response?.data?.message ||
            "Erreur lors de la mise à jour de l'intervention."
          );
        },
      },
      {
        success: { duration: 2000, icon: "✅" },
        error: { duration: 4000 },
        style: { minWidth: "300px" },
      }
    );
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5 sm:text-sm";
  const labelClass =
    "block text-sm font-medium text-zinc-900 dark:text-white mb-1";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-zinc-600 dark:text-zinc-300">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-sidebar-accent rounded-lg">
      <h1 className="text-2xl font-bold mb-2 text-zinc-800 dark:text-white font-poetsen">
        Modifier l'intervention
      </h1>
      <p className="text-sm text-zinc-500 mb-3">
        Modifiez les informations de l'intervention #{id}.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="title" className={labelClass}>
            Titre *
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>
            Type d'intervention *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="Semis">Semis</option>
            <option value="Arrosage">Arrosage</option>
            <option value="Fertilisation">Fertilisation</option>
            <option value="Recolte">Récolte</option>
            <option value="Traitement">Traitement</option>
          </select>
        </div>

        {["Semis", "Fertilisation", "Traitement"].includes(formData.type) && (
          <>
            <div>
              <label htmlFor="product_name" className={labelClass}>
                Nom du produit utilisé *
              </label>
              <input
                id="product_name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className={labelClass}>
                Quantité utilisée (kg, L, etc.) *
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                step="any"
                value={formData.quantity}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="unit" className={labelClass}>
                Unité *
              </label>
              <input
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="description" className={labelClass}>
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${inputClass} h-24 resize-none`}
            required
          />
        </div>

        <button
          type="submit"
          className="self-end font-poetsen rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-medium text-white"
        >
          Mettre à jour l'intervention
        </button>
      </form>
    </div>
  );
}
