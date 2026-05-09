import type { Dataset } from "../types/metrics.types";

const sumMetric = (
  dataset: Dataset,
  key: string
) => {
  return dataset.days.reduce((acc, day) => {
    const value = day.metrics[key];

    return acc + (typeof value === "number" ? value : 0);
  }, 0);
};

const conversionRate = (
  current: number,
  previous: number
) => {
  if (previous === 0) return 0;

  return (current / previous) * 100;
};

export const getFunnelData = (
  dataset: Dataset
) => {
  const traffic = sumMetric(dataset, "traffic");

  const leads = sumMetric(
    dataset,
    "leads_created"
  );

  const qualifiedLeads = sumMetric(
    dataset,
    "leads_qualified"
  );

  const deals = sumMetric(
    dataset,
    "deals_created"
  );

  const wonDeals = sumMetric(
    dataset,
    "deals_won"
  );

  return [
    {
      label: "Traffic",
      value: traffic,
      conversion: 100,
    },

    {
      label: "Leads",
      value: leads,
      conversion: conversionRate(leads, traffic),
    },

    {
      label: "Qualified",
      value: qualifiedLeads,
      conversion: conversionRate(
        qualifiedLeads,
        leads
      ),
    },

    {
      label: "Deals",
      value: deals,
      conversion: conversionRate(
        deals,
        qualifiedLeads
      ),
    },

    {
      label: "Won",
      value: wonDeals,
      conversion: conversionRate(
        wonDeals,
        deals
      ),
    },
  ];
};