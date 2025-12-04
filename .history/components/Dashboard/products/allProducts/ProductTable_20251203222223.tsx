"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { useProducts } from "@/context/ProductContext";

export default function ProductTable() {
  const { products, loading } = useProducts();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (products?.length > 0) {
      const formatted = products.map((p) => ({
        id: p._id,
        title: p.title,
        price: p.price,
        stock: p.stock,
        category: p.category,
      }));
      setRows(formatted);
    }
  }, [products]);

  const handleRowUpdate = (newRow: GridRowModel) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);

    console.log("Updated row:", newRow);
    return newRow;
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: true,
    },
  ];

  if (loading) return <p className="text-white p-4">Loading...</p>;

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
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
        processRowUpdate={handleRowUpdate}
      />
    </div>
  );
}
