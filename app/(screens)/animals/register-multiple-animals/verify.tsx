import { AnimalPreviewBanner } from "components/AnimalPreviewBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Loading } from "components/Loading";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { Stack, useRouter } from "expo-router";
import { useAnimalsInReview } from "hooks/useAnimalsInReview";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useState } from "react";
import { Alert } from "react-native";
import { Storage } from "services/StorageService";
import { showToast } from "utils/showToast";

export default function VerifyAnimals() {
    const StackScreen = () => (
        <Stack.Screen options={{ headerTitle: "Verifique seus animais" }} />
    );
    const { animals, clear } = useAnimalsInReview();

    const refreshAll = useGlobalStore(store => store.refreshAll);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSucess = () => {
        clear();
        refreshAll();
        router.replace("/");
        showToast("Animais adicionados!");
    };

    const handleAddAnimals = async () => {
        setIsLoading(true);
        const operations = animals.map(animal => Storage.insertAnimal(animal));
        await Promise.all([operations])
            .then(onSucess)
            .catch(() =>
                Alert.alert(
                    "Erro",
                    "Houve um probema ao adicionar seus animais"
                )
            )
            .finally(() => setIsLoading(false));
    };

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Span gap={0}>
                        <Paragraph secondary>
                            Clique sobre o nome para uma edição rápida
                        </Paragraph>
                    </Span>
                    <Span gap={4} flexWrap="wrap" direction="column">
                        {animals.map(al => (
                            <AnimalPreviewBanner key={al.id} animal={al} />
                        ))}
                    </Span>
                    <Span justify="flex-end">
                        <Button
                            title="Voltar"
                            type="secondary"
                            onPress={router.back}
                        />
                        <Button
                            title="Adicionar todos"
                            onPress={handleAddAnimals}
                        />
                    </Span>
                </>
            )}
        </ContainerView>
    );
}
