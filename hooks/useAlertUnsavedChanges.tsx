import { useNavigation } from "expo-router";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { Alert } from "react-native";

export const useAlertUnsavedChanges = ({
    formik,
}: {
    formik: FormikProps<any>;
}) => {
    const navigation = useNavigation();
    useEffect(() => {
        const cleanup = navigation.addListener("beforeRemove", (e: any) => {
            if (!formik.dirty || formik.isSubmitting) {
                return;
            }

            e.preventDefault();
            Alert.alert(
                "Sair da página?",
                "É possível perder informações não salvas.",
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                        onPress: () => {},
                    },
                    {
                        text: "Descartar",
                        style: "destructive",
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        });

        return cleanup;
    }, [navigation, formik.dirty, formik.isSubmitting]);
};
