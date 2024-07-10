import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Label } from "components/Label";
import { PageSkeleton } from "components/PageSkeleton";
import { Paragraph } from "components/Paragraph";
import { SimpleTable } from "components/SimpleTable";
import { Span } from "components/Span";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useFocus } from "hooks/useFocus";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Colors from "styles/Colors";
import { Animal, Annotation } from "types";
import { serializeAnimalPreview, serializeAnnotation } from "utils/serializers";

export default function ViewAnnotationDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const animals = useGlobalStore(state => state.animals);
    const [annotation, setAnnotation] = useState<Annotation | null>();
    const [relatedAnimals, setRelatedAnimals] = useState<Animal[]>();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const loadAnnotation = () =>
        Storage.getAnnotation(Number(id)).then(annotation =>
            setAnnotation(annotation)
        );

    const filterRelatedAnimals = () => {
        if (annotation) {
            setRelatedAnimals(
                animals.filter(animal =>
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
        confirmDeleteAnnotation(annotation!, router.back);
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
                        <Label>Título</Label>
                        <Heading size="big">{annotation?.title}</Heading>
                        {annotation?.description && (
                            <Paragraph>{annotation?.description}</Paragraph>
                        )}
                    </Span>

                    {annotation ? (
                        <Span direction="column">
                            <Heading size="small">Informações gerais</Heading>
                            <SimpleTable
                                data={serializeAnnotation(annotation)}
                            />
                        </Span>
                    ) : null}

                    {annotation?.type !== "simple" && annotation?.animalIDs ? (
                        <Span direction="column">
                            <Heading size="small">{`Animais envolvidos (${annotation?.animalIDs?.length})`}</Heading>
                            <Span>
                                {relatedAnimals?.map(animal => (
                                    <SimpleTable
                                        key={animal.id}
                                        data={serializeAnimalPreview(animal)}
                                    />
                                ))}
                            </Span>
                        </Span>
                    ) : null}
                </>
            )}
        </ContainerView>
    );
}

const confirmDeleteAnnotation = (
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
