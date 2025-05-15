import React from "react";
import { MoreHorizontal, FileEdit, Eye } from "lucide-react";
import { CourseCreate } from "@/types/types";
import { categories } from "../course/CourseDashboard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export type TableClickType = "delete" | "edit" | "view";

interface SubjectsTableBodyProps {
  rowsPerPage: number;
  filteredData: CourseCreate[];
  page?: number;
  emptyRows: number;
  handleUserClick?: (_item: CourseCreate, _type: TableClickType) => void;
  isLoading?: boolean;
}

const SubjectsTableBody: React.FC<SubjectsTableBodyProps> = ({
  rowsPerPage,
  filteredData,
  page = 0,
  emptyRows,
  handleUserClick = () => {},
  isLoading,
}) => {
  if (isLoading) {
    return (
      <TableBody>
        {[...Array(rowsPerPage)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20 mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24 mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-8 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      {(rowsPerPage > 0
        ? filteredData?.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : filteredData
      )?.map((course) => {
        const currentCategory = categories?.find(
          (item) => item === course.category
        );

        return (
          <TableRow key={course.id}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <h5 className="text-sm font-semibold">{course.courseName}</h5>
              </div>
            </TableCell>

            <TableCell className="text-center">
              {currentCategory || "-"}
            </TableCell>

            {/* <TableCell className="text-center">
              {course?.assetCount?.topicCount || 0} Topics,{" "}
              {course?.assetCount?.lessonCount || 0} Lessons
            </TableCell> */}

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleUserClick(course, "view")}
                    className="cursor-pointer"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleUserClick(course, "edit")}
                    className="cursor-pointer"
                  >
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        );
      })}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={4} className="text-center text-muted-foreground">
            {filteredData.length === 0 ? "No courses found" : ""}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default SubjectsTableBody;
