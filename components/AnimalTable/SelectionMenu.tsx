import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";
import Colors from "styles/Colors";
import { SelectionMenuActionButtons } from "./SelectionMenuActionButtons";
import { TransferAnimalsModal } from "./TransferAnimalsModal";

interface SelectionMenuProps {
    showActions?: boolean;
    showCloseButton?: boolean;
    onClearSelection: () => void;
    selectedIDs: number[];
    onSelectAll: () => void;
    onDeleteMany: () => void;
    onWriteOffByDeath: () => void;
    onWriteOffBySale: () => void;
    onCreateBatchWithSelectedAnimals: () => void;
    onCreateAnnotationWithSelectedAnimals: () => void;
}

export const SelectionMenu: React.FC<SelectionMenuProps & ViewProps> = ({
    showActions = true,
    showCloseButton = true,
    onClearSelection,
    selectedIDs,
    onSelectAll,
    onDeleteMany,
    onWriteOffByDeath,
    onWriteOffBySale,
    onCreateBatchWithSelectedAnimals,
    onCreateAnnotationWithSelectedAnimals,
    ...props
}) => {
    const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
    const [isMoreOptionsVisible, setIsMoreOptionsVisible] = useState(false);
    const openMoreOptions = () => setIsMoreOptionsVisible(true);
    const closeMoreOptions = () => setIsMoreOptionsVisible(false);

    const styles = getStyles(showActions);
    return (
        <View style={styles.container} {...props}>
            <TransferAnimalsModal
                visible={isBatchModalVisible}
                onDismiss={() => setIsBatchModalVisible(false)}
                setIsBatchModalVisible={setIsBatchModalVisible}
                onClearSelection={onClearSelection}
                selectedIDs={selectedIDs}
            />
            <Span align="center" justify="space-between" my={0}>
                {showCloseButton && (
                    <IconButton
                        iconColor={Colors.white}
                        icon="close-thick"
                        onPress={onClearSelection}
                        style={{
                            margin: 0,
                        }}
                        size={24}
                    />
                )}
                <Paragraph color="white">
                    {selectedIDs.length} selecionado(s).
                </Paragraph>
                {showActions && (
                    <SelectionMenuActionButtons
                        onDeleteMany={onDeleteMany}
                        onSelectAll={onSelectAll}
                        onWriteOffByDeath={onWriteOffByDeath}
                        onWriteOffBySale={onWriteOffBySale}
                        selectedIDs={selectedIDs}
                        onMove={() => setIsBatchModalVisible(true)}
                        onCreateBatchWithSelectedAnimals={
                            onCreateBatchWithSelectedAnimals
                        }
                        onCreateAnnotationWithSelectedAnimals={
                            onCreateAnnotationWithSelectedAnimals
                        }
                        isMoreOptionsVisible={isMoreOptionsVisible}
                        onCloseMoreOptions={closeMoreOptions}
                        openMoreOptions={openMoreOptions}
                    />
                )}
            </Span>
        </View>
    );
};

const getStyles = (showActions: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.border,
            backgroundColor: Colors.green,
            padding: 8,
            ...(!showActions && { padding: 16 }),
        },
    });
