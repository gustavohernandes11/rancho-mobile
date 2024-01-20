import { BatchInfoBanner } from "components/BatchInfoBanner";
import { Button } from "components/Button";
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
			<Stack.Screen options={{ headerTitle: "Lotes" }} />
			<Span justifyContent="space-between" alignItems="center">
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
						<BatchInfoBanner batch={batch} key={batch.id} />
					</Link>
				))}
			</View>
			<Span justifyContent="flex-end" paddingVertical={8}>
				<Link href={"/(screens)/batches/add"} asChild>
					<Button title="Adicionar novo lote" />
				</Link>
			</Span>
		</ContainerView>
	);
}
