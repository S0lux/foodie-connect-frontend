import { ArrowDown, ArrowUp } from "lucide-react";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  icon: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  icon,
}) => {
  return (
    <div className="px-7.5 rounded-sm border border-gray-300 border-opacity-50 bg-transparent p-6 shadow-lg">
      <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-slate-200 dark:bg-slate-50">
        {React.cloneElement(icon as React.ReactElement, {
          className: "text-primary",
        })}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${levelUp ? "text-green-500" : ""} ${levelDown ? "text-red-500" : ""}`}
        >
          {rate}

          {levelUp && <ArrowUp className="size-4 text-green-500" />}
          {levelDown && <ArrowDown className="size-4 text-red-500" />}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
