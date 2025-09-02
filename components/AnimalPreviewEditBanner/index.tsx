import { InputInfo } from "components/InputInfo";
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
import { ValidationError } from "yup";
import { GenderToggleButton } from "./GenderToggleButton";
import { validationSchema } from "./validationSchema";

interface AnimalPreviewEditBannerProps {
    animal: Animal;
}

export const AnimalPreviewEditBanner: React.FC<
    AnimalPreviewEditBannerProps & ViewProps
> = ({ animal, ...props }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(animal.name);
    const [gender, setGender] = useState(animal.gender);
    const { removeAnimal, setAnimalName, setAnimalGender } =
        useAnimalsInReview();
    const router = useRouter();

    const errorText =
        !animal.name || animal.name.trim().length < 3
            ? "O nome deve ter entre 3 e 45 caracteres."
            : !animal.gender
            ? "Selecione o sexo do animal."
            : "";

    useEffect(() => {
        setName(animal.name);
    }, [animal.name]);

    useEffect(() => {
        setGender(animal.gender);
    }, [animal.gender]);

    const handleNameChange = async (text: string) => {
        setName(text);
    };

    const handleEdit = () => {
        router.push("/animals/edit-in-review/" + animal.id);
    };

    const handleRemove = () => {
        removeAnimal(animal.id);
    };

    const handleChangeAnimalGender = async (gender: "F" | "M") => {
        setGender(gender);
        setAnimalGender(animal.id, gender);
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

    const styles = getStyles(!!errorText);

    const title = (
        <View style={styles.row}>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={handleNameChange}
                    onSubmitEditing={handleChangeAnimalName}
                    onBlur={handleChangeAnimalName}
                    maxLength={45}
                    autoFocus
                />
            ) : (
                <Pressable
                    style={styles.nameContainer}
                    onPress={() => setIsEditing(true)}
                >
                    <Paragraph>{!!name ? name : "Toque para nomear"}</Paragraph>
                </Pressable>
            )}
        </View>
    );

    return (
        <>
            <View style={styles.container} {...props}>
                <GenderToggleButton
                    value={gender}
                    onChange={handleChangeAnimalGender}
                />
                <View style={styles.row}>{title}</View>
                <View style={styles.buttonsContainer}>
                    <IconButton
                        icon="pencil"
                        size={20}
                        iconColor={Theme.colors.mediumGray}
                        onPress={handleEdit}
                    />
                    <IconButton
                        icon="delete"
                        size={20}
                        iconColor={Theme.colors.mediumGray}
                        onPress={handleRemove}
                    />
                </View>
            </View>
            <InputInfo errorText={errorText} />
        </>
    );
};

const getStyles = (hasError: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: Theme.colors.lightest,
            borderRadius: 4,
            borderColor: getBorderColor(hasError),
            borderWidth: 1,
            paddingHorizontal: 6,
            paddingBlock: 6,
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        buttonsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        input: {
            flex: 1,
            borderBottomColor: Theme.colors.mediumGray,
            borderBottomWidth: 1,
            padding: 0,
            margin: 0,
            marginLeft: 12,
            fontSize: 16,
        },
        nameContainer: {
            marginLeft: 16,
            minWidth: 120,
            justifyContent: "center",
        },
    });

export const getBorderColor = (hasError: boolean) => {
    if (hasError) {
        return Theme.colors.red;
    } else return Theme.colors.lightGray;
};
