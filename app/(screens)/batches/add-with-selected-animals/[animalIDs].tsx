import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RegisterAnimalToBatchScreen() {
    const { animalIDs } = useLocalSearchParams<{ animalIDs: string }>();

    const StackScreen = () => (
        <Stack.Screen options={{ headerTitle: "Adicionar lote" }} />
    );
    return (
        <ContainerView immediateContent={<StackScreen />}>
            <BatchForm
                initialSelectedAnimals={animalIDs ? JSON.parse(animalIDs) : []}
            />
        </ContainerView>
    );
}
