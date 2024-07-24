import { AnimalTable } from "components/AnimalTable";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { PageSkeleton } from "components/PageSkeleton";
import { Paragraph } from "components/Paragraph";
import { SelectionMenu } from "components/SelectionMenu";
import { Span } from "components/Span";
import { Stack, useLocalSearchParams } from "expo-router";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { PopulatedBatch } from "types";
import { BatchPageHeaderButtons } from "../../../components/BatchPageHeaderButtons";

export default function ViewBatchDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [batch, setBatch] = useState<PopulatedBatch>();
    const [isLoading, setIsLoading] = useState(true);
    const isSelectionMode = useAnimalSelectionStore(
        store => store.isSelectionMode
    );
    const batches = useGlobalStore(state => state.batches);

    const fetchPopulatedBatch = async () => {
        const populatedBatch = await Storage.getPopulatedBatch(Number(id));
        setBatch(populatedBatch);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchPopulatedBatch().finally(() => setIsLoading(false));
    }, [batches]);

    const StackScreen = () => (
        <Stack.Screen
            options={{
                headerTitle: "Ver lote",
                headerRight: () =>
                    batch ? <BatchPageHeaderButtons batch={batch} /> : null,
            }}
        />
    );

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
                    {batch?.description && (
                        <Paragraph>{batch.description}</Paragraph>
                    )}

                    <Span direction="column">
                        <Heading size="medium">{getAnimalsHeading()}</Heading>
                        {isSelectionMode ? <SelectionMenu /> : null}
                        <AnimalTable animals={batch?.animals || []} />
                    </Span>
                </>
            )}
        </ContainerView>
    );
}
