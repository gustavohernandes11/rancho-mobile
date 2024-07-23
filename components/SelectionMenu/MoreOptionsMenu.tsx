import { useModal } from "hooks/useModal";
import React from "react";
import { IconButton, Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { CreateAnnotationButton } from "./_menuButtons/CreateAnnotationButton";
import { CreateBatchButton } from "./_menuButtons/CreateBatchButton";
import { MoveToBatchButton } from "./_menuButtons/MoveToBatchButton";
import { WriteOffByDeathButton } from "./_menuButtons/WriteOffByDeathButton";
import { WriteOffBySaleButton } from "./_menuButtons/WriteOffBySaleButton";

type MoreOptionsMenu = {
    onSuccess: (message: string) => void;
};

export const MoreOptionsMenu = ({ onSuccess }: MoreOptionsMenu) => {
    const { closeModal, isVisible, openModal } = useModal();

    return (
        <Menu
            contentStyle={commonStyles.inputAspect}
            visible={isVisible}
            onDismiss={closeModal}
            anchor={
                <IconButton
                    iconColor={Theme.colors.white}
                    icon="dots-vertical"
                    onPress={openModal}
                    style={{ margin: 0 }}
                    size={24}
                />
            }
        >
            <MoveToBatchButton />
            <CreateBatchButton closeMoreOptions={closeModal} />
            <WriteOffByDeathButton onSuccess={onSuccess} />
            <WriteOffBySaleButton onSuccess={onSuccess} />
            <CreateAnnotationButton closeMoreOptions={closeModal} />
        </Menu>
    );
};
