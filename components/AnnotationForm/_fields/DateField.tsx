import { DatePicker } from "components/DatePicker";
import { FormikProps } from "formik";
import moment from "moment";
import React from "react";
import { Annotation } from "types/Annotation";
import { getFieldError } from "utils/getFieldError";

type DateFieldProps = {
    formik: FormikProps<Annotation>;
};

export const DateField: React.FC<DateFieldProps> = ({ formik }) => {
    const handleChangeDate = (date?: Date) => {
        if (moment.isDate(date))
            formik.setFieldValue("date", date!.toISOString());
        else formik.setFieldValue("date", "");
    };

    const handleChangeDateText = (text?: string) => {
        if (text === "") {
            formik.setFieldValue("date", "");
        } else if (!moment.isDate(text)) {
            formik.setFieldError(
                "date",
                "Formato de data inválido. Use 'DD/MM/AAAA'"
            );
        }
    };

    return (
        <DatePicker
            label="Data"
            inputMode="start"
            saveLabel="Salvar"
            errorText={getFieldError("date", formik)}
            onChange={handleChangeDate}
            onChangeText={handleChangeDateText}
            showCheckBoxToSelectToday={true}
            value={
                formik.values.date ? new Date(formik.values.date) : undefined
            }
        />
    );
};
