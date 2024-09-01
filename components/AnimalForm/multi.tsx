import { Button } from "components/Button";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { useNavigation, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useAnimalsInReview } from "hooks/useAnimalsInReview";
import React from "react";
import { View } from "react-native";
import { Animal } from "types/Animal";
import { AnimalFormValues } from "types/AnimalFormField";
import { BatchSelectField } from "./_fields/BatchSelectField";
import { MemoBirthdateDatePickerField } from "./_fields/BirthdateDatePickerField";
import { GenderField } from "./_fields/GenderField";
import { ObservationField } from "./_fields/ObservationField";
import { PrefixField } from "./_fields/PrefixField";
import { QuantityField } from "./_fields/QuantityField";
import { defaultValues } from "./defaultValues";
import { validateQuantity } from "./validateQuantity.schema";
import { validationSchema } from "./validation.schema";

const generateAnimals = (quantity: number, common: Animal): Animal[] => {
    let animals = [];

    for (let i = 0; i < quantity; ++i) {
        let animal = Object.assign({ ...common }, { id: i });
        animals.push(animal);
    }

    return animals;
};

export const MultiAnimalForm: React.FC = () => {
    const { setAnimals } = useAnimalsInReview();

    const onSubmit = (values: AnimalFormValues) => {
        if (values.quantity && Number(values.quantity) > 0) {
            const animals = generateAnimals(values.quantity, values);
            setAnimals(animals);
            router.navigate("/animals/register-multiple-animals/verify");
        }
    };

    const initialValues: AnimalFormValues = Object.assign(defaultValues, {
        quantity: 0,
    });

    const validationWithQuantity = validationSchema.concat(validateQuantity);

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: validationWithQuantity,
    });

    const navigation = useNavigation();
    const router = useRouter();

    return (
        <View>
            <Span>
                <QuantityField formik={formik} />
            </Span>
            <Span gap={0}>
                <Heading>Informações em comum</Heading>
                <Paragraph secondary>
                    Esses dados serão aplicados para todos os animais
                </Paragraph>
            </Span>
            <Span>
                <PrefixField formik={formik} />
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
            <Span>
                <ObservationField formik={formik} />
            </Span>
            <Span justify="flex-end" paddingY={16}>
                <Button
                    type="secondary"
                    title="Cancelar"
                    onPress={navigation.goBack}
                />
                <Button title="Verificar" onPress={formik.submitForm} />
            </Span>
        </View>
    );
};
