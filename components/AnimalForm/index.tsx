import { Button } from "components/Button";
import { Span } from "components/Span";
import { useNavigation, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useGlobalStore } from "hooks/useGlobalStore";
import React from "react";
import { Alert, View } from "react-native";
import { Storage } from "services/StorageService";
import { Animal } from "types/Animal";
import { showToast } from "utils/showToast";
import { BatchSelectField } from "./_fields/BatchSelectField";
import { MemoBirthdateDatePickerField } from "./_fields/BirthdateDatePickerField";
import { CodeField } from "./_fields/CodeField";
import { GenderField } from "./_fields/GenderField";
import { MemoMaternityField } from "./_fields/MaternityField";
import { NameField } from "./_fields/NameField";
import { ObservationField } from "./_fields/ObservationField";
import { MemoPaternityField } from "./_fields/PaternityField";
import { StatusRadioField } from "./_fields/StatusRadioField";
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

    const onSuccess = (message: string) => {
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
                      onSuccess(`${values.name} foi atualizado(a) com sucesso.`)
                  )
                  .catch(onError)
            : Storage.insertAnimal(values)
                  .then(() =>
                      onSuccess(`${values.name} foi adicionado(a) com sucesso.`)
                  )
                  .catch(onError);
    };

    const formik = useFormik({
        initialValues: mergedInitialValues,
        onSubmit,
        validationSchema,
    });
    const navigation = useNavigation();
    const router = useRouter();
    const refreshAll = useGlobalStore(state => state.refreshAll);

    return (
        <View>
            <Span>
                <NameField formik={formik} />
            </Span>
            <Span>
                <GenderField formik={formik} />
            </Span>
            <Span>
                <MemoBirthdateDatePickerField formik={formik} />
            </Span>
            <Span>
                <BatchSelectField formik={formik} />
            </Span>
            {isUpdate ? (
                <Span>
                    <StatusRadioField formik={formik} />
                </Span>
            ) : null}
            <Span>
                <CodeField formik={formik} />
            </Span>
            <Span>
                <MemoPaternityField formik={formik} />
            </Span>
            <Span>
                <MemoMaternityField formik={formik} />
            </Span>
            <Span>
                <ObservationField formik={formik} />
            </Span>
            <Span justify="flex-end" paddingY={16}>
                <Button
                    type="secondary"
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
