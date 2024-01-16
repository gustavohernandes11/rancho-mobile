import { Button } from "components/Button";
import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Span } from "components/Span";
import { SqliteRepository } from "database/SqliteRepository";

export default function TabOneScreen() {
	const repo = new SqliteRepository();

	return (
		<ContainerView>
			<Heading>Início</Heading>

			<Span flexWrap="wrap">
				<Card
					href="/animals/add"
					alt="alt"
					iconSource={require("assets/images/CowIcon.png")}
					title="Adicionar animal"
				/>
				<Card
					href="/animals"
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
					href="/batches"
					alt="alt"
					iconSource={require("assets/images/FenceIcon.png")}
					title="Ver lotes"
					color="blue"
				/>
			</Span>
			<Span flexWrap="wrap">
				<Button
					title="handleInsertOne"
					onPress={() =>
						repo.insertAnimal({
							gender: "F",
							name: "Animal 1",
							observation: "OBSERVATION",
						})
					}
				/>
				<Button
					title="handleGetOneAnimal"
					onPress={() => {
						repo.loadAnimal(3);
					}}
				/>
				<Button title="dropAnimalTable" onPress={repo.clearDatabase} />
				<Button title="initDatabase" onPress={repo.initDatabase} />
				<Button
					title="insertOneBatch"
					onPress={() =>
						repo.insertBatch({
							name: "anyBatchName",
							description: "any",
						})
					}
				/>
				<Button
					title="insertAnimal"
					onPress={() =>
						repo.insertAnimal({
							name: "anyBatchName",
							gender: "F",
						})
					}
				/>
				<Button
					title="getBatchById"
					onPress={() => repo.loadBatchInfo(1)}
				/>
			</Span>
		</ContainerView>
	);
}
