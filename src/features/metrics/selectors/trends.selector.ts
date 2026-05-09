import type { Dataset } from "../types/metrics.types";

export const getTrendData = (
  dataset: Dataset
) => {
  return dataset.days.slice(-30).map((day) => {
    const won = day.metrics.deals_won ?? 0;
    const lost = day.metrics.deals_lost ?? 0;

    const totalClosed = won + lost;

    const winRate =
      totalClosed === 0
        ? 0
        : (won / totalClosed) * 100;

    return {
      date: day.date.slice(5),
      winRate,
      responseTime:
        day.metrics.avg_response_time_min ?? 0,
    };
  });
};