import { ImageSourcePropType } from "react-native";

declare module "*.svg" {
    const content: string | ImageSourcePropType;
    export default content;
}
