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
}

export const BatchBanner: React.FC<BatchBannerProps & ViewProps> = ({
    batch,
    showDotMenu = true,
    ...props
}) => {
    return (
        <Banner
            iconAlt="batch icon"
            iconSource={require("../../assets/images/BatchCircleIcon.png")}
            title={batch.name}
            description={batch.description}
            right={<RightContent batch={batch} showDotMenu={showDotMenu} />}
            {...props}
        />
    );
};

const RightContent = ({
    batch,
    showDotMenu,
}: {
    batch: Batch;
    showDotMenu?: boolean;
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
                    marginRight: showDotMenu ? 0 : 8,
                }}
            >
                <Paragraph secondary>{batch.count}</Paragraph>
                <Icon size={16} source="cow" color={Theme.colors.mediumGray} />
            </View>
            {showDotMenu ? <BatchDotMenu batch={batch} /> : null}
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
