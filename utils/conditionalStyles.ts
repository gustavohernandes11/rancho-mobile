import Theme from "styles/Theme";
import { ButtonTypes } from "types";

export const getButtonBackgroundColor = (type: ButtonTypes) => {
    if (type === "primary") {
        return Theme.colors.primary;
    } else if (type === "danger") return Theme.colors.red;
    else {
        return "transparent";
    }
};

export const getButtonBorderColor = (type: ButtonTypes) => {
    if (type === "primary" || type === "light") return "transparent";
    else if (type === "light-danger" || type === "danger")
        return Theme.colors.red;
    else return Theme.colors.primary;
};

export const getButtonTextColor = (type: ButtonTypes) => {
    if (type === "light-danger") return Theme.colors.red;
    else if (type === "primary" || type === "danger") return Theme.colors.white;
    else return Theme.colors.primary;
};

export const getInputBorderColor = (hasError: boolean) =>
    hasError ? Theme.colors.red : Theme.colors.mediumGray;
