import Colors from "constants/Colors";
import { Link, useNavigation } from "expo-router";
import { IconButton } from "react-native-paper";

type AddButtonProps = {
	href: any;
};
export const AddButton = ({ href }: AddButtonProps) => {
	const navigation = useNavigation();
	return (
		<Link href={href} asChild>
			<IconButton
				size={24}
				iconColor={Colors.white}
				icon="plus"
				style={{ marginRight: 11, marginLeft: 0 }}
				onPress={navigation.goBack}
			/>
		</Link>
	);
};
