import { MultiAnimalForm } from "components/AnimalForm/multi";
import { ContainerView } from "components/ContainerView";
import { Stack } from "expo-router";

export default function RegisterMultipleAnimals() {
    const StackScreen = () => (
        <Stack.Screen options={{ headerTitle: "Registrar vários animais" }} />
    );

    return (
        <ContainerView immediateContent={<StackScreen />}>
            <MultiAnimalForm />
        </ContainerView>
    );
}
