import Image from "next/image";
import Link from "next/link";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white"
    >
      <div className="relative h-56 w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width:768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">
          raf
        </p>
        <h3 className="text-2xl font-semibold">{category.name}</h3>
        <p className="text-sm text-white/80">{category.description}</p>
      </div>
    </Link>
  );
};

