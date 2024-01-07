import { Card } from "../../components/Card";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";
import { Span } from "../../components/Span";
import { Input } from "../../components/Input";

export default function TabOneScreen() {
	return (
		<ContainerView>
			<Heading>Início</Heading>

			<Span flexWrap="wrap">
				<Card
					href="/add-animal"
					alt="alt"
					iconSource={require("../../assets/images/CowIcon.png")}
					title="Adicionar animal"
				/>
				<Card
					href="/view-animals"
					alt="alt"
					iconSource={require("../../assets/images/CowIcon.png")}
					title="Rebanho"
				/>
				<Card
					href="/add-batch"
					alt="alt"
					iconSource={require("../../assets/images/FenceIcon.png")}
					title="Adicionar lote"
					color="blue"
				/>
				<Card
					href="/view-batches"
					alt="alt"
					iconSource={require("../../assets/images/FenceIcon.png")}
					title="Ver lotes"
					color="blue"
				/>
				<Card
					href="/add-production"
					alt="alt"
					iconSource={require("../../assets/images/GallonIcon.png")}
					title="Adicionar produção"
					color="purple"
				/>
				<Card
					href="/view-production"
					alt="alt"
					iconSource={require("../../assets/images/GallonIcon.png")}
					title="Ver produção"
					color="purple"
				/>
			</Span>
		</ContainerView>
	);
}
