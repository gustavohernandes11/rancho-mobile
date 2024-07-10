import { AnimalBanner } from "components/AnimalBanner";
import { BatchBanner } from "components/BatchBanner";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Label } from "components/Label";
import { PageSkeleton } from "components/PageSkeleton";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { Animal, PopulatedAnimal } from "types";
import { serializeAnimalInfo } from "utils/serializers";

export default function ViewAnimalDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { refreshAll, animals } = useGlobalState();
    const [animal, setAnimal] = useState<PopulatedAnimal>();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchPopulatedAnimal = async () => {
        await Storage.getPopulatedAnimal(Number(id)).then(animal =>
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
                headerTitle: "Ver animal",
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

    const handleEdit = () => router.push(`/(screens)/animals/edit/${id}`);
    const handleDelete = () =>
        confirmDeleteAnimal(animal!, () => {
            refreshAll();
            router.back();
        });

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {isLoading ? (
                <PageSkeleton />
            ) : (
                <>
                    <Label>Nome</Label>
                    <Heading size="big">{animal?.name}</Heading>
                    <Span direction="column">
                        <Heading size="small">Informações gerais</Heading>
                        <SimpleTable data={serializeAnimalInfo(animal)} />
                    </Span>

                    {animal?.batch ? (
                        <Span direction="column">
                            <Heading size="small">Lote</Heading>
                            <BatchBanner
                                href={`/(screens)/batches/${animal.batch.id}`}
                                batch={animal.batch}
                            />
                        </Span>
                    ) : null}

                    {animal && animal?.paternity ? (
                        <Span direction="column">
                            <Heading size="small">Paternidade</Heading>
                            <AnimalBanner
                                href={`/(screens)/animals/${animal.paternityID}`}
                                animal={animal.paternity}
                            />
                        </Span>
                    ) : null}

                    {animal && animal?.maternity ? (
                        <Span direction="column">
                            <Heading size="small">Maternidade</Heading>
                            <AnimalBanner
                                href={`/(screens)/animals/${animal.maternityID}`}
                                animal={animal.maternity}
                            />
                        </Span>
                    ) : null}

                    {animal && animal.offspring.length > 0 ? (
                        <Span direction="column">
                            <Heading size="small">Prole</Heading>
                            {animal.offspring.map(calf => (
                                <AnimalBanner
                                    href={`/(screens)/animals/${calf.id}`}
                                    animal={calf}
                                />
                            ))}
                        </Span>
                    ) : null}
                </>
            )}
        </ContainerView>
    );
}
const confirmDeleteAnimal = (animal: Animal, onDeleteCallback: () => void) => {
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
                    Storage.deleteAnimal(animal.id).then(() =>
                        onDeleteCallback()
                    ),
                style: "destructive",
            },
        ]
    );
};
