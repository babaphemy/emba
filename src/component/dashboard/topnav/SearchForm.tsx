import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchForm() {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative ml-4 w-full sm:w-auto">
      <div className="relative">
        <input
          type="search"
          placeholder="Search here.."
          className={cn(
            "h-11 w-full rounded-full bg-gray-100 pl-5 pr-12",
            "text-gray-900 placeholder:text-gray-500",
            "transition-all duration-200 ease-in-out",
            "focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "hover:bg-gray-50",
            "sm:w-[260px]",
            isFocused && "sm:w-[280px]"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="search"
        />
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full items-center justify-center pr-4 sm:flex">
          <Search className="h-5 w-5 text-blue-500" />
        </div>
      </div>
    </div>
  );
}
