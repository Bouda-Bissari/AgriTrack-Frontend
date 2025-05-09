import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Liste des routes publiques et des fichiers statiques à exclure
const PUBLIC_ROUTES = ["/login", "/register"];
const STATIC_FILES = [
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/images/",
  "/fonts/",
  "/styles/",
  // Ajoutez d'autres chemins statiques si nécessaire
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Vérifie si la route actuelle est une route publique ou un fichier statique
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isStaticFile = STATIC_FILES.some((file) => pathname.startsWith(file));

  // Si c'est une route publique ou un fichier statique, on laisse passer
  if (isPublicRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Récupère le token depuis les cookies
  const token = request.cookies.get("auth_token")?.value;

  // Si pas de token et route non publique, redirection vers login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - static files
     * - public routes
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|images|fonts|styles).*)",
  ],
};
