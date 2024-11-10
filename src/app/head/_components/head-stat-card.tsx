import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    timespan: string;
  };
  prefix?: string;
}

export function HeadStatCard({
  title,
  value,
  icon: Icon,
  change,
  prefix = "",
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix && <span>{prefix}</span>}
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        {change && (
          <p className="text-xs text-muted-foreground">
            {change.value >= 0 ? "+" : ""}
            {change.value}% from last {change.timespan}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
