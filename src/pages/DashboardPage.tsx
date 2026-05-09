import { useMemo } from "react";
import { useEffect, useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import DatasetSwitcher from "@/components/dashboard/DatasetSwitcher";
import ExecutiveSummary from "@/components/dashboard/ExecutiveSummary";
import InsightsPanel from "@/components/insights/InsightsPanel";
import { metrics } from "@/features/metrics/services/metrics.service";
import { getExecutiveSummary } from "@/features/metrics/selectors/executive-summary.selector";
import { generateInsights } from "@/features/metrics/selectors/insights.selector";
import FunnelAnalysis from "@/components/dashboard/FunnelAnalysis";
import { getFunnelData } from "@/features/metrics/selectors/funnel.selector";
import PerformanceTrends from "@/components/charts/PerformanceTrends";
import { getTrendData } from "@/features/metrics/selectors/trends.selector";

import SummarySkeleton from "@/components/dashboard/SummarySkeleton";

const DashboardPage = () => {
  const [selectedDataset, setSelectedDataset] =
  useState("A");

  const [loading, setLoading] = useState(true);

  const dataset = metrics[selectedDataset as keyof typeof metrics];

  /*const trendData = getTrendData(dataset);

  const summaries = getExecutiveSummary(dataset);

  const insights = generateInsights(dataset);

  const funnelData = getFunnelData(dataset);*/

  const summaries = useMemo(
    () => getExecutiveSummary(dataset),
    [dataset]
  );
  
  const insights = useMemo(
    () => generateInsights(dataset),
    [dataset]
  );
  
  const funnelData = useMemo(
    () => getFunnelData(dataset),
    [dataset]
  );
  
  const trendData = useMemo(
    () => getTrendData(dataset),
    [dataset]
  );

  useEffect(() => {
    setLoading(true);
  
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400);
  
    return () => clearTimeout(timeout);
  }, [selectedDataset]);

  if (!dataset || !dataset.days.length) {
    return (
      <EmptyState
        title="No data available"
        description="The selected dataset does not contain enough information."
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-4xl tracking-tight font-bold">
            Executive Sales Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Daily operational overview for sales and
            customer support performance.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Last updated: {dataset.metadata.end_date}
          </p>
        </div>

        <div className="mb-4">
          <p className="
            text-sm 
            font-medium 
            uppercase 
            tracking-wide 
            text-slate-500">
            Business Scenarios
          </p>
        </div>

        <DatasetSwitcher
          value={selectedDataset}
          onChange={setSelectedDataset}
        />

        {loading ? (
          <SummarySkeleton />
        ) : (
          <ExecutiveSummary summaries={summaries} />
        )}

        <InsightsPanel insights={insights} />

        <FunnelAnalysis data={funnelData} />

        <PerformanceTrends data={trendData} />
      </div>
    </div>
  );
};

export default DashboardPage;