"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Testimonial } from "@/components/testimonial";
import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ChevronLeft, ChevronRight, X, ZoomIn, Menu } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface FeaturedProduct {
  id: number;
  name: string;
  image: string;
  color: string;
}

interface LaunchedProduct {
  id: number;
  name: string;
  images: string[];
  description: string;
  price: string;
}

export default function Home() {
  const featuredProducts: FeaturedProduct[] = [
    {
      id: 1,
      name: "Almond",
      image: "/images/almond.png",
      color: "bg-amber-800",
    },
    {
      id: 2,
      name: "Cashew",
      image: "/images/cashew.png",
      color: "bg-teal-600",
    },
    {
      id: 3,
      name: "Fuxnuts",
      image: "/images/Fuxnuts-Pudina.png",
      color: "bg-zinc-800",
    },
    {
      id: 4,
      name: "Trail Mix",
      image: "/images/trailmix.png",
      color: "bg-amber-500",
    },
    {
      id: 5,
      name: "Pista",
      image: "/images/pista.png",
      color: "bg-lime-500",
    },
    {
      id: 6,
      name: "Walnut",
      image: "/images/walnut.png",
      color: "bg-rose-800",
    },
    {
      id: 7,
      name: "Raisin",
      image: "/images/raisin.png",
      color: "bg-orange-600",
    },
  ];

  const launchedProducts: LaunchedProduct[] = [
    {
      id: 1,
      name: "Plain Cashew",
      images: ["/images/plain-cashew.png", "/images/back-plain-cashew.png"],
      description: "Premium quality plain cashews, naturally sweet and crunchy",
      price: "₹499",
    },
    {
      id: 2,
      name: "Salted Cashew",
      images: ["/images/salted-cashew.png", "/images/back-salt-cashew.png"],
      description: "Perfectly salted cashews for the perfect snack",
      price: "₹549",
    },
  ];

  // Brand logos for bottom section
  const brandLogos = [
    { id: 1, name: "Amazon", image: "/images/amazon-logo.png" },
    { id: 2, name: "Flipkart", image: "/images/flipkart-logo.png" },
    { id: 3, name: "BigBasket", image: "/images/bigbasket-logo.png" },
    { id: 4, name: "Zepto", image: "/images/zepto-logo.png" },
    { id: 5, name: "Blinkit", image: "/images/blinkit-logo.png" },
    { id: 6, name: "Swiggy", image: "/images/swiggy-logo.png" },
  ];

  const [currentSlides, setCurrentSlides] = useState<Record<number, number>>(
    launchedProducts.reduce((acc: Record<number, number>, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  // Mobile navigation toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Zoom modal states
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomedImageName, setZoomedImageName] = useState<string>("");

  // Premium collection carousel states
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mobile carousel states
  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);
  const [isMobileAutoPlaying, setIsMobileAutoPlaying] = useState(true);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  // Screen size state for responsive behavior
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({ width: 1024, height: 768 }); // Default values for SSR

  // Handle screen resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set initial size
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Get visible products for desktop view with memoization
  const getVisibleProducts = useCallback(() => {
    const productsToShow =
      screenSize.width >= 1024
        ? 4
        : screenSize.width >= 768
          ? 3
          : screenSize.width >= 640
            ? 2
            : 1;
    const startIndex = currentProductIndex;
    const visibleProducts = [];

    for (let i = 0; i < productsToShow; i++) {
      const index = (startIndex + i) % featuredProducts.length;
      visibleProducts.push(featuredProducts[index]);
    }

    return visibleProducts;
  }, [currentProductIndex, screenSize.width, featuredProducts]);

  // Auto-slide for premium collection (desktop)
  useEffect(() => {
    if (!isAutoPlaying || screenSize.width < 640) return;

    const interval = setInterval(() => {
      setCurrentProductIndex((prev) =>
        prev >= featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length, screenSize.width]);

  // Auto-slide for mobile collection
  useEffect(() => {
    if (!isMobileAutoPlaying || screenSize.width >= 640) return;

    const interval = setInterval(() => {
      setMobileCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= featuredProducts.length) {
          return 0;
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobileAutoPlaying, featuredProducts.length, screenSize.width]);

  // Handle mobile carousel scroll
  useEffect(() => {
    if (screenSize.width >= 640 || !mobileCarouselRef.current) return;

    const carousel = mobileCarouselRef.current;
    const cardWidth = 140; // 128px width + 12px gap
    const scrollPosition = mobileCurrentIndex * cardWidth;

    carousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, [mobileCurrentIndex, screenSize.width]);

  // Handle body scroll lock/unlock for modals
  useEffect(() => {
    if (zoomedImage || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [zoomedImage, isMobileMenuOpen]);

  const nextSlide = (productId: number, totalImages: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % totalImages,
    }));
  };

  const prevSlide = (productId: number, totalImages: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [productId]:
        prev[productId] === 0 ? totalImages - 1 : prev[productId] - 1,
    }));
  };

  const nextProduct = () => {
    setIsAutoPlaying(false);
    setCurrentProductIndex((prev) =>
      prev >= featuredProducts.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevProduct = () => {
    setIsAutoPlaying(false);
    setCurrentProductIndex((prev) =>
      prev <= 0 ? featuredProducts.length - 1 : prev - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Mobile carousel navigation
  const nextMobileProduct = () => {
    setIsMobileAutoPlaying(false);
    setMobileCurrentIndex((prev) =>
      prev >= featuredProducts.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsMobileAutoPlaying(true), 5000);
  };

  const prevMobileProduct = () => {
    setIsMobileAutoPlaying(false);
    setMobileCurrentIndex((prev) =>
      prev <= 0 ? featuredProducts.length - 1 : prev - 1
    );
    setTimeout(() => setIsMobileAutoPlaying(true), 5000);
  };

  const openZoom = (imageSrc: string, productName: string) => {
    setZoomedImage(imageSrc);
    setZoomedImageName(productName);
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setZoomedImageName("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Calculate carousel indicators count
  const getIndicatorCount = () => {
    const productsPerPage =
      screenSize.width >= 1024 ? 4 : screenSize.width >= 768 ? 3 : 2;
    return Math.ceil(featuredProducts.length / productsPerPage);
  };

  const getCurrentPageIndex = () => {
    const productsPerPage =
      screenSize.width >= 1024 ? 4 : screenSize.width >= 768 ? 3 : 2;
    return Math.floor(currentProductIndex / productsPerPage);
  };

  const handleIndicatorClick = (index: number) => {
    const productsPerPage =
      screenSize.width >= 1024 ? 4 : screenSize.width >= 768 ? 3 : 2;
    setIsAutoPlaying(false);
    setCurrentProductIndex(index * productsPerPage);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Handle mobile indicator click
  const handleMobileIndicatorClick = (index: number) => {
    setIsMobileAutoPlaying(false);
    setMobileCurrentIndex(index);
    setTimeout(() => setIsMobileAutoPlaying(true), 5000);
  };

  return (
    <>
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              <Link
                href="/"
                className="block py-2 text-lg hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block py-2 text-lg hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="block py-2 text-lg hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-lg hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full">
        <HeroCarousel />
        <div className="container absolute inset-0 flex h-full flex-col items-start justify-center gap-2 sm:gap-3 md:gap-4 text-white z-10 w-full max-w-screen overflow-x-hidden mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            Welcome to Farmlyf
          </h1>
          <p className="max-w-[90%] sm:max-w-[600px] text-sm sm:text-base md:text-lg leading-relaxed">
            Your one-stop destination for premium quality dry fruits. Our
            products are sourced from the finest farms to ensure freshness and
            nutrition in every bite.
          </p>
          <p className="text-base sm:text-lg md:text-xl font-semibold italic">
            &quot;Pure, Nutritious, and Delicious Dry Fruits.&quot;
          </p>
        </div>
      </section>

      {/* Featured Products Carousel with Enhanced Animation */}
      <section className="py-8 sm:py-12 md:py-16 bg-white w-full max-w-screen overflow-x-hidden mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-primary">
            Our Premium Collection
          </h2>

          {/* Enhanced Product Carousel */}
          <div className="relative mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center">
              {/* Desktop Navigation Buttons */}
              <button
                onClick={prevProduct}
                className="absolute left-0 sm:left-2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hidden sm:block group"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-primary transition-colors" />
              </button>

              {/* Desktop Carousel */}
              <div className="hidden sm:block w-full px-12 md:px-16">
                <div className="flex gap-4 md:gap-6 justify-center transition-all duration-500 ease-in-out">
                  {getVisibleProducts().map((product, index) => (
                    <div
                      key={`${product.id}-${currentProductIndex}`}
                      className={`flex-shrink-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl ${product.color} flex flex-col items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer p-4 transform hover:scale-105 animate-slideIn`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-3 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="object-contain w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-transform duration-300 hover:scale-110"
                          style={{
                            filter:
                              "drop-shadow(0 4px 8px rgba(255,255,255,0.2))",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                      <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-center">
                        {product.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Mobile Carousel with Sliding Animation */}
              <div className="block sm:hidden w-full relative">
                {/* Mobile Navigation Buttons */}
                <button
                  onClick={prevMobileProduct}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 group"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                </button>

                <button
                  onClick={nextMobileProduct}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 group"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                </button>

                {/* Mobile Carousel Container */}
                <div className="overflow-hidden px-8 py-8">
                  <div
                    ref={mobileCarouselRef}
                    className="flex gap-3 transition-transform duration-500 ease-in-out scrollbar-hide"
                    style={{
                      transform: `translateX(-${mobileCurrentIndex * 140}px)`,
                    }}
                  >
                    {featuredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className={`flex-shrink-0 w-32 h-32 rounded-xl ${product.color} flex flex-col items-center justify-center text-white shadow-lg cursor-pointer p-3 transition-all duration-500 transform ${
                          index === mobileCurrentIndex
                            ? "scale-105 shadow-xl"
                            : "scale-95 opacity-80"
                        }`}
                      >
                        <div className="w-20 h-20 mb-2 flex items-center justify-center bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-300">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="object-contain w-16 h-16 transition-transform duration-300"
                            style={{
                              filter:
                                "drop-shadow(0 2px 4px rgba(255,255,255,0.1))",
                              maxWidth: "100%",
                              height: "auto",
                            }}
                          />
                        </div>
                        <h3 className="text-xs font-semibold text-center">
                          {product.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleMobileIndicatorClick(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        mobileCurrentIndex === index
                          ? "bg-primary scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to product ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={nextProduct}
                className="absolute right-0 sm:right-2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hidden sm:block group"
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Desktop Carousel Indicators */}
            {screenSize.width >= 640 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: getIndicatorCount() }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      getCurrentPageIndex() === index
                        ? "bg-primary scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Launched Products Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-primary">
              Our Launched Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              {launchedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group">
                    {/* Slide Navigation Buttons */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            prevSlide(product.id, product.images.length)
                          }
                          className="absolute left-2 z-20 bg-white/80 hover:bg-white shadow-md rounded-full p-1.5 transition-all duration-200"
                          aria-label={`Previous image for ${product.name}`}
                        >
                          <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() =>
                            nextSlide(product.id, product.images.length)
                          }
                          className="absolute right-2 z-20 bg-white/80 hover:bg-white shadow-md rounded-full p-1.5 transition-all duration-200"
                          aria-label={`Next image for ${product.name}`}
                        >
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                      </>
                    )}

                    {/* Zoom Button */}
                    <button
                      onClick={() =>
                        openZoom(
                          product.images[currentSlides[product.id]],
                          product.name
                        )
                      }
                      className="absolute top-2 right-2 z-20 bg-white/80 hover:bg-white shadow-md rounded-full p-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label={`Zoom ${product.name} image`}
                    >
                      <ZoomIn className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Product Image */}
                    <div
                      className="cursor-pointer w-full h-full flex items-center justify-center"
                      onClick={() =>
                        openZoom(
                          product.images[currentSlides[product.id]],
                          product.name
                        )
                      }
                    >
                      <Image
                        src={product.images[currentSlides[product.id]]}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-contain max-w-[180px] max-h-[180px] sm:max-w-[150px] sm:max-h-[150px] md:max-w-[180px] md:max-h-[180px] drop-shadow-md transition-all duration-300 group-hover:scale-105"
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>

                    {/* Slide Indicators */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                        {product.images.map((_, index: number) => (
                          <button
                            key={index}
                            onClick={() =>
                              setCurrentSlides((prev) => ({
                                ...prev,
                                [product.id]: index,
                              }))
                            }
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              currentSlides[product.id] === index
                                ? "bg-gray-600"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Image ${index + 1} of ${product.name}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Gift Box Collection */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-primary">
              Premium Gift Box Collection
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
              Perfect for festivals, celebrations, and special occasions. Our
              premium gift boxes contain a curated selection of the finest dry
              fruits.
            </p>
            <div className="relative h-80 sm:h-48 md:h-64 mb-4 sm:mb-6 flex items-center justify-center">
              <Image
                src="/images/gift_product.png"
                alt="Premium Gift Box Collection"
                width={750}
                height={300}
                className="object-contain max-w-[280px] max-h-[160px] sm:max-w-[400px] sm:max-h-[200px] md:max-w-[750px] md:max-h-[300px] drop-shadow-lg"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
              aria-label="Close zoom view"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Product Name */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-full">
              <h3 className="text-sm font-medium text-gray-700">
                {zoomedImageName}
              </h3>
            </div>

            {/* Zoomed Image */}
            <div className="flex items-center justify-center p-8">
              <Image
                src={zoomedImage}
                alt={zoomedImageName}
                width={800}
                height={800}
                className="object-contain max-w-full max-h-[80vh] rounded-lg"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-secondary/60 to-white py-12 sm:py-16 md:py-20 w-full max-w-screen overflow-x-hidden mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 md:mb-14 text-primary">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Testimonial
              quote="Absolutely love the freshness of Farmlyf's cashew. Highly recommend!"
              author="Priya S."
            />
            <Testimonial
              quote="The best dry fruits I've ever had. Great taste and quality!"
              author="Rahul K."
            />
            <Testimonial
              quote="Perfect for gifting! The packaging was elegant and premium."
              author="Ananya M."
            />
          </div>
        </div>
      </section>
    </>
  );
}
