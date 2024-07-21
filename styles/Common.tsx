import { StyleSheet } from "react-native";
import Colors from "styles/Colors";
import Fonts from "styles/Fonts";

export const commonStyles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: Colors.darkGray,
        fontFamily: Fonts.primaryFamily,
    },
    label: {
        fontSize: 14,
        color: Colors.darkGray,
        fontFamily: Fonts.primaryFamily,
        paddingLeft: 0,
    },
    inputAspect: {
        borderRadius: 8,
        backgroundColor: Colors.white,
        borderColor: Colors.border,
        borderWidth: 1,
        fontFamily: Fonts.primaryFamily,
    },
    error: {
        fontSize: 12,
        color: Colors.red,
        fontFamily: Fonts.primaryFamily,
    },
    heading: {
        fontSize: 20,
        color: Colors.text,
        marginVertical: 4,
        fontFamily: Fonts.primaryFamily,
    },
    disabled: {
        backgroundColor: Colors.lightGray,
        borderColor: Colors.border,
        borderStyle: "dashed",
        borderRadius: 8,
        borderWidth: 1,
    },
    textDisabled: {
        color: Colors.darkGray,
    },
    icon: {
        height: 38,
        width: 38,
        resizeMode: "contain",
    },
    card: {
        width: "48.8%",
        maxWidth: 250,
        backgroundColor: Colors.green,
        borderRadius: 8,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        minHeight: 100,
        gap: 8,
        elevation: 3,
    },
    border: {
        borderWidth: 1,
        borderColor: Colors.border,
    },
});
