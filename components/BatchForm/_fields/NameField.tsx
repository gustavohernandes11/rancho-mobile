import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Batch } from "types/Batch";
import { getFieldError } from "utils/getFieldError";

type NameFieldProps = {
    formik: FormikProps<Batch>;
};

export const NameField: React.FC<NameFieldProps> = ({ formik }) => (
    <Input
        label="Nome*"
        value={formik.values.name}
        onChangeText={text => formik.setFieldValue("name", text)}
        errorText={getFieldError("name", formik)}
    />
);
