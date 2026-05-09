import type { Dataset } from "../types/metrics.types";
import {
  formatInteger,
  formatMinutes,
  formatPercentage,
} from "../utils/formatters";

const average = (values: number[]) => {
  if (!values.length) return 0;

  return (
    values.reduce((acc, value) => acc + value, 0) /
    values.length
  );
};

const percentageChange = (
  current: number,
  previous: number
) => {
  if (previous === 0) return 0;

  return ((current - previous) / previous) * 100;
};

export const getExecutiveSummary = (
  dataset: Dataset
) => {
  const days = dataset.days;

  const currentWeek = days.slice(-7);
  const previousWeek = days.slice(-14, -7);

  const sumMetric = (
    range: typeof currentWeek,
    key: string
  ) => {
    return range.reduce((acc, day) => {
      const value = day.metrics[key];

      return acc + (typeof value === "number" ? value : 0);
    }, 0);
  };

  const avgMetric = (
    range: typeof currentWeek,
    key: string
  ) => {
    const values = range
      .map((day) => day.metrics[key])
      .filter(
        (value): value is number =>
          typeof value === "number"
      );

    return average(values);
  };

  const currentWon = sumMetric(
    currentWeek,
    "deals_won"
  );

  const currentLost = sumMetric(
    currentWeek,
    "deals_lost"
  );

  const previousWon = sumMetric(
    previousWeek,
    "deals_won"
  );

  const previousLost = sumMetric(
    previousWeek,
    "deals_lost"
  );

  const currentWinRate =
    currentWon + currentLost === 0
      ? 0
      : currentWon / (currentWon + currentLost);

  const previousWinRate =
    previousWon + previousLost === 0
      ? 0
      : previousWon / (previousWon + previousLost);

  const currentResponseTime = avgMetric(
    currentWeek,
    "avg_response_time_min"
  );

  const previousResponseTime = avgMetric(
    previousWeek,
    "avg_response_time_min"
  );

  const currentQualifiedLeads = sumMetric(
    currentWeek,
    "leads_qualified"
  );

  const previousQualifiedLeads = sumMetric(
    previousWeek,
    "leads_qualified"
  );

  const staleDeals =
    days[days.length - 1]?.metrics["stale_deals"] ?? 0;

  return [
    {
      title: "Win Rate",
      value: formatPercentage(currentWinRate * 100),
      change: percentageChange(
        currentWinRate,
        previousWinRate
      ),
      positive: currentWinRate >= previousWinRate,
    },

    {
      title: "Response Time",
      value: formatMinutes(currentResponseTime),
      change: percentageChange(
        currentResponseTime,
        previousResponseTime
      ),
      positive:
        currentResponseTime <= previousResponseTime,
    },

    {
      title: "Qualified Leads",
      value: formatInteger(currentQualifiedLeads),
      change: percentageChange(
        currentQualifiedLeads,
        previousQualifiedLeads
      ),
      positive:
        currentQualifiedLeads >=
        previousQualifiedLeads,
    },

    {
      title: "Stale Deals",
      value: staleDeals.toString(),
      change: 0,
      positive: staleDeals < 20,
    },
  ];
};