import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface NoRecordFoundProps {
  text: string;
  colSpan?: number;
}

const NoRecordFound: React.FC<NoRecordFoundProps> = ({ text, colSpan = 5 }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan} className="h-24 text-center">
          <div className="text-muted-foreground">{text}</div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default NoRecordFound;
