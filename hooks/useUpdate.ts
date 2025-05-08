import toast from "react-hot-toast";
import { useUserStore } from "./useUserStore"
import apiClient from "@/configs/axios";


export const useUpdate = () => {
    const updateUser = useUserStore((state: any) => state.updateUser);

    const updateProfil = async (updateData: {
        firstName?: string,
        lastName?: string,
        email?: string,
        phoneNumber?: string,
        bio?: string,
        profilImage?: string,
    }) => {
        return toast.promise(
            apiClient.put("/user/update", updateData),
            {
                loading: "Mise à jour du profil en cours ...",
                success: (response) => {
                    updateUser(response.data.user); //met à jour le store local
                    console.log(response.data);
                    return "profil mis à jour ! 👍 ";
                },
                error: (err) => {
                    console.error(err);
                    return (err.response?.data?.message || "Echèc de la mise à jour du profil. Veuillez réessayer.");
                }
            },
            {
                success: {duration: 2000, icon: "✅" },
                error : {duration: 4000},
                style: {minWidth: "250px"}
            }
        );
    };

    return {updateProfil}
};