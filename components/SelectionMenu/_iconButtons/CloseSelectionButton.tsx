import { useAnimalSelectionStore } from "hooks/useAnimalSelectionStore";
import { IconButton } from "react-native-paper";
import Colors from "styles/Colors";

export const CloseSelectionButton = () => {
    const clearSelection = useAnimalSelectionStore(
        state => state.clearSelection
    );

    return (
        <IconButton
            iconColor={Colors.white}
            icon="close-thick"
            onPress={clearSelection}
            style={{
                margin: 0,
            }}
            size={24}
        />
    );
};
