import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { commonStyles } from "styles/Common";
import { Label } from "./Label";

type ListAccordionProps = {
	children: React.ReactNode;
	title: string;
	label?: string;
};

export const ListAccordion = ({
	children,
	title,
	label,
}: ListAccordionProps) => {
	return (
		<View style={styles.inputContainer}>
			{label && <Label>{label}</Label>}
			<List.Accordion
				style={styles.accordion}
				titleStyle={commonStyles.text}
				title={title}
			>
				{children}
			</List.Accordion>
		</View>
	);
};
const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		width: "100%",
	},
	accordion: {
		...commonStyles.inputAspect,
		padding: 0,
	},
});
