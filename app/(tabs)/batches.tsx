import { AddButton } from "components/AddIconButton";
import { BatchBanner } from "components/BatchBanner";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import { SubTitle } from "components/SubTitle";
import { Link, Stack } from "expo-router";
import { useData } from "hooks/useData";
import { useEffect } from "react";
import { View } from "react-native";

export default function ViewBatchesScreen() {
	const { batches, refreshBatches } = useData();

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
				<Heading>Lotes</Heading>
				<SubTitle>{`Total: ${batches?.length || "?"}`}</SubTitle>
			</Span>
			<SubTitle>Clique sobre o lote para ver mais detalhes</SubTitle>
			<View style={{ gap: 4 }}>
				{batches?.map((batch) => (
					<Link
						href={`/(screens)/batches/${batch.id}`}
						key={batch.id}
						asChild
					>
						<BatchBanner batch={batch} key={batch.id} />
					</Link>
				))}
			</View>
		</ContainerView>
	);
}
