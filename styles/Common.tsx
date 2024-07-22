import { StyleSheet } from "react-native";
import Theme from "./Theme";

export const commonStyles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: Theme.colors.darkest,
        fontFamily: Theme.fonts.primaryFamily,
    },
    secondaryText: {
        fontSize: 14,
        color: Theme.colors.mediumGray,
        fontFamily: Theme.fonts.primaryFamily,
    },
    label: {
        fontSize: 14,
        color: Theme.colors.darkGray,
        fontFamily: Theme.fonts.primaryFamily,
        paddingLeft: 0,
    },
    inputAspect: {
        borderRadius: 8,
        backgroundColor: Theme.colors.white,
        borderColor: Theme.colors.mediumGray,
        borderWidth: 1,
        fontFamily: Theme.fonts.primaryFamily,
    },
    error: {
        fontSize: 14,
        marginBottom: 4,
        color: Theme.colors.red,
        fontFamily: Theme.fonts.primaryFamily,
    },
    heading: {
        fontSize: 20,
        color: Theme.colors.darkest,
        marginVertical: 4,
        fontFamily: Theme.fonts.primaryFamily,
    },
    disabled: {
        backgroundColor: Theme.colors.lightGray,
        borderColor: Theme.colors.mediumGray,
        borderStyle: "dashed",
        borderRadius: 8,
        borderWidth: 1,
    },
    textDisabled: {
        color: Theme.colors.mediumGray,
    },
    icon: {
        height: 32,
        width: 32,
        resizeMode: "contain",
    },
    smallIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain",
    },
    card: {
        width: "48.8%",
        maxWidth: 250,
        backgroundColor: Theme.colors.primary,
        borderRadius: 8,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
    },
    border: {
        borderWidth: 1,
        borderColor: Theme.colors.lightGray,
    },
});
