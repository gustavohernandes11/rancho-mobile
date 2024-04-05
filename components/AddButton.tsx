import Colors from "constants/Colors";
import { Link } from "expo-router";
import { IconButton, IconButtonProps } from "react-native-paper";

type AddButtonProps = {
	href: any;
};
export const AddButton = ({
	href,
	...props
}: AddButtonProps & Omit<IconButtonProps, "icon">) => {
	return (
		<Link href={href} asChild>
			<IconButton
				size={24}
				iconColor={Colors.white}
				accessibilityLabel="Add animal icon"
				style={{ marginRight: 11, marginLeft: 0 }}
				{...props}
				icon={require("../assets/images/AddAnimalIcon.png")}
			/>
		</Link>
	);
};
