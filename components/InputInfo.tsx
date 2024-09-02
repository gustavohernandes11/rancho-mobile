import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Theme from "styles/Theme";
import { Label } from "./Label";

type InputInfoProps = {
    errorText?: string;
    label?: string;
};

export const InputInfo = ({ errorText, label }: InputInfoProps) => (
    <>
        {label ? <Label>{label}</Label> : null}
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </>
);

const styles = StyleSheet.create({
    error: {
        fontSize: 14,
        marginBottom: 4,
        color: Theme.colors.red,
        fontFamily: Theme.fonts.primaryFamily,
    },
});
