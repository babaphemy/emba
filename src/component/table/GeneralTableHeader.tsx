import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface GeneralTableHeaderProps {
  cells: string[];
}

const GeneralTableHeader: React.FC<GeneralTableHeaderProps> = ({ cells }) => {
  const getAlignment = (index: number, totalCells: number) => {
    if (index === 0) return "text-left";
    if (index === totalCells - 1) return "text-right";
    return "text-center";
  };

  return (
    <TableHeader>
      <TableRow className="bg-gray-50 hover:bg-gray-50">
        {cells.map((cell, index) => (
          <TableHead
            key={cell}
            className={cn(
              "text-[13.5px] font-medium",
              getAlignment(index, cells.length)
            )}
          >
            {cell}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default GeneralTableHeader;
