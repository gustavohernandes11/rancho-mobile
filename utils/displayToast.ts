import { ToastAndroid } from "react-native";

export function showToast(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
}
