import { DATASET_LABELS } from "@/features/metrics/constants/datasets";
import clsx from "clsx";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const DatasetSwitcher = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Object.entries(DATASET_LABELS).map(
        ([key, dataset]) => {
          const isActive = value === key;

          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={clsx(
                `
                  min-h-[140px]
                  rounded-2xl
                  border
                  p-6
                  text-left
                  transition-all
                  duration-200
                `,
                isActive
                  ? `
                    border-blue-500
                    bg-slate-800
                    shadow-[0_0_30px_rgba(59,130,246,0.15)]
                  `
                  : `
                    border-slate-800
                    bg-slate-900
                    hover:border-slate-700
                    hover:bg-slate-800
                  `
              )}
            >
              <div className="space-y-3">
                <div className="text-lg font-semibold text-white">
                  {dataset.title}
                </div>

                <div className="text-sm leading-relaxed text-slate-400">
                  {dataset.description}
                </div>
              </div>
            </button>
          );
        }
      )}
    </div>
  );
};

export default DatasetSwitcher;