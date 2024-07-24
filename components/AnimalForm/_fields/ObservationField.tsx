import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Animal } from "types/Animal";
import { getFieldError } from "utils/getFieldError";

type ObservationFieldProps = {
    formik: FormikProps<Animal>;
};

export const ObservationField: React.FC<ObservationFieldProps> = ({
    formik,
}) => {
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
