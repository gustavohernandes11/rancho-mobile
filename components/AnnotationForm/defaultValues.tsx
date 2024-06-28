import { Annotation } from "types";

export const defaultValues: Annotation = {
    id: "",
    title: "",
    description: "",
    type: "simple",
    date: "",
    dosage: "",
    medicineName: "",
    animalIDs: [],
} as unknown as Annotation;
