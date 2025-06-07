"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, X } from "lucide-react";
import { CldImage } from "next-cloudinary";

import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { ProductsContext } from "@/context/productContext";
import { useSession } from "next-auth/react";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setSelectedProducts } = useContext(ProductsContext);
  const { data: session } = useSession();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const addToCart = () => {
    if (!session) return;
    setSelectedProducts((prev: string[]) => [...prev, product.id]);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-lg border">
        <div
          className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer p-4"
          onClick={openPopup}
        >
          <CldImage
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform group-hover:scale-110 lazyload"
            loading="lazy"
            placeholder="blur"
            blurDataURL={"/images/Asset 26BW.png"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 rounded-lg" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold tracking-tight">{product.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative aspect-square md:aspect-auto bg-gray-50 p-6">
                <CldImage
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Product Details Section */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 capitalize">
                      {product.category}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2"></div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
