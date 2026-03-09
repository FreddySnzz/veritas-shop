import { Pray } from "@/data/types/pray";

interface PrayContentProps extends React.HTMLAttributes<HTMLDivElement> {
  pray: Pray
};

export default function PrayContent({ pray }: PrayContentProps) {
  return (
    <div className="font-sans">
      <h2 className="font-bold text-secondary text-xl md:text-3xl">
        {pray.title}
      </h2>
      <p className="text-gray-400 text-xs">
        {pray.description}
      </p>
      <div className="mt-4 text-justify">
        {pray.prayer}
      </div>
    </div>
  );
};