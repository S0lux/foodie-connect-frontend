import React from "react";
import { X } from "lucide-react";

interface ChipProps {
  label: string;
  onDelete?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-sm font-medium dark:bg-primary-foreground/10">
      {label}
      {onDelete && (
        <button
          type="button"
          className="-mr-1 ml-2 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-gray-400 hover:text-red-600 focus:outline-none"
          onClick={onDelete}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default Chip;
