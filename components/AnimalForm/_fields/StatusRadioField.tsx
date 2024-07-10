import { RadioInput } from "components/RadioInput";
import { FormikProps } from "formik";
import React from "react";
import { Animal, AnimalStatusOptions } from "types/Animal";
import { getFieldError } from "utils/forms";

type StatusRadioFieldProps = {
    formik: FormikProps<Animal>;
};

export const StatusRadioField: React.FC<StatusRadioFieldProps> = ({
    formik,
}) => {
    const options = [
        { label: "Ativo", value: "active" },
        { label: "Morto", value: "dead" },
        { label: "Vendido", value: "sold" },
    ];

    return (
        <RadioInput
            label="Situação do animal"
            value={formik.values.status}
            onValueChange={(value: AnimalStatusOptions) =>
                formik.setFieldValue("status", value)
            }
            options={options}
            errorText={getFieldError("status", formik)}
        />
    );
};
