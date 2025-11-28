/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 
import React, { useState, useEffect } from "react";
import ProductInfo from "./productDescription/ProductInfo";
import ProductGallery from "./productGallery/ProductGallery";
import ProductReviews from "./ProductReviews";
import AddToCartModal from "./AddToCartModal";
import PopularProducts from "./PopularProducts";
import { Product } from "@/types";
import ProductDescription from "./ProductDescription";

interface Props {
  productId: string;
}

export default function ProductPageContainer({ productId }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
     async function fetchData() {
      try {
        // step 1 get product
        const resProduct = await fetch(`/api/products/${productId}`);
        const dataProduct = await resProduct.json();

        setProduct(dataProduct);

        if (dataProduct) {
          // step 2 get seller
          const resSeller = await fetch(`/api/sellers/${dataProduct.sellerId}`);
          const dataSeller = await resSeller.json();
          setSeller(dataSeller);

          console.log("PRODUCT ===>", dataProduct);
          console.log("SELLER ID ===>", dataProduct.sellerId);

          // step 3 get category
          const resCategory = await fetch(`/api/categories/${dataProduct.categoryId}`);
          const dataCategory = await resCategory.json();
          setCategory(dataCategory);

          // step 4 get reviews
          const resReviews = await fetch(`/api/reviews/${dataProduct._id}`);
          const dataReviews = await resReviews.json();
          setReviews(Array.isArray(dataReviews) ? dataReviews : []);
          console.log("REVIEWS ===>", dataReviews);

          
          
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  const handleAddToCart = (options: { color: string; size: string; quantity: number }) => {
    console.log("Adding to cart:", options);
    setModalOpen(false);
    // TODO: integrate the global context for the cart
  };

  return (
    <div className="max-w-6xl mx-auto p-0 md:p-9 flex flex-col gap-10 ">
      {/* Gallery + Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <ProductGallery images={product.images} />
        <ProductInfo
          title={product.title}
          description={product.description}
          price={product.price}
          rating={product.rating}
          ratingCount={product.ratingCount}
          location={product.country}
          seller={seller.shopName}
          category={category.name}
          stock={product.quantity}
          colors={product.variants?.map((v) => v.color).filter((c): c is string => Boolean(c)) || []}
          dimensions={product.dimensions}
          onAddToCart={() => setModalOpen(true)}
        />
      </div>

      <ProductDescription description={product.description} />
      <ProductReviews reviews={reviews} />
     
      <PopularProducts grid={3}  />
       
      {/* Modal 
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddToCart}
        colors={product.colors || ["Default"]}
        sizes={product.sizes || ["S", "M", "L"]}
      />
      */}
    </div>
  );
}
