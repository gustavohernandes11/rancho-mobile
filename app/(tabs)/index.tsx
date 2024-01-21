import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { Span } from "components/Span";
import { useData } from "hooks/useData";

export default function TabOneScreen() {
	const { animals } = useData();
	return (
		<ContainerView>
			<Heading>Início</Heading>
			<Span>
				{animals && (
					<InfoCard
						title={animals.length.toString() || "?"}
						description="Animais registrados"
					/>
				)}
			</Span>
			<Heading size="small">O que você quer fazer?</Heading>
			<Span flexWrap="wrap">
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
