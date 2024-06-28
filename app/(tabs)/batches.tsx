import { BatchBanner } from "components/BatchBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { Stack, useRouter } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function ViewBatchesScreen() {
    const { batches, refreshBatches } = useGlobalState();
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
                            icon={require("../../assets/images/AddBatchIconWhite.png")}
                            onPress={() =>
                                router.push("/(screens)/batches/add")
                            }
                        />
                    ),
                }}
            />
            <Span justify="space-between" align="center">
                <Heading>Crie e edite seus lotes</Heading>
                <Paragraph>{`Total: ${batches?.length || "0"}`}</Paragraph>
            </Span>
            <View style={{ gap: 4 }}>
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
                <Span justify="center">
                    <Button
                        title="Adicionar novo lote"
                        onPress={() => router.push("/(screens)/batches/add")}
                    />
                </Span>
            </View>
        </ContainerView>
    );
}
