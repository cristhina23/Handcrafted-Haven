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
  title: string;
  price: number;
  quantity: number;
  rating: string;
  image: string | null;
}


export default function ProductTable() {
  const { products, loading } = useProducts();
  const [rows, setRows] = React.useState<ProductRow[]>([]);

  React.useEffect(() => {
    if (products?.length > 0) {
      const formatted = products.map((p) => ({
        title: p.title,
        price: p.price,
        quantity: p.quantity,
        rating: `${p.rating} ⭐ (${p.ratingCount})`,
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
          backgroundColor: "#G",
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
