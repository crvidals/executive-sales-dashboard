import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  import { Card, CardContent } from "@/components/ui/card";
  
  interface TrendItem {
    date: string;
    winRate: number;
    responseTime: number;
  }
  
  interface Props {
    data: TrendItem[];
  }
  
  const chartClass =
    "rounded-xl border border-slate-800 bg-slate-950 p-4";
  
  const PerformanceTrends = ({
    data,
  }: Props) => {
    return (
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-4 md:p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">
                Win Rate Trend
              </h2>
  
              <p className="mt-1 text-slate-400">
                Daily close rate over the last 30 days.
              </p>
            </div>
  
            <div className={chartClass}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={data}>
                  <CartesianGrid
                    stroke="#334155"
                    strokeDasharray="3 3"
                  />
  
                  <XAxis dataKey="date" />
  
                  <YAxis />
  
                  <Tooltip />
  
                  <Line
                    type="monotone"
                    dataKey="winRate"
                    stroke="#4ade80"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
  
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="p-6 → p-4 md:p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">
                Response Time Trend
              </h2>
  
              <p className="mt-1 text-slate-400">
                Sales response latency across the last 30
                days.
              </p>
            </div>
  
            <div className={chartClass}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={data}>
                  <CartesianGrid
                    stroke="#334155"
                    strokeDasharray="3 3"
                  />
  
                  <XAxis dataKey="date" />
  
                  <YAxis />
  
                  <Tooltip />
  
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default PerformanceTrends;