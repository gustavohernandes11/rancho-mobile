import { Icon } from "react-native-paper";
import Theme from "styles/Theme";

export const getGenderIcon = (gender: "F" | "M") =>
    gender === "M" ? (
        <Icon source="gender-male" color={Theme.colors.blue} size={16} />
    ) : (
        <Icon source="gender-female" color={Theme.colors.pink} size={16} />
    );
