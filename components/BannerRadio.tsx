import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewProps,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Colors from "styles/Colors";
import { commonStyles } from "styles/Common";
import Fonts from "styles/Fonts";

interface BannerRadioProps {
    iconSource: ImageSourcePropType;
    iconAlt: string;
    title: string | React.ReactNode;
    description?: string;
    value: string;
    isChecked: boolean;
}

export const BannerRadio: React.FC<BannerRadioProps & ViewProps> = ({
    iconAlt,
    iconSource,
    title,
    description,
    value,
    isChecked,
    ...props
}) => {
    return (
        <Pressable style={styles.container} {...props}>
            <View style={styles.iconSpan}>
                <Image
                    style={commonStyles.icon}
                    source={iconSource}
                    alt={iconAlt}
                />
            </View>
            <View style={styles.left}>
                <Text style={styles.title}>{title}</Text>
                {description ? (
                    <Text style={styles.description}>{description}</Text>
                ) : null}
            </View>
            <RadioButton
                color={Colors.green}
                value={value}
                status={isChecked ? "checked" : "unchecked"}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: Colors.lightGray,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 16,
    },
    right: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    left: {
        flex: 1,
        alignItems: "flex-start",
        gap: 4,
    },
    title: {
        fontFamily: Fonts.primaryFamily,
        color: Colors.text,
        fontSize: 16,
    },
    description: {
        ...commonStyles.text,
        fontSize: 12,
        textAlign: "right",
    },
    iconSpan: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
    },
});
