import { ContainerView } from "components/ContainerView";
import { MonthDetailsForm } from "components/MonthDetailsForm";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RegisterAnimalToBatchScreen() {
    const { month } = useLocalSearchParams<{ month: string }>();

    const StackScreen = () => (
        <Stack.Screen options={{ headerTitle: "Adicionar anotação" }} />
    );
    return (
        <ContainerView immediateContent={<StackScreen />}>
            <MonthDetailsForm month={month || ""} />
        </ContainerView>
    );
}
