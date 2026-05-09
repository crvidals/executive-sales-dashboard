export type MetricDirection =
  | "higher_is_better"
  | "lower_is_better";

export interface MetricMetadata {
  key: string;
  label: string;
  unit: string;
  direction: MetricDirection;
  description: string;
}

export interface DayMetrics {
  [key: string]: number | null;
}

export interface DayData {
  date: string;
  metrics: DayMetrics;
}

export interface Dataset {
  metadata: {
    start_date: string;
    end_date: string;
    days: number;
    metrics: MetricMetadata[];
  };
  days: DayData[];
}

export interface MetricsData {
  A: Dataset;
  B: Dataset;
  C: Dataset;
  D: Dataset;
}