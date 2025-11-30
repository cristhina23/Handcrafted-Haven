"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { countryCodes } from "@/lib/data/countryCodes";

export default function CompleteProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Obtener username de Clerk si existe
  const clerkUsername = user?.username || user?.firstName?.toLowerCase() || "";

  const [formData, setFormData] = useState({
    username: clerkUsername,
    countryCode: "+1",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  // Actualizar username cuando el usuario de Clerk cargue
  useEffect(() => {
    if (clerkUsername && !formData.username) {
      setFormData((prev) => ({ ...prev, username: clerkUsername }));
    }
  }, [clerkUsername, formData.username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones antes de enviar
    if (!formData.username || formData.username.trim().length < 3) {
      alert("Username must be at least 3 characters long");
      return;
    }

    if (formData.phoneNumber && !/^[0-9\-\s()]+$/.test(formData.phoneNumber)) {
      alert(
        "Phone number can only contain numbers, spaces, hyphens, and parentheses"
      );
      return;
    }

    if (formData.city && !/^[A-Za-z\s\-']+$/.test(formData.city)) {
      alert(
        "City name can only contain letters, spaces, hyphens, and apostrophes"
      );
      return;
    }

    if (formData.state && !/^[A-Za-z\s\-]+$/.test(formData.state)) {
      alert("State/Province can only contain letters, spaces, and hyphens");
      return;
    }

    if (formData.zipCode && !/^[0-9A-Za-z\s\-]+$/.test(formData.zipCode)) {
      alert("ZIP/Postal code format is invalid");
      return;
    }

    setLoading(true);

    try {
      // Combinar código de país con número de teléfono
      const fullPhone = formData.phoneNumber
        ? `${formData.countryCode} ${formData.phoneNumber}`
        : "";

      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user?.id,
          email: user?.emailAddresses[0]?.emailAddress,
          fullName: user?.fullName || `${user?.firstName} ${user?.lastName}`,
          image: user?.imageUrl,
          username: formData.username || clerkUsername, // Usar username de form o de Clerk
          phone: fullPhone,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        }),
      });

      if (response.ok) {
        router.push("/"); // Redirigir al home después de completar
      } else {
        const error = await response.json();
        alert(error.message || "Error al completar perfil");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    if
  );
}
