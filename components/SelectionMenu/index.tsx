import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { ZoomAnimatedView } from "components/ZoomAnimatedView";
import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { StyleSheet, ViewProps } from "react-native";
import Theme from "styles/Theme";
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
        <ZoomAnimatedView style={styles.container} {...props}>
            <Span align="center" justify="space-between" marginY={0}>
                {showCloseButton ? <CloseSelectionButton /> : null}
                <Paragraph color="white">
                    {selectedIDs.length} selecionado(s).
                </Paragraph>
                {showActions ? <Actions /> : null}
            </Span>
        </ZoomAnimatedView>
    );
};

const getStyles = (showActions: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            borderRadius: 4,
            backgroundColor: Theme.colors.primary,
            padding: showActions ? 8 : 16,
        },
    });
