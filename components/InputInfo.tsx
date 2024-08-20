import { Text } from "react-native-paper";
import { commonStyles } from "styles/Common";
import { Label } from "./Label";

type InputInfoProps = {
    errorText?: string;
    label?: string;
};

export const InputInfo = ({ errorText, label }: InputInfoProps) => (
    <>
        {label ? <Label>{label}</Label> : null}
        {errorText ? <Text style={commonStyles.error}>{errorText}</Text> : null}
    </>
);
