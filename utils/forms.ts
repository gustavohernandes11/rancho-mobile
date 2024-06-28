import { FormikValues } from "formik";

export const getFieldError = (field: string, formik: FormikValues) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : "";
