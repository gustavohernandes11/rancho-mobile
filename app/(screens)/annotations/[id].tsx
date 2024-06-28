import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SimpleTable } from "components/SimpleTable";
import { Skeleton } from "components/Skeleton";
import { Span } from "components/Span";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useFocus } from "hooks/useFocus";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { sharedStyles } from "styles/Common";
import { Animal } from "types/Animal";
import { Annotation } from "types/Annotation";
import { serializeAnimalPreview, serializeAnnotation } from "utils/serializers";

export default function ViewAnnotationDetailsScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { animals } = useGlobalState();
	const [annotation, setAnnotation] = useState<Annotation | null>();
	const [relatedAnimals, setRelatedAnimals] = useState<Animal[]>();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const loadAnnotation = () =>
		Storage.getAnnotation(Number(id)).then((annotation) =>
			setAnnotation(annotation)
		);

	const filterRelatedAnimals = () => {
		if (annotation) {
			setRelatedAnimals(
				animals.filter((animal) =>
					annotation.animalIDs?.includes(animal.id)
				)
			);
		}
	};

	useEffect(() => {
		setIsLoading(() => true);
		loadAnnotation().then(() => {
			setIsLoading(() => false);
		});
	}, [id]);

	useFocus(loadAnnotation);

	useEffect(() => {
		filterRelatedAnimals();
	}, [annotation]);

	const StackScreen = () => (
		<Stack.Screen
			options={{
				headerTitle: "Anotação",
				headerRight: () => (
					<>
						<IconButton
							icon="pencil"
							iconColor={Colors.white}
							onPress={handleEdit}
						/>
						<IconButton
							icon="delete"
							iconColor={Colors.white}
							onPress={handleDelete}
						/>
					</>
				),
			}}
		/>
	);

	const handleDelete = () => {
		showConfirmationAndDelete(annotation!, () => {
			router.back();
		});
	};
	const handleEdit = () => {
		router.push(`/(screens)/annotations/edit/${id}`);
	};

	return (
		<ContainerView immediateContent={<StackScreen />}>
			{isLoading ? (
				<PageSkeleton />
			) : (
				<>
					<Span direction="column">
						<Text style={sharedStyles.label}>Título</Text>
						<Heading size="big">{annotation?.title}</Heading>
						{annotation?.description && (
							<Text style={sharedStyles.text}>
								{annotation?.description}
							</Text>
						)}
					</Span>

					{annotation && (
						<Span direction="column">
							<Heading size="small">Informações gerais</Heading>
							<SimpleTable
								data={serializeAnnotation(annotation)}
							/>
						</Span>
					)}

					{annotation?.type !== "simple" && annotation?.animalIDs && (
						<Span direction="column">
							<Heading size="small">{`Animais envolvidos (${annotation.animalIDs.length})`}</Heading>
							<Span>
								{relatedAnimals?.map((animal) => (
									<SimpleTable
										key={animal.id}
										data={serializeAnimalPreview(animal)}
									/>
								))}
							</Span>
						</Span>
					)}
				</>
			)}
		</ContainerView>
	);
}

const PageSkeleton = () => {
	return (
		<>
			<Skeleton width={20} />
			<Skeleton width={50} />
			<Span direction="row">
				<Skeleton width={150} />
				<Skeleton width={20} />
				<Skeleton width={50} />
			</Span>
			<Span direction="column">
				<Skeleton width={150} />
				<Skeleton width="100%" height={60} />
				<Skeleton width={150} />
			</Span>
			<Span direction="column">
				<Skeleton width={150} />
				<Skeleton width={200} />
				<Skeleton width="100%" height={80} />
			</Span>
		</>
	);
};
const showConfirmationAndDelete = (
	annotation: Annotation,
	onDeleteCallback: () => void
) => {
	Alert.alert(
		"Confirmação",
		"Você têm certeza que deseja deletar essa nota?",
		[
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Deletar",
				onPress: () =>
					Storage.deleteAnnotation(annotation.id).then(() =>
						onDeleteCallback()
					),
				style: "destructive",
			},
		]
	);
};
