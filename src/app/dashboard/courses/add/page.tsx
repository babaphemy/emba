"use client";

import { courseCompleteSchema } from "@/app/schema/courseSchema";
import AddCourseForm from "@/component/course/AddCourseForm";
import AddLessonForm from "@/component/course/AddLessonForm";
import AddTopicForm from "@/component/course/AddTopicForm";
import ReviewSubjectForm from "@/component/course/ReviewSubjectForm";
import { notifyError, notifySuccess } from "@/lib/notification";
import { addSubjectComplete } from "@/rest/api";
import { CourseComplete, LESSONTYPE } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save, ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import {
  FieldError,
  FieldErrors,
  FormProvider,
  useForm,
} from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// Recursive function to render nested errors
const renderErrors = (errors: FieldErrors, parentKey = ""): JSX.Element[] => {
  return Object.entries(errors).flatMap(([key, value]) => {
    const fieldName = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === "object" && "message" in value) {
      return (
        <p key={fieldName} className="text-sm">
          {fieldName}: {(value as FieldError).message}
        </p>
      );
    } else if (Array.isArray(value)) {
      return value.flatMap((item, index) => {
        const arrayKey = `${fieldName}[${index}]`;
        return item && typeof item === "object"
          ? renderErrors(item, arrayKey)
          : [];
      });
    } else if (value && typeof value === "object") {
      return renderErrors(value as FieldErrors, fieldName);
    }
    return [];
  });
};

const SubjectCreatePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading] = useState(false);
  const queryClient = useQueryClient();

  const defaultValues: CourseComplete = {
    id: undefined,
    user: session?.id || "",
    courseName: "",
    category: "",
    target: "",
    brief: "",
    overview: "",
    price: undefined,
    tax: undefined,
    thumbnail: "",
    draft: "",
    currency: "",
    createdOn: new Date(),
    updatedOn: new Date(),
    topics: [
      {
        id: undefined,
        title: "",
        description: "",
        cid: "",
        orderIndex: undefined,
        lessons: [
          {
            id: undefined,
            title: "",
            tid: "",
            type: LESSONTYPE.video,
            orderIndex: undefined,
            video: "",
            content: "",
            createdOn: new Date(),
            updatedOn: new Date(),
          },
        ],
        dueDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        createdOn: new Date(),
        updatedOn: new Date(),
      },
    ],
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(courseCompleteSchema),
  });

  const steps = ["Subject Details", "Add Topics", "Add Lessons", "Review"];

  const handleNext = async () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const { mutate } = useMutation({
    mutationFn: addSubjectComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      notifySuccess("New Subject created successfully");
      router.push("/lms-courses");
      methods.reset(defaultValues);
      return;
    },
    onError: () => {
      notifyError("Failed to create new subject, Try again!!!");
      return;
    },
  });

  async function onSubmit(values: yup.InferType<typeof courseCompleteSchema>) {
    mutate(values);
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddCourseForm />;
      case 1:
        return <AddTopicForm />;
      case 2:
        return <AddLessonForm />;
      case 3:
        return <ReviewSubjectForm />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <FormProvider {...methods}>
        <Card>
          <CardContent className="p-6">
            {isLoading && <Progress value={30} className="mb-4" />}

            {/* Custom Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((label, index) => (
                  <div key={label} className="flex-1 relative">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                          activeStep >= index
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-200 text-gray-600"
                        )}
                      >
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "h-0.5 flex-1 mx-2 transition-colors",
                            activeStep > index ? "bg-primary" : "bg-gray-200"
                          )}
                        />
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-sm mt-2 transition-colors",
                        activeStep >= index
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Global error message display */}
            {!isLoading && Object.keys(methods.formState.errors).length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  <p className="font-semibold mb-2">
                    There are errors in the form:
                  </p>
                  <div className="space-y-1">
                    {renderErrors(methods.formState.errors)}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="mb-8">{renderStepContent(activeStep)}</div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={activeStep === 0 || isLoading}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <Button
                  type={activeStep === steps.length - 1 ? "submit" : "button"}
                  onClick={
                    activeStep === steps.length - 1 ? undefined : handleNext
                  }
                  disabled={isLoading}
                >
                  {activeStep === steps.length - 1 ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Subject
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </FormProvider>
    </div>
  );
};

export default SubjectCreatePage;
