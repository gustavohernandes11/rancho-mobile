import { Input } from "components/Input";
import React from "react";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";

export const PrefixField: React.FC<AnimalFormField> = ({ formik }) => {
    return (
        <Input
            label="Prefixo/Nome padrão*"
            value={formik.values.name}
            placeholder="Exemplo: Novilha X"
            onChangeText={text => formik.setFieldValue("name", text)}
            errorText={getFieldError("name", formik)}
        />
    );
};
