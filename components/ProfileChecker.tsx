"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function ProfileChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const hasChecked = useRef(false);

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

      // Solo verificar una vez por sesión
      if (hasChecked.current) {
        setChecking(false);
        return;
      }

      try {
        // Verificar si el usuario tiene perfil completo en la DB
        const response = await fetch(
          `/api/user/check-profile?clerkId=${user?.id}`
        );
        const data = await response.json();

        hasChecked.current = true;

        // Solo redirigir a complete-profile si realmente no tiene perfil completo
        if (!data.exists || !data.profileCompleted) {
          console.log("Profile incomplete, redirecting to complete-profile");
          router.push("/complete-profile");
        } else {
          console.log("Profile is complete, allowing navigation");
        }

        setChecking(false);
      } catch (error) {
        console.error("Error checking profile:", error);
        hasChecked.current = true;
        setChecking(false);
      }
    };

    checkProfile();
  }, [isSignedIn, user, isLoaded, pathname, router]);

  // Mostrar loading mientras verifica
  if (checking) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        suppressHydrationWarning
      >
        <div className="text-[#876A5C]" suppressHydrationWarning>
          Loading...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
