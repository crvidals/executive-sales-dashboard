interface Props {
    title: string;
    description: string;
  }
  
  const EmptyState = ({
    title,
    description,
  }: Props) => {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
  
        <p className="mt-2 text-slate-400">
          {description}
        </p>
      </div>
    );
  };
  
  export default EmptyState;