import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Annotation } from "types/Annotation";
import { getFieldError } from "utils/forms";

type DescriptionInputFieldProps = {
    formik: FormikProps<Annotation>;
};

export const DescriptionField: React.FC<DescriptionInputFieldProps> = ({
    formik,
}) => {
    return (
        <Input
            label="Descrição"
            value={formik.values.description ?? ""}
            onChangeText={text => formik.setFieldValue("description", text)}
            errorText={getFieldError("description", formik)}
            multiline={true}
        />
    );
};
