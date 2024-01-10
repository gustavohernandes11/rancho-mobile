import { Link, Stack } from "expo-router";
import { ContainerView } from "../../../components/ContainerView";
import { BatchInfo } from "../../../components/BatchInfo";
import { useEffect, useState } from "react";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { Batch } from "../../../types/Batch";
import { Button } from "../../../components/Button";
import { Span } from "../../../components/Span";
import { HelperText } from "react-native-paper";
import { Heading } from "../../../components/Heading";

const storageService = createStorageService();
export default function ViewBatchesScreen() {
	const [batches, setBatches] = useState<Batch[]>();

	useEffect(() => {
		const fetchData = async () => {
			const batches = await storageService.listAllBatchesInfo();
			setBatches(batches);
		};
		fetchData();
	}, []);
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Ver lotes" }} />
			<Span justifyContent="space-between">
				<Heading>Lotes</Heading>
				<HelperText
					style={{ padding: 0, marginBottom: 8 }}
					type="info"
				>{`Total: ${batches?.length}`}</HelperText>
			</Span>
			<HelperText style={{ padding: 0, marginBottom: 8 }} type="info">
				Clique sobre o lote para ver mais detalhes
			</HelperText>

			{batches?.map((b) => (
				<Link key={b.id} href={`/(screens)/batches/${b.id}`} asChild>
					<BatchInfo batch={b} key={b.id} />
				</Link>
			))}
			<Span justifyContent="flex-end" paddingVertical={16}>
				<Link href={"/(screens)/batches/add"} asChild>
					<Button title="Adicionar novo lote" />
				</Link>
			</Span>
		</ContainerView>
	);
}
