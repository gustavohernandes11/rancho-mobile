import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { IconButton } from "react-native-paper";
import Theme from "styles/Theme";

export const CloseSelectionButton = () => {
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

    return (
        <IconButton
            iconColor={Theme.colors.white}
            icon="close-thick"
            onPress={clearSelection}
            style={{
                margin: 0,
            }}
            size={24}
        />
    );
};
