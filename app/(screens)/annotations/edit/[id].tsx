import { AnnotationForm } from "components/AnnotationForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Annotation } from "types/Annotation";

export default function EditAnnotationScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [annotation, setAnnotation] = useState<Annotation | null>();

    useLayoutEffect(() => {
        const fetchData = async () => {
            const annotation = await Storage.getAnnotation(Number(id));
            setAnnotation(annotation);
        };
        fetchData();
    }, []);

    const StackScreen = () => (
        <Stack.Screen
            options={{
                headerTitle: `Editando nota "${annotation?.title || ""}"`,
            }}
        />
    );

    return (
        <ContainerView immediateContent={<StackScreen />}>
            {annotation && <AnnotationForm initialValues={annotation} />}
        </ContainerView>
    );
}
