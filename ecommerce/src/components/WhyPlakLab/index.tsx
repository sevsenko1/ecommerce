"use client";

export const WhyPlakLab = () => {
  const items = [
    {
      icon: "📦",
      text: "Her plak anti-statik iç kılıf ve korumalı dış kılıfla özenle paketlenir.",
      delay: "0.1s",
    },
    {
      icon: "🎵",
      text: "AAA mastering sertifikası ve dijital remaster ayrımı her üründe açıkça belirtilir.",
      delay: "0.3s",
    },
    {
      icon: "🔔",
      text: "Sınırlı baskılar için stok bittiğinde otomatik bildirim ve bekleme listesi.",
      delay: "0.5s",
    },
    {
      icon: "💎",
      text: "Koleksiyon değeri taşıyan özel baskılar ve nadir bulunan albümler.",
      delay: "0.7s",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 p-10 backdrop-blur">
      <p className="mb-10 text-center text-xl font-semibold uppercase tracking-[0.3em] text-white/70">
        Neden PlakLab?
      </p>
      <ul className="w-full space-y-6 text-base text-white/90">
        {items.map((item, index) => (
          <li
            key={index}
            className="fade-in-item flex items-start gap-4"
            style={{ animationDelay: item.delay }}
          >
            <span className="mt-1 text-2xl">{item.icon}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

