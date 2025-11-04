import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  placeholder = "Select an option",
  options,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-dark-3 text-gray-100 placeholder-gray-400">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-dark-4 text-gray-100">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
