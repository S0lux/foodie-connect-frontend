import { ArrowDown, ArrowUp } from "lucide-react";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  icon: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  icon,
}) => {
  return (
    <div className="px-7.5 rounded-sm border border-gray-300 border-opacity-50 bg-transparent p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-slate-200 dark:bg-slate-50">
          {React.cloneElement(icon as React.ReactElement, {})}
        </div>
        <h4 className="text-2xl font-bold text-black dark:text-white">
          {total}
        </h4>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
