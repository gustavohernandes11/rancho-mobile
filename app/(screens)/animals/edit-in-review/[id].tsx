import { AnimalForm } from "components/AnimalForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAnimalsInReview } from "hooks/useAnimalsInReview";
import { useLayoutEffect, useState } from "react";
import { Animal } from "types/Animal";

export default function EditAnimalScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [animal, setAnimal] = useState<Animal>();
    const router = useRouter();
    const { getAnimal, updateAnimal } = useAnimalsInReview();

    useLayoutEffect(() => {
        const fetchData = async () => {
            const animal = getAnimal(Number(id));
            if (animal) setAnimal(animal);
        };
        fetchData();
    }, []);

    const StackScreen = () => (
        <Stack.Screen
            options={{
                headerTitle: `Verificação do animal "${animal?.name || ""}"`,
            }}
        />
    );

    const handleEditAnimalInReview = async (values: Animal) => {
        updateAnimal(values);
        router.back();
    };

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {animal ? (
                <AnimalForm
                    initialValues={animal}
                    onSubmitOverride={handleEditAnimalInReview}
                    submitButtonText="Modificar e voltar"
                />
            ) : null}
        </ContainerView>
    );
}
