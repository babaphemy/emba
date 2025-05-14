"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import GeneralTableFooter from "../table/GeneralTableFooter";
import SubjectForm from "./SubjectForm";

export const categories = ["web"];
const isStudent = false;
const tableHeaderCells: string[] = ["Subject", "Class", "Lessons", "Action"];

const CourseDashboard = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("web");
  const [sortValue, setSortValue] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const processedSubjects: any[] = [];
  const emptyRows = 0;
  const isLoading = false;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  const handleSort = (value: string): void => {
    setSortValue(value);
  };

  const handleFilterCategory = (value: string): void => {
    setSelectedCategory(value);
  };

  const handleTableClick = () => {
    // Implementation
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setPage(0);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    // Implementation
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Input
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearch}
              className="w-full md:w-[300px]"
            />

            <div className="flex flex-wrap gap-3">
              <Select value={sortValue} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="asc">Ascending (A-Z)</SelectItem>
                  <SelectItem value="desc">Descending (Z-A)</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={handleFilterCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!isStudent && (
                <Button asChild>
                  <Link href="/dashboard/courses/add">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {tableHeaderCells.map((cell) => (
                      <TableHead key={cell}>{cell}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Use the original SubjectsTableBody component here */}
                  {/* Or convert it to use shadcn/ui components */}
                  {processedSubjects.length === 0 && !isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={tableHeaderCells.length}
                        className="text-center"
                      >
                        No courses found
                      </TableCell>
                    </TableRow>
                  ) : (
                    /* Render your subjects here */
                    <TableRow>
                      <TableCell>Sample Subject</TableCell>
                      <TableCell>Sample Class</TableCell>
                      <TableCell>5 Lessons</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination component */}
            <GeneralTableFooter
              data={processedSubjects}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add/Edit Subjects</DialogTitle>
          </DialogHeader>
          <SubjectForm form={form} isLoading={false} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDashboard;
