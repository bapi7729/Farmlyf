"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/product-card";
import { Products } from "@/lib/constants";
import { Search } from "lucide-react";
import { Product } from "@/lib/constants";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product");

        if (!response.data?.products) {
          console.warn("No 'products' field in response data");
        }

        setProducts(response.data.products || []);
      } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function to get category from product title
  const getCategoryFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("almond")) return "almonds";
    if (lowerTitle.includes("cashew")) return "cashews";
    if (lowerTitle.includes("raisin")) return "raisins";
    if (lowerTitle.includes("trail") || lowerTitle.includes("mix"))
      return "trailmix";
    if (lowerTitle.includes("fuxnut")) return "fuxnuts";

    return "other";
  };

  // Filtered products based on search term and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => {
        const productCategory = getCategoryFromTitle(product.title);
        return productCategory === selectedCategory;
      });
    }

    return filtered;
  }, [products, searchTerm, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div className="container py-12 w-full max-w-screen overflow-x-hidden mx-auto px-2 md:px-8 lg:px-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Our Premium Dry Fruits
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our carefully curated selection of premium dry fruits
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-[300px]">
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="almonds">Almonds</SelectItem>
            <SelectItem value="cashews">Cashews</SelectItem>
            <SelectItem value="raisins">Raisins</SelectItem>
            <SelectItem value="trailmix">Mixture</SelectItem>
            <SelectItem value="fuxnuts">Fuxnuts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results summary */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {loading
            ? "Loading products..."
            : `Showing ${filteredProducts.length} of ${products.length} products`}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Products grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
              <div className="bg-gray-200 rounded h-4 mb-2"></div>
              <div className="bg-gray-200 rounded h-4 w-3/4"></div>
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        ) : (
          // No results found
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
