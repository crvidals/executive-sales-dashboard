import type { Dataset } from "../types/metrics.types";

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

export const generateInsights = (
  dataset: Dataset
) => {
  const insights: string[] = [];

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

  const winRateChange = percentageChange(
    currentWinRate,
    previousWinRate
  );

  if (winRateChange < -10) {
    insights.push(
      `Win rate declined ${Math.abs(
        winRateChange
      ).toFixed(
        1
      )}% compared to the previous week.`
    );
  }

  const currentResponseTime = avgMetric(
    currentWeek,
    "avg_response_time_min"
  );

  const previousResponseTime = avgMetric(
    previousWeek,
    "avg_response_time_min"
  );

  const responseChange = percentageChange(
    currentResponseTime,
    previousResponseTime
  );

  if (responseChange > 15) {
    insights.push(
      `Response time increased ${responseChange.toFixed(
        1
      )}% week-over-week.`
    );
  }

  const currentQualifiedLeads = sumMetric(
    currentWeek,
    "leads_qualified"
  );

  const previousQualifiedLeads = sumMetric(
    previousWeek,
    "leads_qualified"
  );

  const leadChange = percentageChange(
    currentQualifiedLeads,
    previousQualifiedLeads
  );

  if (leadChange > 10) {
    insights.push(
      `Qualified lead generation improved ${leadChange.toFixed(
        1
      )}% this week.`
    );
  }

  const staleDeals =
    days[days.length - 1]?.metrics["stale_deals"] ?? 0;

  if (
    typeof staleDeals === "number" &&
    staleDeals > 50
  ) {
    insights.push(
      `Stale deals remain elevated with ${staleDeals} aging opportunities still open.`
    );
  }

  const supportTickets = sumMetric(
    currentWeek,
    "support_tickets_opened"
  );

  if (supportTickets > 150) {
    insights.push(
      "Support ticket volume is unusually high this week."
    );
  }

  if (insights.length === 0) {
    insights.push(
      "Operational performance remains stable across key metrics."
    );
  }

  return insights;
};