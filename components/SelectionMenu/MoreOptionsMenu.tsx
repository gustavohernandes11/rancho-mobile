import React, { useState } from "react";
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
    const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
    const openMoreOptions = () => setIsMoreOptionsVisible(true);
    const closeMoreOptions = () => setIsMoreOptionsVisible(false);

    return (
        <Menu
            contentStyle={commonStyles.inputAspect}
            visible={isMoreOptionsVisible}
            onDismiss={closeMoreOptions}
            anchor={
                <IconButton
                    iconColor={Theme.colors.white}
                    icon="dots-vertical"
                    onPress={openMoreOptions}
                    style={{ margin: 0 }}
                    size={24}
                />
            }
        >
            <MoveToBatchButton />
            <CreateBatchButton closeMoreOptions={closeMoreOptions} />
            <WriteOffByDeathButton onSuccess={onSuccess} />
            <WriteOffBySaleButton onSuccess={onSuccess} />
            <CreateAnnotationButton closeMoreOptions={closeMoreOptions} />
        </Menu>
    );
};
