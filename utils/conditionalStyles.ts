import Colors from "styles/Colors";
import { ButtonTypes } from "types";

export const getButtonBackgroundColor = (type: ButtonTypes) =>
    type === "primary" ? Colors.green : Colors.white;

export const getButtonBorderColor = (type: ButtonTypes) =>
    type === "primary" ? "transparent" : Colors.border;

export const getButtonTextColor = (type: ButtonTypes) => {
    if (type === "danger") return Colors.red;
    else if (type === "primary") return Colors.white;
    else return Colors.text;
};

export const getInputBorderColor = (hasError: boolean) =>
    hasError ? Colors.red : Colors.border;
