import { AnimalTable } from "components/AnimalTable";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Loading } from "components/Loading";
import { PageSkeleton } from "components/PageSkeleton";
import { Paragraph } from "components/Paragraph";
import { SelectionMenu } from "components/SelectionMenu";
import { Span } from "components/Span";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { Batch, PopulatedBatch } from "types";

export default function ViewBatchDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const batches = useGlobalStore(state => state.batches);
    const refreshAll = useGlobalStore(state => state.refreshAll);
    const isSelectionMode = useAnimalSelectionStore(
        state => state.isSelectionMode
    );
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

    const [batch, setBatch] = useState<PopulatedBatch>();

    const fetchBatch = async () => {
        await Storage.getPopulatedBatch(Number(id)).then(populatedBatch =>
            setBatch(populatedBatch)
        );
    };

    useEffect(() => {
        setIsLoading(() => true);
        fetchBatch().then(() => setIsLoading(() => false));
    }, []);

    useEffect(() => {
        fetchBatch();
    }, [batches]);

    useEffect(() => {
        clearSelection();
        fetchBatch();

        return () => {
            clearSelection();
        };
    }, []);

    const StackScreen = () => (
        <Stack.Screen
            options={{
                headerTitle: "Ver lote",
                headerRight: () => (
                    <>
                        <IconButton
                            icon="pencil"
                            iconColor={Theme.colors.white}
                            onPress={handleEdit}
                        />
                        <IconButton
                            icon="delete"
                            iconColor={Theme.colors.white}
                            onPress={handleDelete}
                        />
                        <IconButton
                            icon={require("../../../assets/images/AddCowIcon.png")}
                            iconColor={Theme.colors.white}
                            onPress={handleRegisterAnimal}
                        />
                    </>
                ),
            }}
        />
    );

    const handleDelete = () =>
        confirmDeleteBatch(batch!, () => {
            refreshAll();
            router.back();
        });

    const handleEdit = () =>
        router.push(`/(screens)/batches/edit/${batch!.id}`);
    const handleRegisterAnimal = () =>
        router.push(`/(screens)/batches/register-animal-to-batch/${batch!.id}`);

    const getAnimalsHeading = () => {
        if (!batch) return "Vazio";

        const animalCount = batch.animals.length;
        return `Animais do lote ${
            animalCount > 0 ? `(${animalCount})` : "(Vazio)"
        }`;
    };

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {isLoading ? (
                <PageSkeleton />
            ) : (
                <>
                    <Heading size="big">{batch?.name}</Heading>
                    {batch?.description ? (
                        <Paragraph>{batch.description}</Paragraph>
                    ) : null}

                    <Span direction="column">
                        <Heading size="medium">{getAnimalsHeading()}</Heading>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <>
                                {isSelectionMode ? <SelectionMenu /> : null}
                                <AnimalTable animals={batch?.animals || []} />
                            </>
                        )}
                    </Span>
                </>
            )}
        </ContainerView>
    );
}

export const confirmDeleteBatch = (
    batch: Batch,
    onConfirmCallback: () => void
) => {
    Alert.alert(
        `Deletar apenas o lote?`,
        `Você têm certeza que deseja deletar o lote "${
            batch?.name || ""
        }"? Os animais serão apenas desvinculados e não serão deletados.`,

        [
            {
                text: "Deletar",
                isPreferred: true,
                onPress: () =>
                    Storage.deleteBatch(batch.id).then(() =>
                        onConfirmCallback()
                    ),
                style: "default",
            },
            {
                text: "Deletar lote e animais",
                onPress: () =>
                    Storage.deleteBatchWithAnimals(batch.id).then(() =>
                        onConfirmCallback()
                    ),
                style: "destructive",
            },
            {
                text: "Cancelar",
                style: "cancel",
            },
        ]
    );
};
