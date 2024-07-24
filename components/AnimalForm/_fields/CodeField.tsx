import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Animal } from "types/Animal";
import { getFieldError } from "utils/getFieldError";

type CodeFieldProps = {
    formik: FormikProps<Animal>;
};

export const CodeField: React.FC<CodeFieldProps> = ({ formik }) => {
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
