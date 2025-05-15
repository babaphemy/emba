import React from "react";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CourseCreate } from "@/types/types";

import { UseFormReturn } from "react-hook-form";

interface SubjectFormProps {
  form: UseFormReturn<CourseCreate>;
  isLoading: boolean;
  onSubmit: (_data: CourseCreate) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  form,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter course name" {...field} />
                </FormControl>
                <FormDescription>Please enter a course name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="overview"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Overview</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter subject overview"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please provide an overview.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                Submit
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubjectForm;
