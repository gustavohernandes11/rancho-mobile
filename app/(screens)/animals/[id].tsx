import { AnimalBanner } from "components/AnimalBanner";
import { BatchBanner } from "components/BatchBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SimpleTable } from "components/SimpleTable";
import { Skeleton } from "components/Skeleton";
import { Span } from "components/Span";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { StorageService } from "services/StorageService";
import { Animal, PopulatedAnimal } from "types";
import { atLeastOneYearOld } from "utils/filters";
import { serializeAnimalInfo } from "utils/serializers";

export default function ViewAnimalDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { refreshAll, animals } = useGlobalState();
	const [animal, setAnimal] = useState<PopulatedAnimal>();
	const [isLoading, setIsLoading] = useState(true);

	const fetchPopulatedAnimal = async () => {
		await StorageService.loadPopulatedAnimal(Number(id)).then((animal) =>
			setAnimal(animal)
		);
	};

	useEffect(() => {
		setIsLoading(() => true);
		fetchPopulatedAnimal().then(() => setIsLoading(() => false));
	}, []);

	useEffect(() => {
		fetchPopulatedAnimal();
	}, [animals]);

	const StackScreen = () => (
		<Stack.Screen
			options={{
				headerTitle: `Detalhes do animal`,
			}}
		/>
	);

	return (
		<ContainerView immediateContent={<StackScreen />}>
			{isLoading ? (
				<Skeleton width={300} />
			) : (
				<Heading>{animal?.name}</Heading>
			)}
			<Span flexWrap="wrap">
				<Button
					type="danger"
					icon="delete"
					title="Deletar"
					onPress={() =>
						showConfirmationAndDelete(animal!, () => {
							refreshAll();
							router.back();
						})
					}
					disabled={isLoading}
				/>
				<Button
					title="Editar"
					icon="pencil"
					onPress={() => router.push(`/(screens)/animals/edit/${id}`)}
					disabled={isLoading}
				/>
				{animal &&
					animal.gender === "F" &&
					atLeastOneYearOld(animal) && (
						<Button
							icon={require("../../../assets/images/AddAnimalIcon.png")}
							title="Novo filhote"
							onPress={() =>
								router.push(
									`/(screens)/animals/register-new-born/${animal.id}`
								)
							}
							disabled={isLoading}
						/>
					)}
			</Span>
			{isLoading ? (
				<>
					<Skeleton width={250} />
					<Skeleton height={40} />
					<Skeleton height={40} />
					<Skeleton height={40} />
				</>
			) : (
				<Span direction="column">
					<Heading size="small">Informações gerais</Heading>
					<SimpleTable data={serializeAnimalInfo(animal)} />
				</Span>
			)}

			{isLoading ? (
				<>
					<Skeleton width={250} />
					<Skeleton height={40} />
				</>
			) : (
				animal?.batch && (
					<Span direction="column">
						<Heading size="small">Lote</Heading>
						<Link
							href={`/(screens)/batches/${animal.batch.id}`}
							asChild
						>
							<BatchBanner batch={animal.batch} />
						</Link>
					</Span>
				)
			)}

			{animal && animal?.paternity && (
				<Span direction="column">
					<Heading size="small">Paternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.paternityId}`}
						asChild
					>
						<AnimalBanner animal={animal.paternity} />
					</Link>
				</Span>
			)}
			{animal && animal?.maternity && (
				<Span direction="column">
					<Heading size="small">Maternidade</Heading>
					<Link
						href={`/(screens)/animals/${animal.maternityId}`}
						asChild
					>
						<AnimalBanner animal={animal.maternity} />
					</Link>
				</Span>
			)}
			{animal && animal.offspring.length > 0 && (
				<Span direction="column">
					<Heading size="small">Prole</Heading>
					{animal.offspring.map((calf) => (
						<Link
							key={calf.id}
							href={`/(screens)/animals/${calf.id}`}
							asChild
						>
							<AnimalBanner animal={calf} />
						</Link>
					))}
				</Span>
			)}
		</ContainerView>
	);
}
const showConfirmationAndDelete = (
	animal: Animal,
	onDeleteCallback: () => void
) => {
	Alert.alert(
		`Deletar animal?`,
		`Você têm certeza que deseja deletar o animal "${animal.name}"?`,
		[
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Deletar",
				onPress: () =>
					StorageService.deleteAnimal(animal.id).then(() =>
						onDeleteCallback()
					),
				style: "destructive",
			},
		]
	);
};
