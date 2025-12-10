export const CategoryCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full animate-pulse overflow-hidden bg-slate-200"></div>
      <div className="p-6">
        <div className="h-6 w-32 animate-pulse rounded bg-slate-200"></div>
        <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-200"></div>
      </div>
    </div>
  );
};

