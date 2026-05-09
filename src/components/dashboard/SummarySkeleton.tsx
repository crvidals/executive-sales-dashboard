const SummarySkeleton = () => {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-slate-800 bg-slate-900"
          />
        ))}
      </div>
    );
  };
  
  export default SummarySkeleton;