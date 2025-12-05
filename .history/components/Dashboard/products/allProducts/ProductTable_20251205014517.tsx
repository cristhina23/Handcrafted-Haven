"use client";

import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";

import Image from "next/image";
import { Delete, Edit } from "lucide-react";
import StarsRating from "@/components/ProductPage/StarsRating";
import EditProductModal from "../EditProductModal";
import { Variant, Product } from "@/types";
import { useProducts } from "@/contexts/SellerProductsContext";
import { Button } from "@/components/ui/button";

// Solo para la tabla (una fila resumida)
interface ProductRow {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string | null;
}

export default function ProductTable() {
  const theme = useTheme();
  const { products, loading, refreshProducts, deleteProduct } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateDark();

    const observer = new MutationObserver(updateDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Derivar filas para la tabla (solo primera imagen para la celda)
  const rows: ProductRow[] = products?.map((p) => ({
    id: p._id,
    title: p.title,
    price: Number(p.price.toFixed(2)),
    quantity: p.quantity || 0,
    image: p.images?.[0] || null, // primera imagen
  })) || [];

  // Abrir modal con el producto completo desde el contexto
  const handleEditProduct = (productId: string) => {
    const fullProduct = products.find((p) => p._id === productId);
    if (!fullProduct) return;

    setSelectedProduct(fullProduct);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    const fullProduct = products.find((p) => p._id === productId);
    if (!fullProduct) return;

    setProductToDelete(fullProduct);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    await deleteProduct(productToDelete._id);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? (
          <Image
            height={50}
            width={50}
            src={params.value}
            alt="product"
            className="rounded-md object-cover"
          />
        ) : (
          <span className="text-gray-400">N/A</span>
        ),
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    {
      field: "price",
      headerName: "Price",
      flex: 0.3,
      minWidth: 90,
      type: "number",
    },
    {
      field: "quantity",
      headerName: "Qty",
      flex: 0.3,
      minWidth: 80,
      type: "number",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 90,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-1 items-center justify-center mt-3">
          <IconButton
            size="small"
            onClick={() => handleEditProduct(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteProduct(params.row.id)}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  const darkColors = {
  background: "#0f172a",      
  cellBorder: "#94a3b8",      
  headerBg: "#0f172a",        
  headerText: "#cbd5e1",      
  footerBg: "#0f172a",        
  text: "#cbd5e1",            
};

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="w-full min-w-0 ">
      <div className="overflow-x-auto ">
        <div style={{ height: 520, width: "100%", minWidth: 650 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            getRowSpacing={() => ({
              top: 8,
              bottom: 8,
            })}
            sx={{
              border: "none",
              backgroundColor: isDark ? darkColors.background : "#f5f5f7",
              color: isDark ? darkColors.text : "#1f1f2e",
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${isDark ? darkColors.cellBorder : "#e5e5e5"}`,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDark ? darkColors.headerBg : "#f5f5f7",
                color: isDark ? darkColors.headerText : "#1f1f2e",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: isDark ? darkColors.footerBg : "#f5f5f7",
              },
            }}


          />
        </div>
      </div>

      {/* Modal para editar producto */}
      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={async (updatedProduct) => {
          await fetch("/api/products/" + updatedProduct._id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
          });

          await refreshProducts();
          setIsModalOpen(false);
        }}
      />

       {/* Modal de confirmación para eliminar */}
      {isDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Confirm Delete</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              Are you sure you want to delete <strong>{productToDelete.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" color="error" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
