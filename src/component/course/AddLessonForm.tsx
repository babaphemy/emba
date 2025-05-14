import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { LESSONTYPE, TopicDto } from "@/types/types";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import RichEditor from "./Editor";
import FileUploadZone from "./FileUploadZone";

const AddLessonForm = () => {
  const { watch } = useFormContext();

  const topics = watch("topics");

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Add Lessons</h2>
        <p className="text-muted-foreground">
          Add lessons for subject: {watch("courseName")}
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="topic-0">
        {topics.map((topicField: TopicDto, topicIndex: number) => (
          <TopicAccordion
            key={topicField.id || topicIndex}
            topicIndex={topicIndex}
          />
        ))}
      </Accordion>
    </div>
  );
};

const TopicAccordion: React.FC<{
  topicIndex: number;
}> = ({ topicIndex }) => {
  const { control, watch, setValue } = useFormContext();
  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: `topics.${topicIndex}.lessons`,
  });

  const handleLessonTypeChange = (lessonIndex: number, newType: string) => {
    // Clear file fields when lesson type changes
    setValue(`topics.${topicIndex}.lessons.${lessonIndex}.video`, "");
    setValue(`topics.${topicIndex}.lessons.${lessonIndex}.content`, "");
  };

  return (
    <AccordionItem value={`topic-${topicIndex}`} className="mb-4">
      <AccordionTrigger className="text-lg font-medium">
        {watch(`topics.${topicIndex}.title`) || `Topic ${topicIndex + 1}`}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {lessonFields.map((lessonField, lessonIndex) => {
            const lessonType = watch(
              `topics.${topicIndex}.lessons.${lessonIndex}.type`
            );
            const showFileUpload =
              lessonType === LESSONTYPE.video ||
              lessonType === LESSONTYPE.document;

            return (
              <Card key={lessonField.id} className="p-4">
                <CardContent className="space-y-4 p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`topics.${topicIndex}.lessons.${lessonIndex}.title`}
                      rules={{ required: "Lesson title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lesson Title *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter lesson title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`topics.${topicIndex}.lessons.${lessonIndex}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lesson Type</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleLessonTypeChange(lessonIndex, value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select lesson type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(LESSONTYPE).map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`topics.${topicIndex}.lessons.${lessonIndex}.dueDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {showFileUpload && (
                    <div className="w-full">
                      <FileUploadZone
                        lessonIndex={lessonIndex}
                        topicIndex={topicIndex}
                        lessonType={lessonType}
                        currentFile={
                          lessonType === LESSONTYPE.video
                            ? watch(
                                `topics.${topicIndex}.lessons.${lessonIndex}.video`
                              )
                            : watch(
                                `topics.${topicIndex}.lessons.${lessonIndex}.content`
                              )
                        }
                      />
                    </div>
                  )}

                  {(lessonType === LESSONTYPE.text ||
                    lessonType === LESSONTYPE.html) && (
                    <div className="w-full">
                      <Controller
                        name={`topics.${topicIndex}.lessons.${lessonIndex}.content`}
                        control={control}
                        render={({ field }) => (
                          <div>
                            <Label className="mb-2 block">Lesson Content</Label>
                            <RichEditor
                              content={field.value || ""}
                              onUpdate={({ editor }) => {
                                field.onChange(editor.getHTML());
                              }}
                              placeholder="Enter lesson content here..."
                            />
                          </div>
                        )}
                      />
                    </div>
                  )}

                  {lessonIndex > 0 && (
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        onClick={() => removeLesson(lessonIndex)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Lesson
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          <Button
            onClick={() =>
              appendLesson({
                tid: "",
                title: "",
                type: LESSONTYPE.text,
                content: "",
                video: "",
                dueDate: new Date(),
              })
            }
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson to Topic
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AddLessonForm;
