import { DatePicker } from "components/DatePicker";
import { FormikProps } from "formik";
import moment from "moment";
import React, { memo } from "react";
import { Animal } from "types/Animal";
import { getFieldError } from "utils/getFieldError";

type BirthdateDatePickerFieldProps = {
    formik: FormikProps<Animal>;
};

export const BirthdateDatePickerField: React.FC<
    BirthdateDatePickerFieldProps
> = ({ formik }) => {
    const handleChangeBirthdate = (date?: Date) => {
        if (moment.isDate(date))
            formik.setFieldValue("birthdate", date!.toISOString());
        else formik.setFieldValue("birthdate", "");
    };

    const handleChangeBirthdateText = (text?: string) => {
        if (text === "") {
            formik.setFieldValue("birthdate", "");
        } else if (!moment.isDate(text)) {
            formik.setFieldError(
                "birthdate",
                "Formato de data inválido. Use 'DD/MM/AAAA'"
            );
        }
    };

    return (
        <DatePicker
            inputMode="start"
            saveLabel="Salvar"
            errorText={getFieldError("birthdate", formik)}
            onChange={handleChangeBirthdate}
            onChangeText={handleChangeBirthdateText}
            value={
                formik.values.birthdate
                    ? new Date(formik.values.birthdate)
                    : undefined
            }
            showCheckBoxToSelectToday={true}
            label="Data de Nascimento"
        />
    );
};

export const MemoBirthdateDatePickerField = memo(
    BirthdateDatePickerField,
    (prev, next) =>
        prev.formik.values.birthdate === next.formik.values.birthdate &&
        prev.formik.errors.birthdate === next.formik.errors.birthdate &&
        prev.formik.touched.birthdate === next.formik.touched.birthdate
);
