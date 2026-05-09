import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
  change: number;
  positive: boolean;
}

const SummaryCard = ({
  title,
  value,
  change,
  positive,
}: Props) => {
  const changeColor =
    change === 0
      ? "text-slate-400"
      : positive
      ? "text-emerald-400"
      : "text-red-400";

  return (
    <Card className="border-slate-800 bg-slate-900 text-white transition-all duration-200 hover:border-slate-700 hover:bg-slate-800">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-3">
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <div className="text-3xl font-bold">
            {value}
          </div>

          <div className={`text-sm ${changeColor}`}>
            {change > 0 ? "+" : ""}
            {change.toFixed(1)}% vs last week
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;