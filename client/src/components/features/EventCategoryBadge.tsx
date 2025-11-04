import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
// import { Badge } from "lucide-react";

interface EventCategoryBadgeProps {
  name: string;
  color?: string;
  className?: string;
}

export const EventCategoryBadge: React.FC<EventCategoryBadgeProps> = ({
  name,
  color,
  className,
}) => {
  return (
    <Badge
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white shadow-sm",
        "bg-dark-2 text-gray-100 border", //border-dark-3 rounded-full rounded
        className
      )}
      style={color ? { backgroundColor: color } : undefined}
    >
      {name}
    </Badge>
  );
};
