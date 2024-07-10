import { RadioInput } from "components/RadioInput";
import { FormikProps } from "formik";
import React from "react";
import { Animal } from "types/Animal";
import { getFieldError } from "utils/forms";

type GenderFieldProps = {
    formik: FormikProps<Animal>;
};

export const GenderField: React.FC<GenderFieldProps> = ({ formik }) => {
    const options = [
        { label: "Fêmea", value: "F" },
        { label: "Macho", value: "M" },
    ];

    return (
        <RadioInput
            label="Gênero*"
            value={formik.values.gender}
            onValueChange={value => formik.setFieldValue("gender", value)}
            options={options}
            errorText={getFieldError("gender", formik)}
        />
    );
};
