import { Select } from "components/Select";
import { FormikProps } from "formik";
import React from "react";
import { Annotation } from "types/Annotation";
import { formatAnnotationType } from "utils/formatters";
import { getFieldError } from "utils/forms";
import { annotationTypeItems } from "../annotationTypeItems";

type AnnotationTypeSelectProps = {
    formik: FormikProps<Annotation>;
};

export const AnnotationTypeSelect: React.FC<AnnotationTypeSelectProps> = ({
    formik,
}) => {
    return (
        <Select
            label="Tipo de anotação"
            items={annotationTypeItems}
            defaultButtonText={
                formik.values.type
                    ? formatAnnotationType(formik.values.type)
                    : "Simples"
            }
            defaultValue={formik.values.type}
            errorText={getFieldError("type", formik)}
            onSelect={option => formik.setFieldValue("type", option.value)}
        />
    );
};
