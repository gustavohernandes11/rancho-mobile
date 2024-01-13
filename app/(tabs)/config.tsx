import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Text } from "react-native";
import { sharedStyles } from "styles/shared";

export default function TabConfigScreen() {
	return (
		<ContainerView>
			<Heading>Configuração</Heading>
			<Text style={sharedStyles.text}>Em construção</Text>
		</ContainerView>
	);
}
