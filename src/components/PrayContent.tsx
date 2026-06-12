import { Pray } from "@/data/types/pray";

interface PrayContentProps extends React.HTMLAttributes<HTMLDivElement> {
  pray: Pray
};

export default function PrayContent({ pray }: PrayContentProps) {
  return (
    <div className="font-sans">
      <h2 className="font-bold text-secondary dark:text-zinc-50 text-xl md:text-3xl">
        {pray.title}
      </h2>
      <p className="text-gray-400 dark:text-zinc-500 text-xs">
        {pray.description}
      </p>
      <div className="mt-4 text-justify dark:text-zinc-400">
        {pray.prayer}
      </div>
    </div>
  );
};