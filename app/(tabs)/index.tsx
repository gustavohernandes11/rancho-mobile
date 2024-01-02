import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { Span } from "../../components/Span";
import { Link } from "expo-router";

export default function TabOneScreen() {
	return (
		<ContainerView>
			<Heading>Início</Heading>
			<Input label="Idade" />
			<Span>
				<Input label="Idade" />
				<Input label="Idade" />
			</Span>
			<Span>
				<Link href={"/"} asChild>
					<Button title="Ir" />
				</Link>
			</Span>
			<Span paddingVertical={8}>
				<Card
					href="/"
					alt="alt"
					iconSource={require("../../assets/images/CowIcon.png")}
					title="Adicionar animal"
				/>
				<Card
					href="/"
					alt="alt"
					iconSource={require("../../assets/images/CowIcon.png")}
					title="Rebanho"
				/>
				<Card
					href="/"
					alt="alt"
					iconSource={require("../../assets/images/FenceIcon.png")}
					title="Adicionar lote"
					color="blue"
				/>
				<Card
					href="/"
					alt="alt"
					iconSource={require("../../assets/images/FenceIcon.png")}
					title="Ver lotes"
					color="blue"
				/>

				<Card
					href="/"
					alt="alt"
					iconSource={require("../../assets/images/GallonIcon.png")}
					title="Adicionar produção"
					color="purple"
				/>
				<Card
					href="/"
					alt="alt"
					iconSource={require("../../assets/images/GallonIcon.png")}
					title="Ver produção"
					color="purple"
				/>
			</Span>
		</ContainerView>
	);
}
