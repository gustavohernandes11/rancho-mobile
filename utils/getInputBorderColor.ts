import Theme from "styles/Theme";

export const getInputBorderColor = (hasError: boolean) =>
    hasError ? Theme.colors.red : Theme.colors.mediumGray;
