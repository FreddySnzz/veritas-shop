import { cn } from "@/lib/utils";

interface SearchbarInputProps extends React.HTMLAttributes<HTMLElement> {
  searchbarPlaceholder?: string;
  value?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
};

export default function SearchbarInput({ 
  searchbarPlaceholder,
  onChange,
  onFocus,
  value,
  inputRef,
}: SearchbarInputProps) {

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={searchbarPlaceholder}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      className={cn(
        "w-full pl-4 pr-10 py-2 text-sm font-medium text-secondary",
        "bg-background-alternative rounded-lg ring-0",
        "focus:outline-none transition-all"
      )}
    />
  );
};