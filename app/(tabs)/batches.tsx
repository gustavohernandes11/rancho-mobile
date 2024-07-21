import { BatchBanner } from "components/BatchBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { Stack, useRouter } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useEffect } from "react";
import { Text } from "react-native";

export default function ViewBatchesScreen() {
    const batches = useGlobalStore(state => state.batches);
    const refreshBatches = useGlobalStore(state => state.refreshBatches);
    const router = useRouter();

    useEffect(() => {
        refreshBatches();
    }, []);

    return (
        <ContainerView>
            <Stack.Screen
                options={{
                    headerTitle: "Lotes",
                    headerRight: () => (
                        <Button
                            title="Novo lote"
                            icon={require("../../assets/images/FolderPlusIcon.png")}
                            onPress={() =>
                                router.push("/(screens)/batches/add")
                            }
                            type="light"
                        />
                    ),
                }}
            />
            <Span justify="space-between" align="center">
                <Heading>Crie e edite seus lotes</Heading>
                <Paragraph>{`Total: ${batches?.length || "0"}`}</Paragraph>
            </Span>
            <Span direction="column">
                {batches.length > 0 ? (
                    batches?.map(batch => (
                        <BatchBanner
                            href={`/(screens)/batches/${batch.id}`}
                            batch={batch}
                            key={batch.id}
                        />
                    ))
                ) : (
                    <Span direction="row" justify="center">
                        <Text>Nenhum lote adicionado.</Text>
                    </Span>
                )}
                <Span justify="center" py={8}>
                    <Button
                        title="Adicionar novo lote"
                        onPress={() => router.push("/(screens)/batches/add")}
                    />
                </Span>
            </Span>
        </ContainerView>
    );
}
