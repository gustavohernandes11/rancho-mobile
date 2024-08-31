import { Input } from "components/Input";
import React from "react";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";

export const ObservationField: React.FC<AnimalFormField> = ({ formik }) => {
    return (
        <Input
            label="Observação"
            onChangeText={text => formik.setFieldValue("observation", text)}
            errorText={getFieldError("observation", formik)}
            value={formik.values.observation?.toString()}
            multiline={true}
        />
    );
};
