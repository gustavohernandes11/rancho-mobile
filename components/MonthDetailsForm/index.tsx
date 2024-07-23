import { Input } from "components/Input";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Icon } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { MonthDetails } from "types/MonthDetails";
import { getFieldError } from "utils/forms";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface MonthDetailsFormProps {
    month: string;
}

export const MonthDetailsForm: React.FC<MonthDetailsFormProps> = ({
    month,
}) => {
    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: (values: MonthDetails) => {
            Storage.upsertMonthDetails(values)
                .then(() => formik.setSubmitting(false))
                .catch((e: Error) => Alert.alert("Erro!", e.message));
        },
        validationSchema,
    });

    useEffect(() => {
        Storage.getMonthDetails(moment(month).toDate())
            .then(details => {
                if (details) {
                    formik.setValues(details);
                } else {
                    formik.setValues(defaultValues);
                }
            })
            .then(() => {
                formik.setFieldValue("month", month);
            });
    }, [month]);

    const handleBlur = (field: string) => () => {
        formik.handleBlur(field);
        formik.submitForm();
    };

    return (
        <View>
            <Span>
                <Input
                    label="Gordura (%)"
                    keyboardType="numeric"
                    value={formik.values.fatPorcentage?.toString()}
                    onChangeText={formik.handleChange("fatPorcentage")}
                    onBlur={handleBlur("fatPorcentage")}
                    errorText={getFieldError("fatPorcentage", formik)}
                />
                <Input
                    label="Proteína (%)"
                    keyboardType="numeric"
                    value={formik.values.proteinPorcentage?.toString()}
                    onChangeText={formik.handleChange("proteinPorcentage")}
                    onBlur={handleBlur("proteinPorcentage")}
                    errorText={getFieldError("proteinPorcentage", formik)}
                />
            </Span>
            <Span>
                <Input
                    label="Contagem bacteriana total (CBT)"
                    placeholder="UFC/mL"
                    keyboardType="numeric"
                    value={formik.values.totalBacteria?.toString()}
                    onChangeText={formik.handleChange("totalBacteria")}
                    onBlur={handleBlur("totalBacteria")}
                    errorText={getFieldError("totalBacteria", formik)}
                />
                <Input
                    label="Contagem células somáticas (CCS)"
                    placeholder="cel/mL"
                    keyboardType="numeric"
                    value={formik.values.totalSomaticCell?.toString()}
                    onChangeText={formik.handleChange("totalSomaticCell")}
                    onBlur={handleBlur("totalSomaticCell")}
                    errorText={getFieldError("totalSomaticCell", formik)}
                />
            </Span>
            <Span justify="flex-end">
                <Input
                    label="Preço de venda por litro"
                    keyboardType="numeric"
                    placeholder="R$"
                    value={formik.values.pricePerLiter?.toString()}
                    onChangeText={formik.handleChange("pricePerLiter")}
                    onBlur={handleBlur("pricePerLiter")}
                    errorText={getFieldError("pricePerLiter", formik)}
                />
                <Input
                    label="Lactose (%)"
                    keyboardType="numeric"
                    value={formik.values.lactosePorcentage?.toString()}
                    onChangeText={formik.handleChange("lactosePorcentage")}
                    onBlur={handleBlur("lactosePorcentage")}
                    errorText={getFieldError("lactosePorcentage", formik)}
                />
            </Span>
            <Span>
                <Input
                    multiline
                    label="Observação"
                    value={formik.values.observation}
                    onChangeText={formik.handleChange("observation")}
                    onBlur={handleBlur("observation")}
                    errorText={getFieldError("observation", formik)}
                />
            </Span>
            {formik.dirty ? (
                <Span>
                    {formik.isSubmitting ? (
                        <Paragraph color="green">Salvando dados...</Paragraph>
                    ) : (
                        <>
                            <Icon
                                size={16}
                                color={Theme.colors.primary}
                                source="check"
                            />
                            <Paragraph color="green">Salvo</Paragraph>
                        </>
                    )}
                </Span>
            ) : null}
        </View>
    );
};
