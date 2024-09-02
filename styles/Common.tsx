import { StyleSheet } from "react-native";
import Theme from "./Theme";

export const commonStyles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: Theme.colors.darkest,
        fontFamily: Theme.fonts.primaryFamily,
    },
    label: {
        fontSize: 14,
        color: Theme.colors.darkGray,
        fontFamily: Theme.fonts.primaryFamily,
        paddingLeft: 0,
    },
    inputAspect: {
        borderRadius: 4,
        backgroundColor: Theme.colors.white,
        borderColor: Theme.colors.mediumGray,
        fontFamily: Theme.fonts.primaryFamily,
        borderWidth: 1,
    },
    icon: {
        height: 32,
        width: 32,
        resizeMode: "contain",
    },
    border: {
        borderWidth: 1,
        borderColor: Theme.colors.lightGray,
        borderRadius: 4,
    },
});
