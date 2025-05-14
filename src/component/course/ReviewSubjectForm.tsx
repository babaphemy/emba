import React from "react";
import { TopicDto } from "@/types/types";
import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ReviewSubjectForm = () => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Review Subject Details</h2>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Subject Title
            </h3>
            <p className="text-base">{formData.courseName || formData.title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Overview
            </h3>
            <p className="text-base">
              {formData.overview || "No overview provided"}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Topics ({formData.topics?.length || 0})
            </h3>

            {formData.topics?.map((topic: TopicDto, topicIndex: number) => (
              <div key={topicIndex} className="mt-4 ml-4">
                <h4 className="text-base font-medium">
                  {topic.title || `Topic ${topicIndex + 1}`}
                </h4>

                <div className="ml-6 mt-3">
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                    Lessons ({topic.lessons?.length || 0})
                  </h5>

                  {topic.lessons?.map((lesson, lessonIndex: number) => (
                    <div key={lessonIndex} className="ml-4 mt-3">
                      <p className="text-sm">
                        • {lesson.title || `Lesson ${lessonIndex + 1}`}
                        {lesson.type && (
                          <span className="text-muted-foreground ml-2">
                            ({lesson.type})
                          </span>
                        )}
                        {lesson.dueDate && (
                          <span className="text-muted-foreground ml-2">
                            (Due:{" "}
                            {new Date(lesson.dueDate).toLocaleDateString()})
                          </span>
                        )}
                      </p>

                      {lesson.content ? (
                        <div
                          className="mt-2 mb-3 pl-4 border-l-2 border-border prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: lesson.content,
                          }}
                        />
                      ) : lesson.video ? (
                        <p className="text-sm text-muted-foreground mt-1 ml-4">
                          Video lesson uploaded
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1 ml-4">
                          No content provided
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSubjectForm;
