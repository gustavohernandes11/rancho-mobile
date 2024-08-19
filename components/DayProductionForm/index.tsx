import { Input } from "components/Input";
import { Span } from "components/Span";
import { FormikHelpers, useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import {
    Alert,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
} from "react-native";
import { Storage } from "services/StorageService";
import { DayProduction } from "types";
import { getFieldError } from "utils/getFieldError";
import { initialValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface DayProductionFormProps {
    selectedDate: string;
}

const handleSubmit = async (
    production: DayProduction,
    formikHelpers: FormikHelpers<{
        quantity: number;
    }>
) => {
    Storage.upsertDayProduction(production)
        .then(() => {
            formikHelpers.setSubmitting(false);
        })
        .catch(() => {
            Alert.alert("Erro!", "Ocorreu um erro ao salvar a produção.");
        });
};

export const DayProductionForm: React.FC<DayProductionFormProps> = ({
    selectedDate,
}) => {
    const formik = useFormik({
        initialValues,
        onSubmit: (values, formikHelpers) =>
            handleSubmit(
                {
                    day: selectedDate,
                    quantity: values.quantity,
                },
                formikHelpers
            ),
        validationSchema,
    });

    useEffect(() => {
        Storage.getDayProduction(moment(selectedDate).toDate()).then(
            production => {
                formik.setFieldValue("quantity", production?.quantity || 0);
            }
        );
    }, [selectedDate]);

    const handleChangeText = (text: string) => {
        formik.setFieldValue("quantity", Number(text));
    };

    const handleSubmitEditing = (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => {
        handleChangeText(e.nativeEvent.text);
        formik.submitForm();
    };

    return (
        <Span direction="column" marginY={4} gap={0}>
            <Input
                label="Litros de leite produzidos"
                keyboardType="numeric"
                value={formik.values.quantity.toString()}
                onChangeText={handleChangeText}
                errorText={getFieldError("quantity", formik)}
                returnKeyType="done"
                onBlur={formik.submitForm}
                onSubmitEditing={handleSubmitEditing}
            />
        </Span>
    );
};
