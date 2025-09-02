import { Input } from "components/Input";
import React from "react";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";

export const PrefixField: React.FC<AnimalFormField> = ({ formik }) => {
    return (
        <Input
            label="Prefixo (ou nome padrão)"
            value={formik.values.name}
            placeholder="Exemplo: Novilha ..."
            onChangeText={text => formik.setFieldValue("name", text)}
            errorText={getFieldError("name", formik)}
        />
    );
};
