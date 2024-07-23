import { AnimalBanner } from "components/AnimalBanner";
import { BatchBanner } from "components/BatchBanner";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { PageSkeleton } from "components/PageSkeleton";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Icon } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { PopulatedAnimal } from "types";
import {
    formatAge,
    formatAnimalStatus,
    formatInfo,
    getAnimalStatusIcon,
    getGenderIcon,
} from "utils/formatters";
import { AnimalPageHeaderButtons } from "../../../components/AnimalPageHeaderButtons";

export default function ViewAnimalDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [animal, setAnimal] = useState<PopulatedAnimal>();
    const [isLoading, setIsLoading] = useState(true);
    const animals = useGlobalStore(state => state.animals);

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
                headerRight: () => <AnimalPageHeaderButtons animal={animal!} />,
            }}
        />
    );

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {isLoading ? (
                <PageSkeleton />
            ) : (
                <>
                    <Heading size="big">{animal?.name}</Heading>
                    <Span direction="column">
                        <Heading size="small">Informações gerais</Heading>
                        <Span align="stretch" justify="space-between" my={0}>
                            <InfoCard
                                label="Gênero"
                                title={formatInfo(
                                    animal?.gender === "F" ? "Fêmea" : "Macho"
                                )}
                                icon={getGenderIcon(animal?.gender!)}
                            />
                            {animal?.code ? (
                                <InfoCard
                                    label="Código"
                                    title={formatInfo(animal.code)}
                                    icon={
                                        <Icon
                                            size={16}
                                            source="alpha-c-box"
                                            color={Theme.colors.mediumGray}
                                        />
                                    }
                                />
                            ) : null}
                            {animal?.status ? (
                                <InfoCard
                                    label="Situação"
                                    title={formatInfo(
                                        formatAnimalStatus(animal.status)
                                    )}
                                    icon={
                                        animal?.status &&
                                        getAnimalStatusIcon(animal.status)
                                    }
                                />
                            ) : null}
                        </Span>
                        {animal?.birthdate && (
                            <Span
                                align="stretch"
                                justify="space-between"
                                my={0}
                            >
                                <InfoCard
                                    label="Idade"
                                    title={formatInfo(
                                        formatAge(animal?.birthdate)
                                    )}
                                />
                                <InfoCard
                                    label="Data de Nascimento"
                                    title={moment(animal?.birthdate).format(
                                        "DD/MM/YYYY"
                                    )}
                                />
                            </Span>
                        )}
                        {animal?.observation && (
                            <Span direction="column" gap={4}>
                                <Heading size="small">Observação</Heading>
                                <Paragraph>{animal.observation}</Paragraph>
                            </Span>
                        )}
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
                                    key={calf.id}
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
