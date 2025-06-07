"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = ["/images/HS-1.png", "/images/HS-2.png", "/images/HS-3.png"];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Extended images with a clone of the first image at the end
  const extendedImages = [...images, images[0]];

  // Auto-advance logic
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(true);
    }, 2500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  // Handle transition end to reset position when at clone
  const handleTransitionEnd = () => {
    if (current === images.length) {
      setIsTransitioning(false); // disable transition
      setCurrent(0); // jump to first image
    }
  };

  // Re-enable transition after the jump
  useEffect(() => {
    if (!isTransitioning) {
      // Next tick, re-enable transition
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full max-w-screen overflow-x-hidden ">
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: isTransitioning ? "transform 700ms ease" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((src, idx) => (
          <div key={idx} className="w-full flex-shrink-0 h-[500px] relative">
            <Image
              src={src}
              alt={`Hero Slide ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
