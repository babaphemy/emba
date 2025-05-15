import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface SubjectsTableProps {
  subjects: string[];
}

const SubjectsTable: React.FC<SubjectsTableProps> = ({ subjects }) => {
  return (
    <Card className="my-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-base">
              Subjects - {subjects?.length || 0}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects?.map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject}</TableCell>
            </TableRow>
          ))}
          {(!subjects || subjects.length === 0) && (
            <TableRow>
              <TableCell className="text-center text-muted-foreground">
                No subjects available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SubjectsTable;
