import { Card, CardContent } from "@/components/ui/card";

interface Props {
  insights: string[];
}

const InsightsPanel = ({ insights }: Props) => {
  return (
    <Card className="bg-slate-900 border-slate-800 text-white">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">
              What needs attention today
            </h2>

            <p className="text-slate-400 mt-1">
              Automated operational insights based on
              recent performance trends.
            </p>
          </div>

          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-slate-200"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;