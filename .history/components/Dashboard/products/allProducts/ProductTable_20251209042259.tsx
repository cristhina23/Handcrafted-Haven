"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditProductModal from "../EditProductModal";
import { Product } from "@/types";
import { useProducts } from "@/contexts/SellerProductsContext";
import StarsRating from "@/components/ProductPage/StarsRating";

export default function ProductTableShadCN() {
  const { products, loading, refreshProducts, deleteProduct } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const isEmpty = currentProducts.length === 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    await deleteProduct(productToDelete._id);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
    await refreshProducts();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="overflow-x-auto rounded-md shadow-2xl">
      
        
      

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
        <thead className="bg-slate-200 dark:bg-gray-800" >
          <tr>
            <th className="p-4 text-left w-20">Image</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left ">Rating</th>
            <th className="p-4 text-left w-26">Price</th>
            <th className="p-4 text-left w-20">Qty</th>
            <th className="p-4 text-center w-32">Actions</th>
          </tr>
        </thead>
        {isEmpty ? (
        <tbody>
          <tr>
            <td
              colSpan={6}
              className="p-8 text-center darktext-slate-500 dark:text-gray-400"
            >
              No products found.
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {currentProducts.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <td className="p-2 flex justify-center">
                {p.images?.[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="p-4">{p.title}</td>
              <td className="p-4 flex gap-4"><StarsRating rating={p.rating} />{p.rating}</td>
              <td className="p-4">${p.price.toFixed(2)}</td>
              <td className="p-4">{p.quantity}</td>
              <td className="p-4 flex justify-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleEditProduct(p)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDeleteProduct(p)} className="text-red-500">
                  <Delete className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      )}
      </table>
      

      {/* PAGINACION */}
      <div className="flex justify-between items-center mt-4 p-2">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>

      {/* Edit Modal */}
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

      {/* Delete Modal */}
      {isDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">
              Confirm Delete
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete <strong>{productToDelete.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
