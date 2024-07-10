import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Annotation } from "types/Annotation";
import { getFieldError } from "utils/forms";

type TitleFieldProps = {
    formik: FormikProps<Annotation>;
};

export const TitleField: React.FC<TitleFieldProps> = ({ formik }) => {
    return (
        <Input
            label="Título*"
            value={formik.values.title}
            onChangeText={text => formik.setFieldValue("title", text)}
            errorText={getFieldError("title", formik)}
        />
    );
};
