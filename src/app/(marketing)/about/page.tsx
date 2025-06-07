"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  ArrowLeftRight,
  Leaf,
  ShieldCheck,
  Sprout,
  Truck,
  Target,
  Eye,
} from "lucide-react";

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for the slider
  const images = [
    "/images/about_image/Almond.jpg",
    "/images/about_image/Cashews.jpg",
    "/images/about_image/Fuxnut.jpg",
    "/images/about_image/Raisins.jpg",
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container py-12 w-full max-w-screen overflow-x-hidden mx-auto px-2 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Farmlyf
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          From farm to table - our journey of bringing you the finest dry fruits
        </p>
      </div>

      <div className="grid gap-12">
        {/* Mission & Vision Section */}

        {/* Our Story Section with Sliding Images */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              About Farmlyf
            </h2>
            <p className="text-muted-foreground mb-4">
              At Farmlyf, we believe that great taste begins at the root — with
              the farmer. We are a farmer-first brand committed to bringing you
              premium dry fruits sourced directly from trusted farms across
              India. By eliminating middlemen and embracing ethical sourcing, we
              ensure that every bite is packed with natural goodness,
              transparency, and trust.
            </p>
            <p className="text-muted-foreground mb-4">
              We work hand-in-hand with farming communities to uphold purity,
              freshness, and sustainability at every stage — from soil to shelf.
              Whether it's almonds from the hills or cashews from the coast, our
              products carry the essence of honest farming and modern
              processing.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">100% Natural Products</span>
            </div>
          </div>

          {/* Image Slider Container */}
          <div className="relative h-80 rounded-lg overflow-hidden group">
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                    index === currentImageIndex
                      ? "translate-x-0"
                      : index < currentImageIndex
                        ? "-translate-x-full"
                        : "translate-x-full"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Farmley story ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows (appear on hover) */}
            <button
              onClick={() =>
                setCurrentImageIndex(
                  currentImageIndex === 0
                    ? images.length - 1
                    : currentImageIndex - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() =>
                setCurrentImageIndex(
                  currentImageIndex === images.length - 1
                    ? 0
                    : currentImageIndex + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center leading-relaxed">
                To create a fair, transparent, and sustainable dry fruit
                ecosystem by connecting consumers with farmers through
                quality-first, ethically sourced products.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/50">
            <CardHeader className="text-center">
              <Eye className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center leading-relaxed">
                To become India's most trusted and responsible dry fruit brand
                by empowering farmers, minimizing environmental impact, and
                delivering unmatched purity to every household.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Sustainability Section */}
        <section className="bg-secondary rounded-lg p-8">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Our Sustainability Promise
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Sprout className="h-10 w-10 text-green-500" />
                <CardTitle>Eco-Friendly Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Minimizing carbon footprints and reducing waste through
                  sustainable packaging and logistics.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-blue-500" />
                <CardTitle> Ethical Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Partnering with small-scale farmers and cooperatives across
                  India to ensure fair wages, empowerment, and consistent
                  income.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 text-orange-500" />
                <CardTitle>Sustainable Packaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Using recyclable and biodegradable materials to protect both
                  your food and our planet.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ArrowLeftRight className="h-10 w-10 text-blue-500" />
                <CardTitle>Minimal Waste Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From farm to packaging, we optimize processes to reduce food
                  and material waste at every step.{" "}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Image
                  src={"/images/fssai.webp"}
                  alt="fssai"
                  height={100}
                  width={100}
                  className="bg-white"
                />
                <CardTitle>FSSAI Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground"></p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Why Choose Farmlyf
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Premium Quality: Sourced from the best farms, processed with utmost care",
              "No Additives: Pure, natural goodness in every bite",
              "Certified Excellence: Compliant with industry standards",
              "Customer-Centric: Dedicated support for seamless shopping",
            ].map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground mt-1 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
