import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ContainerView } from "../../components/ContainerView";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Span } from "../../components/Span";
import { Link } from "expo-router";
import { Item } from "../../types/Item";
import { SimpleTable } from "../../components/SimpleTable";
import { AnimalTable } from "../../components/AnimalTable";
import { Animal } from "../../types/Animal";
import { IconButton } from "../../components/IconButton";
import { BatchInfo } from "../../components/BatchInfo";

export default function TabOneScreen() {
	const items: Item[] = [
		{ key: "First option", value: "1" },
		{ key: "Second option", value: "2" },
		{ key: "Third option", value: "3" },
		{ key: "Forthy option", value: "4" },
	];
	const animals: Animal[] = [
		{ id: 1, name: "Name 1", gender: "F" },
		{ id: 2, name: "Name 2", gender: "M" },
		{ id: 3, name: "Name 3", gender: "M" },
		{ id: 4, name: "Name 4", gender: "F" },
	];
	return (
		<ContainerView>
			<Heading>Início</Heading>
			<BatchInfo
				batch={{
					name: "Bezerros",
					description: "Bezerros de 1 a 2 anos de idade",
					count: 23,
				}}
			/>
			<Span>
				<IconButton icon="expand" />
				<IconButton type="danger" icon="trash" />
				<IconButton type="light" icon="search" />
			</Span>
			<AnimalTable animals={animals} />
			<SimpleTable data={items} />
			<Span>
				<Select
					label="Lote"
					error="Campo requerido"
					items={items}
					onSelect={() => {}}
				/>
			</Span>
			<Span>
				<Input label="Idade" textArea={true} />
			</Span>
			<Span flexWrap="nowrap" alignItems="flex-start">
				<Input label="Idade" placeholder="Um input qualquer" />
				<Input label="Idade" error="Algum erro" />
			</Span>
			<Span paddingVertical={8} flexWrap="wrap">
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
