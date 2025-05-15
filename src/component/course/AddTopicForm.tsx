import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const AddTopicForm = () => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "topics",
  });

  const addTopic = () => {
    append({ title: "", week: "", description: "", orderIndex: "" });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Add Topics</h2>
        <p className="text-muted-foreground">
          Add topics for course: {watch("courseName")}
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="item-0">
        {fields.map((field, index) => (
          <AccordionItem
            key={field.id}
            value={`item-${index}`}
            className="mb-4"
          >
            <AccordionTrigger className="text-lg font-medium">
              {watch(`topics.${index}.title`) || `Topic ${index + 1}`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`topics.${index}.title`}
                  rules={{ required: "Topic title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter topic title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`topics.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`topics.${index}.orderIndex`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Index</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter order index"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {index > 0 && (
                <Button
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="mt-4"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Topic
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-4">
        <Button onClick={addTopic} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Topic
        </Button>
      </div>
    </div>
  );
};

export default AddTopicForm;
