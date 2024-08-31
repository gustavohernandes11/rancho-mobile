import { MultiAnimalForm } from "components/AnimalForm/multi";
import { ContainerView } from "components/ContainerView";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { Stack } from "expo-router";

export default function RegisterMultipleAnimals() {
    const StackScreen = () => (
        <Stack.Screen options={{ headerTitle: "Registrar vários animais" }} />
    );

    return (
        <ContainerView immediateContent={<StackScreen />}>
            <Span>
                <Paragraph>
                    Adicione a quantidade e as informações comuns a todos os
                    animais para uma adição rápida.
                </Paragraph>
            </Span>
            <MultiAnimalForm />
        </ContainerView>
    );
}
