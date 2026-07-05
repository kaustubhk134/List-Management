import * as Yup from "yup";

export const listValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .max(100, "Maximum 100 characters"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .max(500, "Maximum 500 characters"),
});