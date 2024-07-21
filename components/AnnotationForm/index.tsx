import { Button } from "components/Button";
import { Span } from "components/Span";
import { useNavigation, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useAlertUnsavedChanges } from "hooks/useAlertUnsavedChanges";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Storage } from "services/StorageService";
import { Annotation } from "types";
import { showToast } from "utils/showToast";
import { AnimalSelectionField } from "./_fields/AnimalSelectionField";
import { AnnotationTypeSelect } from "./_fields/AnnotationTypeSelect";
import { DateField } from "./_fields/DateField";
import { DescriptionField } from "./_fields/DescriptionField";
import { MedicineFields } from "./_fields/MedicineFields";
import { TitleField } from "./_fields/TitleField";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface AnnotationFormProps {
    initialValues?: Partial<Annotation>;
    initialSelectedAnimals?: number[];
}
export const AnnotationForm: React.FC<AnnotationFormProps> = ({
    initialValues = defaultValues,
    initialSelectedAnimals = [],
}) => {
    let mergedInitialValues: Annotation = Object.assign(
        {},
        defaultValues,
        initialValues
    );

    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const setSelectedIDs = useAnimalSelectionStore(
        state => state.setSelectedIDs
    );
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

    const router = useRouter();
    const refreshAll = useGlobalStore(state => state.refreshAll);

    useEffect(() => {
        setSelectedIDs([
            ...(mergedInitialValues.animalIDs || []),
            ...initialSelectedAnimals,
        ]);

        return () => clearSelection();
    }, []);

    const onSubmit = (values: Annotation) => {
        let annotation = { ...values };
        if (values.type !== "simple") {
            annotation.animalIDs = selectedIDs;
        }
        if (initialValues.id) {
            Storage.updateAnnotation(annotation)
                .then(() =>
                    onSucess(`Anotação "${values.title}" foi atualizada`)
                )
                .catch(onError);
        } else {
            Storage.insertAnnotation(annotation)
                .then(() => onSucess("Anotado!"))
                .catch(onError);
        }
    };

    const formik = useFormik({
        initialValues: mergedInitialValues,
        onSubmit,
        validationSchema,
    });

    const navigation = useNavigation();

    useAlertUnsavedChanges({
        formik,
    });

    const onSucess = (message: string) => {
        formik.resetForm();
        showToast(message);
        router.back();
        refreshAll();
    };
    const onError = (error: Error) => Alert.alert("Erro!", error.message);

    return (
        <View>
            <Span>
                <AnnotationTypeSelect formik={formik} />
            </Span>
            <Span>
                <TitleField formik={formik} />
            </Span>
            <Span>
                <DescriptionField formik={formik} />
            </Span>
            {formik.values.type === "heath care" ? (
                <Span direction="row">
                    <MedicineFields formik={formik} />
                </Span>
            ) : null}
            <Span>
                <DateField formik={formik} />
            </Span>
            {formik.values.type !== "simple" ? (
                <Span>
                    <AnimalSelectionField selectedIDs={selectedIDs} />
                </Span>
            ) : null}
            <Span justify="flex-end" py={16}>
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
