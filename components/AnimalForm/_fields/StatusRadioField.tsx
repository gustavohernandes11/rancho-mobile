import { RadioInput } from "components/RadioInput";
import React from "react";
import { AnimalStatusOptions } from "types/Animal";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";

export const StatusRadioField: React.FC<AnimalFormField> = ({ formik }) => {
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
