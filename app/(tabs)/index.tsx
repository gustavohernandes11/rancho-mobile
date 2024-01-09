import { Card } from "../../components/Card";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";
import { Span } from "../../components/Span";

export default function TabOneScreen() {
	return (
		<ContainerView>
			<Heading>Início</Heading>

			<Span flexWrap="wrap">
				<Card
					href="/animals/add"
					alt="alt"
					iconSource={require("../../assets/images/CowIcon.png")}
					title="Adicionar animal"
				/>
				<Card
					href="/animals"
					alt="alt"
					iconSource={require("../../assets/images/CowIcon.png")}
					title="Rebanho"
				/>
				<Card
					href="/batches/add"
					alt="alt"
					iconSource={require("../../assets/images/FenceIcon.png")}
					title="Adicionar lote"
					color="blue"
				/>
				<Card
					href="/batches"
					alt="alt"
					iconSource={require("../../assets/images/FenceIcon.png")}
					title="Ver lotes"
					color="blue"
				/>
				<Card
					href="/production/add"
					alt="alt"
					iconSource={require("../../assets/images/GallonIcon.png")}
					title="Adicionar produção"
					color="purple"
				/>
				<Card
					href="/production"
					alt="alt"
					iconSource={require("../../assets/images/GallonIcon.png")}
					title="Ver produção"
					color="purple"
				/>
			</Span>
		</ContainerView>
	);
}
