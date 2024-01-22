import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { Span } from "components/Span";
import { useData } from "hooks/useData";

export default function TabOneScreen() {
	const { animals, batches } = useData();
	return (
		<ContainerView>
			<Heading>Início</Heading>
			<Span py={4}>
				{animals && (
					<InfoCard
						title={animals.length.toString() || "?"}
						description="Animais registrados"
					/>
				)}
				{batches && (
					<InfoCard
						title={batches.length.toString() || "?"}
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
