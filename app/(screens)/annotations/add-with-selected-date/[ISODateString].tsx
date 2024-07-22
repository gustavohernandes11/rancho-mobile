import { AnnotationForm } from "components/AnnotationForm";
import { ContainerView } from "components/ContainerView";
import { Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";

export default function RegisterAnimalToBatchScreen() {
    const { ISODateString } = useLocalSearchParams<{ ISODateString: string }>();

    const StackScreen = () => (
        <Stack.Screen options={{ headerTitle: "Adicionar anotação" }} />
    );
    return (
        <ContainerView immediateContent={<StackScreen />}>
            <AnnotationForm
                initialValues={{ date: moment(ISODateString).toDate() }}
            />
        </ContainerView>
    );
}
