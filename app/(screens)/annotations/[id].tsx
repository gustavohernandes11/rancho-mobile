import { AnimalTable } from "components/AnimalTable";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { PageSkeleton } from "components/PageSkeleton";
import { Span } from "components/Span";
import { Stack, useLocalSearchParams } from "expo-router";
import { useFocus } from "hooks/useFocus";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useEffect, useState } from "react";
import { Paragraph } from "react-native-paper";
import { Storage } from "services/StorageService";
import { Animal, Annotation } from "types";
import {
    formatAnnotationType,
    formatDateToShortPtBR,
    formatInfo,
} from "utils/formatters";
import { AnnotationPageHeaderButtons } from "../../../components/AnnotationPageHeaderButtons";

export default function ViewAnnotationDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const animals = useGlobalStore(state => state.animals);
    const [annotation, setAnnotation] = useState<Annotation | null>(null);
    const [relatedAnimals, setRelatedAnimals] = useState<Animal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
        loadAnnotation().then(() => {
            setIsLoading(false);
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
                headerRight: () =>
                    annotation ? (
                        <AnnotationPageHeaderButtons annotation={annotation} />
                    ) : null,
            }}
        />
    );

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {isLoading ? (
                <PageSkeleton />
            ) : (
                <>
                    <Span direction="column">
                        <Heading size="big">{annotation?.title}</Heading>
                        {annotation?.description && (
                            <Paragraph>{annotation?.description}</Paragraph>
                        )}
                    </Span>

                    {annotation ? (
                        <Span direction="column">
                            <Heading size="small">Informações gerais</Heading>
                            <Span
                                align="stretch"
                                justify="space-between"
                                marginY={0}
                            >
                                <InfoCard
                                    label="Tipo"
                                    size="small"
                                    title={formatAnnotationType(
                                        annotation.type
                                    )}
                                />
                                {annotation.date && (
                                    <InfoCard
                                        label="Data"
                                        size="small"
                                        title={formatDateToShortPtBR(
                                            annotation.date
                                        )}
                                    />
                                )}
                                <Span marginY={0}>
                                    {annotation.medicineName && (
                                        <InfoCard
                                            label="Vacina/Medicação"
                                            title={formatInfo(
                                                annotation.medicineName
                                            )}
                                        />
                                    )}
                                    {annotation.dosage && (
                                        <InfoCard
                                            label="Dosagem"
                                            title={formatInfo(
                                                annotation.dosage
                                            )}
                                        />
                                    )}
                                </Span>
                            </Span>
                        </Span>
                    ) : null}

                    {annotation?.type !== "simple" && annotation?.animalIDs ? (
                        <Span direction="column">
                            <Heading size="small">{`Animais envolvidos (${annotation?.animalIDs?.length})`}</Heading>
                            <Span>
                                <AnimalTable
                                    animals={relatedAnimals || []}
                                    showCheckbox={false}
                                />
                            </Span>
                        </Span>
                    ) : null}
                </>
            )}
        </ContainerView>
    );
}
