import { RadioInput } from "components/RadioInput";
import React from "react";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";

export const GenderField: React.FC<AnimalFormField> = ({ formik }) => {
    const options = [
        { label: "Fêmea", value: "F" },
        { label: "Macho", value: "M" },
    ];

    return (
        <RadioInput
            label="Sexo"
            value={formik.values.gender}
            onValueChange={value => formik.setFieldValue("gender", value)}
            options={options}
            errorText={getFieldError("gender", formik)}
        />
    );
};
