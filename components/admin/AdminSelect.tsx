"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AdminSelectOption = {
  label: string;
  value: string;
};

type AdminSelectProps = {
  value?: string;
  placeholder: string;
  options: AdminSelectOption[];
  onValueChange: (value: string) => void;
};

export default function AdminSelect({
  value,
  placeholder,
  options,
  onValueChange,
}: AdminSelectProps) {
  const handleValueChange = (nextValue: string | null) => {
    onValueChange(nextValue ?? "");
  };

  const selectedOption = options.find(
    (option) => option.value === (value ?? ""),
  );

  return (
    <Select value={value ?? ""} onValueChange={handleValueChange}>
      <SelectTrigger className="h-11 w-full rounded-xl bg-transparent dark:bg-input/30 dark:hover:bg-input/50">
        <SelectValue placeholder={placeholder}>
          {selectedOption?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
