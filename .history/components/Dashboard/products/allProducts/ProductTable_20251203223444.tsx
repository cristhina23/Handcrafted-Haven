"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useProducts } from "@/contexts/ProductContext";
import Image from "next/image";

interface ProductRow {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
  country?: string;
  rating: string;
  variants?: string;
  custom: string;
  dimensions: string;
  shipping: string;
  image: string | null;
}


export default function ProductTable() {
  const { products, loading } = useProducts();
  const [rows, setRows] = React.useState<([]);

  React.useEffect(() => {
    if (products?.length > 0) {
      const formatted = products.map((p) => ({
        id: p._id,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
        category: p.categoryId,
        country: p.country,
        rating: `${p.rating} ⭐ (${p.ratingCount})`,
        variants: p.variants?.map((v) => `${v.color ?? ""} ${v.size ?? ""}`).join(", "),
        custom: p.isCustomOrder ? "Yes" : "No",
        dimensions: p.dimensions || "—",
        shipping: p.shippingMethods?.join(", "),
        image: p.images?.[0] || null,
      }));

      setRows(formatted);
    }
  }, [products]);

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? (
          <Image
            height={40}
            width={40}
            src={params.value}
            alt="product img"
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <span>No image</span>
        ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      type: "number",
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: 100,
      type: "number",
    },
    {
      field: "category",
      headerName: "Category",
      width: 170,
    },
    {
      field: "country",
      headerName: "Country",
      width: 120,
    },
    {
      field: "variants",
      headerName: "Variants",
      width: 200,
    },
    {
      field: "custom",
      headerName: "Custom Order",
      width: 140,
    },
    {
      field: "dimensions",
      headerName: "Dimensions",
      width: 150,
    },
    {
      field: "shipping",
      headerName: "Shipping Methods",
      width: 200,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 160,
    },
  ];

  if (loading) return <p className="text-white p-4">Loading...</p>;

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{
          backgroundColor: "#1e1e2d",
          color: "white",
          border: "none",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #333",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#2a2a3c",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#2a2a3c",
          },
        }}
      />
    </div>
  );
}
