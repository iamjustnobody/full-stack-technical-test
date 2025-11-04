import React from "react";
import { SelectField } from "../base/SelectField";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "@/shared/constants";
import { InputField } from "../base/InputField";
import { Button } from "../ui/button";

interface FilterBarProps {
  filters: {
    search: string;
    category: string;
    status: string;
  };

  onChange: (...args: any[]) => void;

  searchInput: string;
  onSearch?: () => void; // optional if using manual search
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  searchInput,

  onSearch,
  onChange,
}) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 text-gray-100 dark:text-gray-100 mb-8">
      <SelectField
        label="Category"
        value={filters.category}
        placeholder="Select category"
        options={CATEGORY_OPTIONS}
        onChange={(v) => onChange("category", v)}
        className="sm:col-span-1"
      />

      <SelectField
        label="Status"
        value={filters.status}
        placeholder="Select status"
        options={STATUS_OPTIONS}
        onChange={(v) => onChange("status", v)}
      />

      <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1 w-full">
        <span className="text-sm font-medium text-gray-300">Search</span>

        <InputField
          value={searchInput}
          onChange={(e) => onChange("search", e)}
          placeholder="Search events..."
        />
        {onSearch && (
          <Button
            onClick={onSearch}
            className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </Button>
        )}
      </div>
    </div>
  );
};
