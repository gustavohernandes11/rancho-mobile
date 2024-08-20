import { useModal } from "hooks/useModal";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { imageServices } from "services/ImageService";
import Theme from "styles/Theme";
import { Animal } from "types/Animal";
import { ConfirmDeleteImageDialog } from "./ConfirmDeleteImageDialog";

type ImageActionsProps = {
    animalImage: string | null;
    animal?: Animal;
    loadImage: () => void;
};

export const ImageActions = ({
    animalImage,
    animal,
    loadImage,
}: ImageActionsProps) => {
    const { closeModal, isVisible, openModal } = useModal();
    const handleUploadImageFromGallery = async () => {
        if (animal) {
            await imageServices
                .pickAndSaveMediaLibraryImage(animal)
                .then(loadImage);
        }
    };

    const handleUploadCameraImage = async () => {
        if (animal) {
            imageServices.pickAndSaveCameraImage(animal).then(loadImage);
        }
    };

    const handleDeleteImage = async () => {
        if (animalImage) {
            imageServices
                .deleteImage(animalImage)
                .then(loadImage)
                .finally(closeModal);
        }
    };
    return (
        <View style={styles.container}>
            <IconButton
                size={16}
                iconColor={Theme.colors.mediumGray}
                icon="upload"
                onPress={handleUploadImageFromGallery}
            />
            <IconButton
                size={16}
                iconColor={Theme.colors.mediumGray}
                icon="camera"
                onPress={handleUploadCameraImage}
            />
            {animalImage ? (
                <IconButton
                    size={16}
                    iconColor={Theme.colors.mediumGray}
                    icon="image-remove"
                    onPress={openModal}
                />
            ) : null}
            <ConfirmDeleteImageDialog
                closeModal={closeModal}
                handleDeleteImage={handleDeleteImage}
                isVisible={isVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: Theme.colors.lightest,
        position: "absolute",
        borderTopLeftRadius: 8,
        bottom: 0,
        right: 0,
    },
});
