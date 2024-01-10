import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { BatchInfo } from "../../../components/BatchInfo";
import { Button } from "../../../components/Button";
import { ContainerView } from "../../../components/ContainerView";
import { Heading } from "../../../components/Heading";
import { Span } from "../../../components/Span";
import { SubTitle } from "../../../components/SubTitle";
import { createStorageService } from "../../../database/createStorageServiceFactory";
import { Batch } from "../../../types/Batch";

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
				<SubTitle>{`Total: ${batches?.length}`}</SubTitle>
			</Span>
			<SubTitle>Clique sobre o lote para ver mais detalhes</SubTitle>

			{batches?.map((b) => (
				<Span marginVertical={4} key={b.id}>
					<Link href={`/(screens)/batches/${b.id}`} asChild>
						<BatchInfo batch={b} key={b.id} />
					</Link>
				</Span>
			))}
			<Span justifyContent="flex-end" paddingVertical={16}>
				<Link href={"/(screens)/batches/add"} asChild>
					<Button title="Adicionar novo lote" />
				</Link>
			</Span>
		</ContainerView>
	);
}
