import { Input } from "components/Input";
import { FormikProps } from "formik";
import React from "react";
import { Annotation } from "types/Annotation";
import { getFieldError } from "utils/forms";

type MedicineFieldsProps = {
    formik: FormikProps<Annotation>;
};

export const MedicineFields: React.FC<MedicineFieldsProps> = ({ formik }) => {
    return (
        <>
            <Input
                label="Nome do remédio/vacina"
                value={formik.values.medicineName ?? ""}
                onChangeText={text =>
                    formik.setFieldValue("medicineName", text)
                }
                errorText={getFieldError("medicineName", formik)}
            />
            <Input
                label="Dosagem"
                value={formik.values.dosage ?? ""}
                onChangeText={text => formik.setFieldValue("dosage", text)}
                errorText={getFieldError("dosage", formik)}
            />
        </>
    );
};
