import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { Span } from "components/Span";
import { StorageService } from "database/StorageService";
import { useEffect, useState } from "react";
import { Count } from "types/Count";

export default function TabOneScreen() {
	const [count, setCount] = useState<Count>();

	useEffect(() => {
		StorageService.count().then((count) => setCount(count));
	});
	return (
		<ContainerView>
			<Heading>Início</Heading>
			<Span py={4}>
				{count?.animals && (
					<InfoCard
						title={count.animals.toString() || "?"}
						description="Animais registrados"
					/>
				)}
				{count?.batches && (
					<InfoCard
						title={count.batches.toString() || "?"}
						description="Lotes registrados"
					/>
				)}
			</Span>
			<Heading size="small">O que você quer fazer?</Heading>
			<Span flexWrap="wrap" py={4}>
				<Card
					href="/animals/add"
					alt="alt"
					iconSource={require("assets/images/CowIcon.png")}
					title="Adicionar animal"
				/>
				<Card
					href="/(tabs)/animals"
					alt="alt"
					iconSource={require("assets/images/CowIcon.png")}
					title="Rebanho"
				/>
				<Card
					href="/batches/add"
					alt="alt"
					iconSource={require("assets/images/FenceIcon.png")}
					title="Adicionar lote"
					color="blue"
				/>
				<Card
					href="/(tabs)/batches"
					alt="alt"
					iconSource={require("assets/images/FenceIcon.png")}
					title="Ver lotes"
					color="blue"
				/>
			</Span>
		</ContainerView>
	);
}
