import { LESSONTYPE } from "@/types/types";
import * as yup from "yup";
export const courseCreateSchema = yup.object().shape({
  courseName: yup.string().required("Course name is required"),
});
export const courseCompleteSchema = courseCreateSchema.shape({
  topics: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().optional(),
        title: yup.string().required("Topic title is required"),
        description: yup.string().required("Topic description is required"),
        cid: yup.string().required("Course ID is required"),
        orderIndex: yup
          .number()
          .optional()
          .integer("Order index must be an integer"),
        lessons: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.string().optional(),
              title: yup.string().required("Lesson title is required"),
              tid: yup.string().required("Topic ID is required"),
              type: yup.string(),
              orderIndex: yup
                .number()
                .optional()
                .integer("Order index must be an integer"),
              video: yup.string().optional(),
              content: yup.string().optional(),
              createdOn: yup.date().optional(),
              updatedOn: yup.date().optional(),
            })
          )
          .min(1, "At least one lesson is required"),
        dueDate: yup.date().optional(),
        createdOn: yup.date().optional(),
        updatedOn: yup.date().optional(),
      })
    )
    .min(1, "At least one topic is required"),
});
export const curriculumMapSchema = yup.object().shape({
  topic: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().optional(),
        title: yup.string().required("Topic title is required"),
        description: yup.string().required("Topic description is required"),
        cid: yup.string().required("Course ID is required"),
        orderIndex: yup
          .number()
          .optional()
          .integer("Order index must be an integer"),
        lessons: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.string().optional(),
              title: yup.string().required("Lesson title is required"),
              tid: yup.string().required("Topic ID is required"),
              type: yup
                .mixed<LESSONTYPE>()
                .oneOf(Object.values(LESSONTYPE), "Invalid lesson type"),
              orderIndex: yup
                .number()
                .optional()
                .integer("Order index must be an integer"),
              video: yup.string().optional(),
              content: yup.string().optional(),
              createdOn: yup.date().optional(),
              updatedOn: yup.date().optional(),
            })
          )
          .min(1, "At least one lesson is required"),
        dueDate: yup.date().optional(),
        createdOn: yup.date().optional(),
        updatedOn: yup.date().optional(),
      })
    )
    .min(1, "At least one topic is required"),
  requirement: yup.array().of(yup.string()).optional(),
  objective: yup.array().of(yup.string()).optional(),
});
