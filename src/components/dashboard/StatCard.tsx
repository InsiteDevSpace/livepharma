
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  onClick,
  className,
}: StatCardProps) => {
  return (
    <Card
      className={`transition-all hover:shadow-md ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="h-8 w-8 rounded-md bg-primary-50 p-1.5 text-primary-700">
            <Icon className="h-full w-full" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div
            className={`flex items-center mt-1 text-xs ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <span>
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground ml-1">vs. last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
