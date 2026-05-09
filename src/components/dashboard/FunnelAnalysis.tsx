import { Card, CardContent } from "@/components/ui/card";

interface FunnelItem {
  label: string;
  value: number;
  conversion: number;
}

interface Props {
  data: FunnelItem[];
}

const FunnelAnalysis = ({ data }: Props) => {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">
              Funnel Analysis
            </h2>

            <p className="mt-1 text-slate-400">
              End-to-end conversion performance across
              the sales pipeline.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {data.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 transition-all duration-200 hover:border-slate-700"
              >
                <div className="space-y-3">
                  <div className="text-sm text-slate-400">
                    {item.label}
                  </div>

                  <div className="text-2xl font-bold">
                    {item.value.toLocaleString()}
                  </div>

                  <div className="text-sm text-emerald-400">
                    {item.conversion.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelAnalysis;