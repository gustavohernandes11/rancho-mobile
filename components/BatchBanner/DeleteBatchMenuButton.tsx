import { ConfirmDeleteBatchDialog } from "components/BatchPageHeaderButtons";
import { useModal } from "hooks/useModal";
import { Menu } from "react-native-paper";
import { commonStyles } from "styles/Common";
import { Batch } from "types";

export const DeleteBatchMenuButton = ({ batch }: { batch: Batch }) => {
    const { closeModal, isVisible, openModal } = useModal();

    const handleDelete = () => openModal();

    return (
        <>
            <ConfirmDeleteBatchDialog
                closeModal={closeModal}
                isVisible={isVisible}
                batch={batch}
            />
            <Menu.Item
                titleStyle={commonStyles.text}
                onPress={handleDelete}
                title="Remover lote"
                leadingIcon="delete"
            />
        </>
    );
};
