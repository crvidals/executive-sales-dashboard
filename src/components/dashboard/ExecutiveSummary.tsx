import SummaryCard from "./SummaryCard";

interface Summary {
  title: string;
  value: string;
  change: number;
  positive: boolean;
}

interface Props {
  summaries: Summary[];
}

const ExecutiveSummary = ({
  summaries,
}: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaries.map((summary) => (
        <SummaryCard
          key={summary.title}
          {...summary}
        />
      ))}
    </div>
  );
};

export default ExecutiveSummary;