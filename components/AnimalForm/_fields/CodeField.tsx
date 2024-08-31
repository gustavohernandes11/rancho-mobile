import { Input } from "components/Input";
import React from "react";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";

export const CodeField: React.FC<AnimalFormField> = ({ formik }) => {
    return (
        <Input
            label="Código"
            onChangeText={cod => formik.setFieldValue("code", cod)}
            value={formik.values.code?.toString()}
            errorText={getFieldError("code", formik)}
            keyboardType="numeric"
        />
    );
};
