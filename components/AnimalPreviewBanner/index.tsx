import { Paragraph } from "components/Paragraph";
import { useRouter } from "expo-router";
import { useAnimalsInReview } from "hooks/useAnimalsInReview";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    TextInput,
    View,
    ViewProps,
} from "react-native";
import { IconButton } from "react-native-paper";
import Theme from "styles/Theme";
import { Animal } from "types";
import { getGenderIcon } from "utils/getGenderIcon";
import { ValidationError } from "yup";
import { validationSchema } from "./validationSchema";

interface AnimalPreviewBannerProps {
    animal: Animal;
}

export const AnimalPreviewBanner: React.FC<
    AnimalPreviewBannerProps & ViewProps
> = ({ animal, ...props }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(animal.name);
    const { removeAnimal, setAnimalName } = useAnimalsInReview();
    const router = useRouter();

    useEffect(() => {
        setName(animal.name);
    }, [animal.name]);

    const handleNameChange = async (text: string) => {
        setName(text);
    };

    const handleEdit = () => {
        router.push("/animals/edit-in-review/" + animal.id);
    };

    const handleRemove = () => {
        removeAnimal(animal.id);
    };

    const handleChangeAnimalName = async () => {
        setIsEditing(false);

        await validationSchema
            .validate({ name })
            .then(() => {
                setAnimalName(animal.id, name);
            })
            .catch((e: ValidationError) => {
                Alert.alert("Nome inválido", e.message);
                setName(animal.name);
            });
    };

    const title = (
        <View style={styles.row}>
            {getGenderIcon(animal.gender)}
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={handleNameChange}
                    onSubmitEditing={handleChangeAnimalName}
                    onBlur={handleChangeAnimalName}
                    autoFocus
                />
            ) : (
                <Pressable
                    style={styles.nameContainer}
                    onPress={() => setIsEditing(true)}
                >
                    <Paragraph>{name}</Paragraph>
                </Pressable>
            )}
        </View>
    );

    return (
        <View style={styles.container} {...props}>
            <View style={styles.row}>{title}</View>
            <View style={styles.buttonsContainer}>
                <IconButton
                    icon="pencil"
                    iconColor={Theme.colors.mediumGray}
                    onPress={handleEdit}
                />
                <IconButton
                    icon="delete"
                    iconColor={Theme.colors.mediumGray}
                    onPress={handleRemove}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: Theme.colors.lightest,
        borderRadius: 4,
        borderColor: Theme.colors.lightGray,
        borderWidth: 1,
        padding: 8,
        paddingRight: 0,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        borderBottomColor: Theme.colors.mediumGray,
        borderBottomWidth: 1,
        padding: 0,
        margin: 0,
        fontSize: 16,
    },
    nameContainer: {
        minHeight: 30,
        minWidth: 120,
        justifyContent: "center",
    },
});
