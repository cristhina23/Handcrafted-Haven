"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/contexts/SellerProductsContext";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: any; // luego si quieres lo tipamos mejor con tu interfaz Product
}
const categories = [
  { id: "textile_id_here", name: "Textile" },
  { id: "jewelry_id_here", name: "Jewelry" },
  { id: "accessories_id_here", name: "Accessories" },
  { id: "art_id_here", name: "Art" },
  { id: "homedecor_id_here", name: "Home Decor" },
];

export function EditProductModal({ open, onClose, product }) {
  const { updateProduct } = useProducts();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    images: [],
    country: "",
    categoryId: "",
    dimensions: "",
    isCustomOrder: false,
    shippingMethods: [],
    variants: [{ color: "", size: "", material: "" }],
  });

  // Load product into state
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        images: product.images,
        country: product.country || "",
        categoryId: product.categoryId,
        dimensions: product.dimensions || "",
        isCustomOrder: product.isCustomOrder,
        shippingMethods: product.shippingMethods || [],
        variants: product.variants?.length
          ? product.variants
          : [{ color: "", size: "", material: "" }],
      });
    }
  }, [product]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateVariant(index, key, value) {
    const newVariants = [...form.variants];
    newVariants[index][key] = value;
    setForm((prev) => ({ ...prev, variants: newVariants }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await updateProduct(product._id, form);

    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
            />
          </div>

          {/* PRICE & QUANTITY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => updateField("price", Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) => updateField("quantity", Number(e.target.value))}
                required
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <Label>Category</Label>
            <select
              className="border p-2 rounded w-full"
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* COUNTRY */}
          <div>
            <Label>Country</Label>
            <Input
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
            />
          </div>

          {/* DIMENSIONS */}
          <div>
            <Label>Dimensions</Label>
            <Input
              value={form.dimensions}
              onChange={(e) => updateField("dimensions", e.target.value)}
            />
          </div>

          {/* SHIPPING METHODS */}
          <div>
            <Label>Shipping Methods</Label>
            <div className="flex gap-4">
              {["normal", "express"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.shippingMethods.includes(method)}
                    onChange={(e) => {
                      const newMethods = e.target.checked
                        ? [...form.shippingMethods, method]
                        : form.shippingMethods.filter((m) => m !== method);

                      updateField("shippingMethods", newMethods);
                    }}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          {/* CUSTOM ORDER */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isCustomOrder}
              onChange={(e) => updateField("isCustomOrder", e.target.checked)}
            />
            <Label>Custom Order Available</Label>
          </div>

          {/* VARIANTS */}
          <div>
            <Label>Variants</Label>

            {form.variants.map((v, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 mt-2">
                <Input
                  placeholder="Color"
                  value={v.color}
                  onChange={(e) => updateVariant(index, "color", e.target.value)}
                />
                <Input
                  placeholder="Size"
                  value={v.size}
                  onChange={(e) => updateVariant(index, "size", e.target.value)}
                />
                <Input
                  placeholder="Material"
                  value={v.material}
                  onChange={(e) =>
                    updateVariant(index, "material", e.target.value)
                  }
                />
              </div>
            ))}

            <Button
              type="button"
              className="mt-2"
              onClick={() =>
                updateField("variants", [
                  ...form.variants,
                  { color: "", size: "", material: "" },
                ])
              }
            >
              + Add Variant
            </Button>
          </div>

          {/* SUBMIT */}
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
