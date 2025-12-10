export const ProductCardSkeleton = () => {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="relative h-64 w-full animate-pulse overflow-hidden bg-slate-200"></div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="h-3 w-20 animate-pulse rounded bg-slate-200"></div>
          <div className="mt-2 h-5 w-32 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-24 animate-pulse rounded bg-slate-200"></div>
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200"></div>
          </div>
          <div className="h-10 w-24 animate-pulse rounded-full bg-slate-200"></div>
        </div>
      </div>
    </article>
  );
};

