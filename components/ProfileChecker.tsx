"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      // No verificar en páginas públicas o de auth
      const publicPaths = ["/sign-in", "/sign-up", "/complete-profile"];
      if (!isLoaded || publicPaths.some((path) => pathname?.startsWith(path))) {
        setChecking(false);
        return;
      }

      // Si no está logueado, no hacer nada
      if (!isSignedIn) {
        setChecking(false);
        return;
      }

      try {
        // Verificar si el usuario tiene perfil completo en la DB
        const response = await fetch(
          `/api/user/check-profile?clerkId=${user?.id}`
        );
        const data = await response.json();

        if (!data.exists || !data.profileCompleted) {
          // Redirigir a completar perfil
          router.push("/complete-profile");
        }
        setChecking(false);
      } catch (error) {
        console.error("Error checking profile:", error);
        setChecking(false);
      }
    };

    checkProfile();
  }, [isSignedIn, user, isLoaded, pathname, router]);

  // Mostrar loading mientras verifica
  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#876A5C]">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
