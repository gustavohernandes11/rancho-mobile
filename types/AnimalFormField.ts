import { FormikProps } from "formik";
import { Animal } from "./Animal";

export type AnimalFormValues = Animal & { quantity?: number };

export type AnimalFormField = {
    formik: FormikProps<AnimalFormValues>;
};
