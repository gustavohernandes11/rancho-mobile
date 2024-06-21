import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { Span } from "components/Span";
import { useFocusEffect } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Count } from "types/Count";

export default function TabOneScreen() {
	const [count, setCount] = useState<Count>();
	const { refreshAll } = useGlobalState();

	useFocusEffect(() => {
		Storage.count().then((count) => setCount(count));
	});

	useEffect(() => {
		refreshAll();
	}, []);

	return (
		<ContainerView>
			<Heading>Início</Heading>
			<Span py={4}>
				{count ? (
					<InfoCard
						title={count.animals.toString() || "?"}
						description="Animais registrados"
					/>
				) : null}
				{count ? (
					<InfoCard
						title={count.batches.toString() || "?"}
						description="Lotes registrados"
					/>
				) : null}
			</Span>
			<Heading size="small">O que você quer fazer?</Heading>
			<Span flexWrap="wrap" py={4}>
				<Card
					href="/animals/add"
					alt="alt"
					iconSource={require("assets/images/AddAnimalIcon.png")}
					title="Registrar animal"
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
					iconSource={require("assets/images/AddBatchIcon.png")}
					title="Registrar lote"
					color="blue"
				/>
				<Card
					href="/(tabs)/batches"
					alt="alt"
					iconSource={require("assets/images/FenceIcon.png")}
					title="Lotes"
					color="blue"
				/>
			</Span>
		</ContainerView>
	);
}
