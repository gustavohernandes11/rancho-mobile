import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { StyleSheet, View, ViewProps } from "react-native";
import Colors from "styles/Colors";
import { Actions } from "./Actions";
import { CloseSelectionButton } from "./_iconButtons/CloseSelectionButton";

interface SelectionMenuProps {
    showActions?: boolean;
    showCloseButton?: boolean;
}

export const SelectionMenu: React.FC<SelectionMenuProps & ViewProps> = ({
    showActions = true,
    showCloseButton = true,
    ...props
}) => {
    const selectedIDs = useAnimalSelectionStore(state => state.selectedIDs);

    const styles = getStyles(showActions);

    return (
        <View style={styles.container} {...props}>
            <Span align="center" justify="space-between" my={0}>
                {showCloseButton ? <CloseSelectionButton /> : null}
                <Paragraph color="white">
                    {selectedIDs.length} selecionado(s).
                </Paragraph>
                {showActions ? <Actions /> : null}
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