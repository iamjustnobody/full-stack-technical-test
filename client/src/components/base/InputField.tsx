import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";

interface ClearableInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const InputField: React.FC<ClearableInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-15 bg-dark-3  text-gray-100 placeholder-gray-400 w-full
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {value && (
        <Button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-[1px] right-[1px] flex items-center justify-center 
        px-2 text-gray-400 hover:text-gray-600 h-8 top-[1.25px]"
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
};
