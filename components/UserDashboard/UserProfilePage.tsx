"use client";

import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phone: "",
    image: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [dbUser, setDbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false); 

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/user/me");
      const data = await res.json();

      if (data.user) {
        setDbUser(data.user);
        setForm({
          fullName: data.user.fullName || "",
          username: data.user.username || "",
          phone: data.user.phone || "",
          image: data.user.image || "",
          address: {
            street: data.user.address?.street || "",
            city: data.user.address?.city || "",
            state: data.user.address?.state || "",
            zipCode: data.user.address?.zipCode || "",
            country: data.user.address?.country || "",
          },
        });
      }

      setLoading(false);
    }
    loadUser();
  }, []);

  async function saveChanges() {
    setSaving(true);

    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setDbUser(data.user);
    setSaving(false);
    setEditMode(false); 
  }

  function cancelEdit() {
    setForm({
      fullName: dbUser.fullName || "",
      username: dbUser.username || "",
      phone: dbUser.phone || "",
      image: dbUser.image || "",
      address: {
        street: dbUser.address?.street || "",
        city: dbUser.address?.city || "",
        state: dbUser.address?.state || "",
        zipCode: dbUser.address?.zipCode || "",
        country: dbUser.address?.country || "",
      },
    });

    setEditMode(false); 
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Profile</h1>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-400 rounded text-white"
            >
              Cancel
            </button>

            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4">
        <div className="flex items-center gap-6">
          <img
            src={form.image || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border object-cover"
          />

          <div>
            <p><strong>Email:</strong> {dbUser.email}</p>
            <p><strong>Role:</strong> {dbUser.role?.join(", ")}</p>
            <p><strong>Joined:</strong> {new Date(dbUser.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4">

        <label className="flex flex-col">
          Full Name
          <input
            disabled={!editMode}
            className="border p-2 rounded disabled:opacity-50"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          Username
          <input
            disabled={!editMode}
            className="border p-2 rounded disabled:opacity-50"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          Phone Number
          <input
            disabled={!editMode}
            className="border p-2 rounded disabled:opacity-50"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
        </label>

        <label className="flex flex-col">
          Profile Image URL
          <input
            disabled={!editMode}
            className="border p-2 rounded disabled:opacity-50"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
          />
        </label>

        {Object.entries(form.address).map(([key, value]) => (
          <label key={key} className="flex flex-col capitalize">
            {key}
            <input
              disabled={!editMode}
              className="border p-2 rounded disabled:opacity-50"
              value={value}
              onChange={e =>
                setForm({
                  ...form,
                  address: { ...form.address, [key]: e.target.value },
                })
              }
            />
          </label>
        ))}
      </div>
    </div>
  );
}
