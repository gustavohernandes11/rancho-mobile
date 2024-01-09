import { Link, Stack } from "expo-router";
import { ContainerView } from "../../../components/ContainerView";
import { BatchInfo } from "../../../components/BatchInfo";
import { useEffect, useState } from "react";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { Batch } from "../../../types/Batch";
import { Button } from "../../../components/Button";
import { Span } from "../../../components/Span";
import { HelperText } from "react-native-paper";

export default function ViewBatchesScreen() {
	const [batches, setBatches] = useState<Batch[]>();

	useEffect(() => {
		const storageService = createStorageService();
		const fetchData = async () => {
			const batches = await storageService.listAllBatchesInfo();
			setBatches(batches);
		};
		fetchData();
	}, []);
	return (
		<ContainerView>
			<Stack.Screen options={{ headerTitle: "Ver lotes" }} />
			<HelperText
				style={{ padding: 0, marginBottom: 8 }}
				type="info"
			>{`Total: ${batches?.length}`}</HelperText>
			<HelperText style={{ padding: 0, marginBottom: 8 }} type="info">
				Clique sobre o lote para ver mais detalhes
			</HelperText>

			{batches?.map((b) => (
				<Link href={`/(screens)/batches/${b.id}`} asChild>
					<BatchInfo batch={b} key={b.id} />
				</Link>
			))}
			<Span justifyContent="flex-end">
				<Link href={"/(screens)/batches/add"} asChild>
					<Button title="Adicionar novo lote" />
				</Link>
			</Span>
		</ContainerView>
	);
}
