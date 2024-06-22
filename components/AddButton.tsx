import { Link } from "expo-router";
import { IconButton, IconButtonProps } from "react-native-paper";
import Colors from "styles/Colors";

type AddButtonProps = {
	href: any;
	icon: "add-batch" | "add-animal";
};
export const AddButton = ({
	href,
	icon,
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
				icon={
					icon === "add-batch"
						? require("../assets/images/AddBatchIconWhite.png")
						: require("../assets/images/AddAnimalIcon.png")
				}
			/>
		</Link>
	);
};
