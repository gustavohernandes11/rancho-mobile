import { AddButton } from "components/AddIconButton";
import { BatchBanner } from "components/BatchBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { Link, Stack, router } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function ViewBatchesScreen() {
	const { batches, refreshBatches } = useGlobalState();

	useEffect(() => {
		refreshBatches();
	}, []);

	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Lotes",
					headerRight: () => (
						<AddButton href="/(screens)/batches/add" />
					),
				}}
			/>
			<Span justify="space-between" align="center">
				<Heading>Crie e edite seus lotes</Heading>
				<SubTitle>{`Total: ${batches?.length || "..."}`}</SubTitle>
			</Span>
			<View style={{ gap: 4 }}>
				{batches.length > 0 ? (
					batches?.map((batch) => (
						<Link
							href={`/(screens)/batches/${batch.id}`}
							key={batch.id}
							asChild
						>
							<BatchBanner batch={batch} key={batch.id} />
						</Link>
					))
				) : (
					<Span direction="column">
						<Text>Nenhum lote adicionado ainda.</Text>
					</Span>
				)}
				<Span justify="center" py={8}>
					<Button
						title="Adicionar novo lote"
						onPress={() => router.push("/(screens)/batches/add")}
					/>
				</Span>
			</View>
		</ContainerView>
	);
}
