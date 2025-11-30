"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
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
    {!user && (
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
    {!user && (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F8F6] py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#111111] text-center">
            Welcome, {user?.firstName || "User"}!
          </CardTitle>
          <CardDescription className="text-center text-[#876A5C]">
            Help us complete your profile with shipping information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username - Solo mostrar si no viene de Clerk o está vacío */}
            {!clerkUsername && (
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a unique username"
                  required
                />
              </div>
            )}

            {/* Mostrar username de Clerk como readonly si existe */}
            {clerkUsername && (
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-[#876A5C] mt-1">
                  Username from your account
                </p>
              </div>
            )}

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#111111] mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                {/* Country Code Selector */}
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="h-9 rounded-md border border-[#D0D3D8] bg-white px-3 text-sm shadow-xs focus:border-[#876A5C] focus:outline-none focus:ring-2 focus:ring-[#876A5C]/20"
                >
                  {countryCodes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.code} {item.country}
                    </option>
                  ))}
                </select>

                {/* Phone Number Input */}
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="555-000-0000"
                  pattern="[0-9\-\s()]+"
                  title="Please enter a valid phone number"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-[#876A5C] mt-1">
                Format: Country code + your phone number
              </p>
            </div>

            {/* Address Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#111111] mb-4">
                Shipping Address
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-2">
                    Street Address
                  </label>
                  <Input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="123 Main St, Apt 4"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      City
                    </label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      pattern="[A-Za-z\s\-']+"
                      title="Please enter a valid city name (letters, spaces, hyphens, and apostrophes only)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      State/Province
                    </label>
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="NY"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      ZIP/Postal Code
                    </label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                      pattern="[0-9A-Za-z\s\-]+"
                      title="Please enter a valid ZIP/Postal code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="h-9 w-full rounded-md border border-[#D0D3D8] bg-white px-3 text-sm shadow-xs focus:border-[#876A5C] focus:outline-none focus:ring-2 focus:ring-[#876A5C]/20"
                    >
                      {countryCodes.map((item) => (
                        <option key={item.country} value={item.country}>
                          {item.flag} {item.country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#876A5C] hover:bg-[#6B5449] text-white"
            >
              {loading ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    )}
 
}

    ): (
      redirect("/")
    )}
  );
}
