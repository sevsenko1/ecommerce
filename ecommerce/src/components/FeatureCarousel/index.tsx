"use client";

import { useEffect, useState } from "react";

const features = [
  {
    title: "AAA Mastering",
    description:
      "Analog banttan kesilen orijinal mastering ile basılan plaklar. Her ürün mastering kaynağı açıkça belirtilir.",
    icon: "🎵",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Özel Paketleme",
    description:
      "Her sipariş anti-statik iç kılıf, korumalı dış kılıf ve nem bariyeri ile özenle paketlenir.",
    icon: "📦",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Koleksiyon Değeri",
    description:
      "Sınırlı baskılar ve nadir albümler için bildirim sistemi ve bekleme listesi yönetimi.",
    icon: "💎",
    color: "from-amber-500 to-orange-500",
  },
];

export const FeatureCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  return (
    <section id="feature-carousel" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-lg">
      <div className="relative h-56 lg:h-48">
        {features.map((feature, index) => {
          const offset = index - currentIndex;
          const isActive = index === currentIndex;

          let translateX = "100%";
          if (isActive) {
            translateX = "0%";
          } else if (offset === -1 || (offset === features.length - 1 && direction === "left")) {
            translateX = "-100%";
          } else if (offset === 1 || (offset === -(features.length - 1) && direction === "right")) {
            translateX = "100%";
          }

          return (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${translateX})`,
                opacity: isActive ? 1 : 0,
              }}
            >
              <div className="flex h-full flex-col items-center justify-center space-y-5 text-center">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-4xl shadow-xl transition-transform duration-500 ${
                    isActive ? "scale-100" : "scale-75"
                  }`}
                >
                  {feature.icon}
                </div>
                <div className="space-y-3">
                  <span className="block text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
                    {feature.title}
                  </span>
                  <p className="mx-auto max-w-md text-base leading-relaxed text-slate-700">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots indicator */}
      <div className="mt-8 flex justify-center gap-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-10 bg-gradient-to-r from-slate-900 to-slate-700"
                : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

