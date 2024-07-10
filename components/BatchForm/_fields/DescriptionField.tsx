import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Batch } from "types/Batch";
import { getFieldError } from "utils/forms";

type DescriptionFieldProps = {
    formik: FormikProps<Batch>;
};

export const DescriptionField: React.FC<DescriptionFieldProps> = ({
    formik,
}) => (
    <Input
        label="Descrição"
        value={formik.values.description}
        onChangeText={text => formik.setFieldValue("description", text)}
        errorText={getFieldError("description", formik)}
        multiline={true}
    />
);
