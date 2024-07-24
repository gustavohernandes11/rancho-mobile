import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Animal } from "types/Animal";
import { getFieldError } from "utils/getFieldError";

type NameFieldProps = {
    formik: FormikProps<Animal>;
};

export const NameField: React.FC<NameFieldProps> = ({ formik }) => {
    return (
        <Input
            label="Nome*"
            value={formik.values.name}
            onChangeText={text => formik.setFieldValue("name", text)}
            errorText={getFieldError("name", formik)}
        />
    );
};
