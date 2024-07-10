import { BatchForm } from "components/BatchForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { PopulatedBatch } from "types";

export default function EditAnimalScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const refreshAnimals = useGlobalStore(state => state.refreshAll);
    const [batch, setBatch] = useState<PopulatedBatch>();

    useEffect(() => {
        const fetchData = async () => {
            await Storage.getPopulatedBatch(Number(id)).then(batch =>
                setBatch(batch)
            );
            refreshAnimals();
        };
        fetchData();
    }, []);

    const StackScreen = () => (
        <Stack.Screen
            options={{
                headerTitle: `Editando lote "${batch?.name || ""}"`,
            }}
        />
    );
    return (
        <ContainerView immediateContent={<StackScreen />}>
            {batch ? <BatchForm initialValues={batch} /> : null}
        </ContainerView>
    );
}
