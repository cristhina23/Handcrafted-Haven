"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";

import Image from "next/image";
import { useProducts } from "@/contexts/SellerProductsContext";
import { Delete, Edit } from "lucide-react";
import StarsRating from "@/components/ProductPage/StarsRating";

interface ProductRow {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string | null;
}

export default function ProductTable() {
  const theme = useTheme();
  const { products, loading } = useProducts();
  const [rows, setRows] = React.useState<ProductRow[]>([]);
  /* console.log(products); */
  React.useEffect(() => {
    if (products?.length > 0) {
      const formatted = products.map((p) => ({
        id: p._id,
        title: p.title,
        rating: p.rating,
        price: p.price,
        quantity: p.quantity,
        image: p.images?.[0] || null,
      }));
      setRows(formatted);
    }
  }, [products]);

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? (
          <Image
            height={45}
            width={45}
            src={params.value}
            alt="product"
            className="rounded-md object-cover"
          />
        ) : (
          <span className="text-gray-400">N/A</span>
        ),
    },
    { 
      field: "title", 
      headerName: "Title", 
      flex: 1, 
      minWidth: 150 },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.7,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex items-center gap-2">
          <StarsRating rating={params.value || 0} />
          <span>{params.value?.toFixed(1) ?? "0.0"}</span>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      minWidth: 120,
      type: "number",
      
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: 100,
      type: "number",
    },
    {
      field: "actions",
      headerName: "",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-1">
          <IconButton size="small" onClick={() => console.log("Edit", params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => console.log("Delete", params.row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div style={{ height: 520, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${
              theme.palette.mode === "dark" ? "#333" : "#e5e5e5"
            }`,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#1f1f2e" : "#f5f5f7",
            color: theme.palette.text.primary,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#1f1f2e" : "#f5f5f7",
          },
        }}
      />
    </div>
  );
}
