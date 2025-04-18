import axios from "axios";
import { toast } from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  //   "X-Requested-With": "XMLHttpRequest",
  // },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          if (!response.config.url?.includes("/login")) {
            toast.error("Session expirée. Veuillez vous reconnecter.");
           
          }
          break;
        case 403:
          toast.error(
            "Vous n'avez pas les autorisations nécessaires pour effectuer cette action."
          );
          break;
        case 404:
          toast.error("Ressource introuvable.");
          break;
        case 422:
          toast.error(Object.values(response.data.errors).flat().join("\n"), {
            duration: 5000,
          });
          break;
        case 500:
          toast.error("Erreur serveur - veuillez réessayer plus tard.");
          break;
        default:
          toast.error(`Erreur : ${response.status} - ${response.data.message}`);
      }
    } else {
      toast.error("Erreur réseau - veuillez vérifier votre connexion.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
