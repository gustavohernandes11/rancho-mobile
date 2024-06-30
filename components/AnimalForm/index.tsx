import { Button } from "components/Button";
import { DatePicker } from "components/DatePicker";
import { Input } from "components/Input";
import RadioInput from "components/RadioInput";
import { Select } from "components/Select";
import { Span } from "components/Span";
import { router, useNavigation } from "expo-router";
import { useFormik } from "formik";
import { useAlertUnsavedChanges } from "hooks/useAlertUnsavedChanges";
import { useGlobalState } from "hooks/useGlobalState";
import moment from "moment";
import React from "react";
import { Alert, View } from "react-native";
import { Storage } from "services/StorageService";
import { Animal } from "types";
import {
    filterPossibleMaternity,
    filterPossiblePaternity,
} from "utils/filters";
import { formatGender } from "utils/formatters";
import { getFieldError } from "utils/forms";
import { serializeAnimals, serializeBatches } from "utils/serializers";
import { showToast } from "utils/showToast";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface AnimalFormProps {
    initialValues?: Partial<Animal>;
}
export const AnimalForm: React.FC<AnimalFormProps> = ({
    initialValues = defaultValues,
}) => {
    let mergedInitialValues: Animal = Object.assign(
        {},
        defaultValues,
        initialValues
    );

    const onSucess = (message: string) => {
        refreshAll();
        formik.resetForm();
        router.back();
        showToast(message);
    };
    const onError = (e: Error) => Alert.alert("Erro!", e.message);

    const isUpdate = !!initialValues.id;

    const onSubmit = (values: Animal) => {
        isUpdate
            ? Storage.updateAnimal(values)
                  .then(() =>
                      onSucess(`${values.name} foi atualizado(a) com sucesso.`)
                  )
                  .catch(onError)
            : Storage.insertAnimal(values)
                  .then(() =>
                      onSucess(`${values.name} foi adicionado(a) com sucesso.`)
                  )
                  .catch(onError);
    };

    const formik = useFormik({
        initialValues: mergedInitialValues,
        onSubmit,
        validationSchema,
    });
    const { animals, batches, refreshAll } = useGlobalState();
    const navigation = useNavigation();

    useAlertUnsavedChanges({
        formik,
    });

    return (
        <View>
            <Span align="flex-start">
                <Input
                    label="Nome*"
                    value={formik.values.name}
                    onChangeText={text => formik.setFieldValue("name", text)}
                    errorText={getFieldError("name", formik)}
                />

                <Select
                    label="Gênero*"
                    items={[
                        { key: "Fêmea", value: "F" },
                        { key: "Macho", value: "M" },
                    ]}
                    defaultButtonText={
                        initialValues.gender
                            ? formatGender(initialValues.gender)
                            : "Escolha um gênero"
                    }
                    defaultValue={initialValues.gender}
                    errorText={getFieldError("gender", formik)}
                    onSelect={option =>
                        formik.setFieldValue("gender", option.value)
                    }
                />
            </Span>
            <Span>
                <DatePicker
                    inputMode="start"
                    saveLabel="Salvar"
                    errorText={getFieldError("birthdate", formik)}
                    onChange={date => {
                        if (moment.isDate(date))
                            formik.setFieldValue(
                                "birthdate",
                                date!.toISOString()
                            );
                        else formik.setFieldValue("birthdate", "");
                    }}
                    onChangeText={text => {
                        if (text === "") {
                            formik.setFieldValue("birthdate", "");
                        } else if (!moment.isDate(text)) {
                            formik.setFieldError(
                                "birthdate",
                                "Formato de data inválido. Use 'DD/MM/AAAA'"
                            );
                        }
                    }}
                    value={
                        formik.values.birthdate
                            ? new Date(formik.values.birthdate)
                            : undefined
                    }
                    label="Date de nascimento"
                />
            </Span>
            <Select
                items={[
                    ...serializeBatches(batches || []),
                    { key: "Selecione um lote", value: "" },
                ]}
                defaultButtonText={
                    batches?.find(b => b.id === initialValues.batchID)?.name ||
                    "Selecione um lote"
                }
                errorText={getFieldError("batchID", formik)}
                onSelect={option =>
                    formik.setFieldValue("batchID", option.value)
                }
                label="Lote"
            />
            {isUpdate && (
                <Span>
                    <RadioInput
                        onValueChange={option =>
                            formik.setFieldValue("status", option)
                        }
                        label="Situação do animal"
                        value={formik.values.status}
                        options={[
                            { label: "Ativo", value: "active" },
                            { label: "Morto", value: "dead" },
                            { label: "Vendido", value: "sold" },
                        ]}
                        errorText={getFieldError("status", formik)}
                    />
                </Span>
            )}
            <Span>
                <Input
                    label="Código"
                    onChangeText={cod => formik.setFieldValue("code", cod)}
                    value={formik.values.code?.toString()}
                    errorText={getFieldError("code", formik)}
                    keyboardType="numeric"
                />
            </Span>
            <Span>
                <Select
                    defaultButtonText={
                        animals?.find(a => a.id === initialValues.paternityID)
                            ?.name || "Selecione um animal"
                    }
                    items={[
                        ...serializeAnimals(
                            filterPossiblePaternity(animals!, formik.values)
                        ),
                        { key: "Selecione um animal", value: "" },
                    ]}
                    errorText={getFieldError("paternityID", formik)}
                    onSelect={option =>
                        formik.setFieldValue("paternityID", option.value)
                    }
                    label="Paternidade"
                />
                <Select
                    defaultButtonText={
                        animals?.find(a => a.id === initialValues.maternityID)
                            ?.name || "Selecione um animal"
                    }
                    items={[
                        ...(serializeAnimals(
                            filterPossibleMaternity(animals!, formik.values)
                        ) || []),
                        { key: "Selecione um animal", value: "" },
                    ]}
                    errorText={getFieldError("maternityID", formik)}
                    defaultValue={formik.initialValues.maternityID?.toString()}
                    onSelect={option =>
                        formik.setFieldValue(
                            "maternityID",
                            Number(option.value)
                        )
                    }
                    label="Maternidade"
                />
            </Span>
            <Span>
                <Input
                    label="Observação"
                    onChangeText={text =>
                        formik.setFieldValue("observation", text)
                    }
                    errorText={getFieldError("observation", formik)}
                    value={formik.values.observation?.toString()}
                    multiline={true}
                />
            </Span>

            <Span justify="flex-end" py={16}>
                <Button
                    type="light"
                    title="Cancelar"
                    onPress={navigation.goBack}
                />
                <Button
                    title="Salvar"
                    onPress={formik.isSubmitting ? () => {} : formik.submitForm}
                />
            </Span>
        </View>
    );
};
