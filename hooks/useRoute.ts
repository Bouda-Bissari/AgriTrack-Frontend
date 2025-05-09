"use client";

import { usePathname } from "next/navigation";

const normalizePath = (path: string) => {
  if (path === "/") return path;
  return path.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
};

const useRoute = () => {
  const pathname = usePathname() || "";
  
  // Nettoyage avancé de l'URL
  const [cleanedPath] = pathname.split(/[?#]/);
  const normalizedPath = normalizePath(cleanedPath);

  // Vérification de route active avec gestion des segments dynamiques
  const isActive = (targetPath: string) => {
    const normalizedTarget = normalizePath(targetPath);
    
    return normalizedPath === normalizedTarget || 
      (normalizedPath.startsWith(`${normalizedTarget}/`) && normalizedTarget !== "");
  };

  // Génération des segments de route avec gestion des slugs
  const routeParts = normalizedPath
    .split("/")
    .filter(Boolean)
    .map((part, index, arr) => ({
      name: decodeURIComponent(part),
      path: `/${arr.slice(0, index + 1).join("/")}`
    }));

  return { 
    isActive,
    path: normalizedPath,
    segments: routeParts,
    currentSegment: routeParts[routeParts.length - 1]?.name || ""
  };
};

export default useRoute;
