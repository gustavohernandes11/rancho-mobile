import { TransferAnimalsModal } from "components/SelectionMenu/TransferAnimalsModal";
import { useRouter } from "expo-router";
import { useModal } from "hooks/useModal";
import React from "react";
import { View, ViewProps } from "react-native";
import { Icon, IconButton, Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Batch } from "types";
import { Banner } from "../Banner";
import { Paragraph } from "../Paragraph";
import { Span } from "../Span";
import { DeleteBatchMenuButton } from "./DeleteBatchMenuButton";

interface BatchBannerProps {
    batch: Batch;
    href: string;
    showDotMenu?: boolean;
    showChangeBatchButton?: boolean;
    relatedAnimalId?: number[];
}

export const BatchBanner: React.FC<BatchBannerProps & ViewProps> = ({
    batch,
    showDotMenu = true,
    showChangeBatchButton = false,
    relatedAnimalId,
    ...props
}) => {
    return (
        <Banner
            iconAlt="batch icon"
            iconSource={require("../../assets/images/BatchCircleIcon.png")}
            title={batch.name}
            description={batch.description}
            right={
                <RightContent
                    batch={batch}
                    showDotMenu={showDotMenu}
                    showChangeBatchButton={showChangeBatchButton}
                    relatedAnimalId={relatedAnimalId}
                />
            }
            {...props}
        />
    );
};
export const MoveToBatchButton = ({
    relatedAnimalId,
}: {
    relatedAnimalId: number[];
}) => {
    const { closeModal, isVisible, openModal } = useModal();

    return (
        <>
            <TransferAnimalsModal
                visible={isVisible}
                onDismiss={closeModal}
                closeModal={closeModal}
                targetAnimalIds={relatedAnimalId}
            />

            <IconButton
                iconColor={Theme.colors.mediumGray}
                icon="pencil"
                onPress={openModal}
                style={{ margin: 0 }}
                size={20}
            />
        </>
    );
};

const RightContent = ({
    batch,
    showDotMenu,
    showChangeBatchButton,
    relatedAnimalId,
}: {
    batch: Batch;
    showDotMenu?: boolean;
    showChangeBatchButton: boolean;
    relatedAnimalId?: number[];
}) => {
    return (
        <Span
            direction="row"
            flexWrap="nowrap"
            align="center"
            justify="flex-end"
            marginY={0}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 4,
                    marginRight: showDotMenu ? 0 : 16,
                }}
            >
                <Paragraph secondary>{batch.count}</Paragraph>
                <Icon size={16} source="cow" color={Theme.colors.mediumGray} />
            </View>
            {showDotMenu ? <BatchDotMenu batch={batch} /> : null}
            {showChangeBatchButton ? (
                <MoveToBatchButton relatedAnimalId={relatedAnimalId || []} />
            ) : null}
        </Span>
    );
};

export const BatchDotMenu = ({ batch }: { batch: Batch }) => {
    const { closeModal, isVisible, openModal } = useModal();
    const router = useRouter();

    const handleEdit = () => {
        closeModal();
        router.push(`/(screens)/batches/edit/${batch.id}`);
    };

    return (
        <Menu
            contentStyle={commonStyles.inputAspect}
            visible={isVisible}
            onDismiss={closeModal}
            anchor={
                <IconButton
                    iconColor={Theme.colors.mediumGray}
                    icon="dots-vertical"
                    onPress={openModal}
                    style={{ margin: 0 }}
                    size={24}
                />
            }
        >
            <Menu.Item
                titleStyle={commonStyles.text}
                onPress={handleEdit}
                title="Editar"
                leadingIcon="pencil"
            />
            <DeleteBatchMenuButton batch={batch} />
        </Menu>
    );
};
