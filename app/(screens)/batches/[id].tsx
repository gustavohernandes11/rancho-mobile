import { AnimalTable } from "components/AnimalTable";
import { Button } from "components/Button";
import { CheckboxItem } from "components/CheckboxItem";
import { ContainerView } from "components/ContainerView";
import { Dialog } from "components/Dialog";
import { Heading } from "components/Heading";
import { PageSkeleton } from "components/PageSkeleton";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useModal } from "hooks/useModal";
import { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { Batch, PopulatedBatch } from "types";

type ConfirmDeleteBatchDialogProps = {
    batch: Batch;
    isVisible: boolean;
    closeModal: () => void;
};

const ConfirmDeleteBatchDialog = ({
    batch,
    isVisible,
    closeModal,
}: ConfirmDeleteBatchDialogProps) => {
    const { refreshAll } = useGlobalStore();
    const [shouldDeleteAnimals, setShouldDeleteAnimals] = useState(false);
    const router = useRouter();

    const handleCheck = () => setShouldDeleteAnimals(prev => !prev);

    return (
        <Dialog
            title="Deletar lote?"
            visible={isVisible}
            content={
                <>
                    <Paragraph>
                        Tem certeza que deseja deletar o lote "{batch.name}"?
                    </Paragraph>
                    <CheckboxItem
                        isChecked={
                            shouldDeleteAnimals ? "checked" : "unchecked"
                        }
                        onPress={handleCheck}
                        label="Deletar animais vinculados."
                    />
                </>
            }
            buttons={
                <>
                    <Button
                        title="Cancelar"
                        type="light-danger"
                        onPress={closeModal}
                    />
                    <Button
                        title="Confirmar"
                        type="danger"
                        onPress={() => {
                            if (batch) {
                                Storage.deleteBatch(batch.id).then(() => {
                                    refreshAll();
                                    router.back();
                                });
                            }
                        }}
                    />
                </>
            }
            onDismiss={closeModal}
        />
    );
};

const BatchHeaderButtons = ({ batch }: { batch: Batch }) => {
    const router = useRouter();
    const { openModal, closeModal, isVisible } = useModal();

    const handleEdit = () => router.push(`/(screens)/batches/edit/${batch.id}`);
    const handleDelete = () => openModal();
    const handleRegisterAnimal = () =>
        router.push(`/(screens)/batches/register-animal-to-batch/${batch.id}`);

    return (
        <>
            <IconButton
                icon="pencil"
                iconColor={Theme.colors.white}
                onPress={handleEdit}
            />
            <IconButton
                icon="delete"
                iconColor={Theme.colors.white}
                onPress={handleDelete}
            />
            <IconButton
                icon={require("../../../assets/images/AddCowIcon.png")}
                iconColor={Theme.colors.white}
                onPress={handleRegisterAnimal}
            />
            <ConfirmDeleteBatchDialog
                batch={batch!}
                closeModal={closeModal}
                isVisible={isVisible}
            />
        </>
    );
};

export default function ViewBatchDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [batch, setBatch] = useState<PopulatedBatch>();
    const [isLoading, setIsLoading] = useState(true);
    const batches = useGlobalStore(state => state.batches);

    const fetchPopulatedBatch = async () => {
        const populatedBatch = await Storage.getPopulatedBatch(Number(id));
        setBatch(populatedBatch);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchPopulatedBatch().finally(() => setIsLoading(false));
    }, [batches]);

    const StackScreen = () => (
        <Stack.Screen
            options={{
                headerTitle: "Ver lote",
                headerRight: () =>
                    batch ? <BatchHeaderButtons batch={batch} /> : null,
            }}
        />
    );

    const getAnimalsHeading = () => {
        if (!batch) return "Vazio";

        const animalCount = batch.animals.length;
        return `Animais do lote ${
            animalCount > 0 ? `(${animalCount})` : "(Vazio)"
        }`;
    };

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {isLoading ? (
                <PageSkeleton />
            ) : (
                <>
                    <Heading size="big">{batch?.name}</Heading>
                    {batch?.description && (
                        <Paragraph>{batch.description}</Paragraph>
                    )}

                    <Span direction="column">
                        <Heading size="medium">{getAnimalsHeading()}</Heading>
                        <AnimalTable animals={batch?.animals || []} />
                    </Span>
                </>
            )}
        </ContainerView>
    );
}
