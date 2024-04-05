import Colors from "constants/Colors";
import { Link } from "expo-router";
import { IconButton } from "react-native-paper";

type AddButtonProps = {
	href: any;
};
export const AddButton = ({ href }: AddButtonProps) => {
	return (
		<Link href={href} asChild>
			<IconButton
				size={24}
				iconColor={Colors.white}
				icon={require("../assets/images/AddAnimalIcon.png")}
				style={{ marginRight: 11, marginLeft: 0 }}
			/>
		</Link>
	);
};
