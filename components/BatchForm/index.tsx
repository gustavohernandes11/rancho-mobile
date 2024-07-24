import { Button } from "components/Button";
import { Span } from "components/Span";
import { router } from "expo-router";
import { useFormik } from "formik";
import { useAlertUnsavedChanges } from "hooks/useAlertUnsavedChanges";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Storage } from "services/StorageService";
import { AddBatch, Batch, UpdateBatch } from "types";
import { isActive } from "utils/filters";
import { showToast } from "utils/showToast";
import { AnimalSelectionField } from "./_fields/AnimalSelectionField";
import { DescriptionField } from "./_fields/DescriptionField";
import { NameField } from "./_fields/NameField";
import { CancelButton } from "./CancelButton";
import { defaultValues } from "./defaultValues";
import { validationSchema } from "./validation.schema";

interface BatchFormProps {
    initialValues?: Batch;
    initialSelectedAnimals?: number[];
}

export const BatchForm: React.FC<BatchFormProps> = ({
    initialValues = defaultValues,
    initialSelectedAnimals = [],
}) => {
    const animals = useGlobalStore(state => state.animals).filter(isActive);
    const refreshAll = useGlobalStore(state => state.refreshAll);
    const setSelectedIDs = useAnimalSelectionStore(
        state => state.setSelectedIDs
    );
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);
    const formik = useFormik({
        initialValues,
        onSubmit: values => handleSubmit(values, !initialValues.id),
        validationSchema,
    });
    useEffect(() => {
        if (initialSelectedAnimals) {
            setSelectedIDs(initialSelectedAnimals);
        }
        if (initialValues.id) {
            Storage.listAnimals({
                batchID: initialValues.id,
            }).then(batchAnimals => {
                setSelectedIDs(batchAnimals.map(a => a.id));
            });
        }

        return () => clearSelection();
    }, [initialValues.id]);

    const onSucess = (message: string) => {
        refreshAll();
        clearSelection();
        formik.resetForm();
        showToast(message);
    };
    const onError = (e: Error) => Alert.alert("Erro!", e.message);

    useAlertUnsavedChanges({
        formik,
    });

    const handleSubmit = (
        values: AddBatch & UpdateBatch,
        isNewBatch: boolean
    ) => {
        isNewBatch
            ? Storage.insertBatch(values)
                  .then(insertedID =>
                      Storage.moveAnimalToBatch(selectedIDs, insertedID || null)
                  )
                  .then(() => onSucess(`Lote ${values.name} foi adicionado`))
                  .then(() => router.replace("/(tabs)/batches"))
                  .catch(onError)
            : Storage.updateBatch(values)
                  .then(() =>
                      Storage.compareBatchAnimalsWithSelectedAndUpdate(
                          selectedIDs,
                          values.id
                      )
                  )
                  .then(() => onSucess(`Lote ${values.name} foi atualizado`))
                  .then(() => router.back())
                  .catch(onError);
    };

    return (
        <View>
            <Span>
                <NameField formik={formik} />
            </Span>
            <Span>
                <DescriptionField formik={formik} />
            </Span>
            <Span>
                <AnimalSelectionField
                    animals={animals}
                    selectedIDs={selectedIDs}
                />
            </Span>
            <Span justify="flex-end" paddingY={16}>
                <CancelButton />
                <Button
                    title="Salvar"
                    onPress={formik.isSubmitting ? () => {} : formik.submitForm}
                />
            </Span>
        </View>
    );
};
