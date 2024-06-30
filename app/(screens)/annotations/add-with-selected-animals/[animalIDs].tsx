import { AnnotationForm } from "components/AnnotationForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RegisterAnimalToBatchScreen() {
    const { animalIDs } = useLocalSearchParams<{ animalIDs: string }>();

    const StackScreen = () => (
        <Stack.Screen options={{ headerTitle: "Adicionar anotação" }} />
    );
    return (
        <ContainerView immediateContent={<StackScreen />}>
            <AnnotationForm
                initialValues={{ type: "heath care" }}
                initialSelectedAnimals={animalIDs ? JSON.parse(animalIDs) : []}
            />
        </ContainerView>
    );
}
