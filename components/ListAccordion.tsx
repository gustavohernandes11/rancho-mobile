import { StyleSheet, View } from "react-native";
import { HelperText, List } from "react-native-paper";
import { sharedStyles } from "styles/Common";

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
			{label && (
				<HelperText style={sharedStyles.label} type="info">
					{label}
				</HelperText>
			)}
			<List.Accordion
				style={[sharedStyles.inputAspect, { padding: 0 }]}
				titleStyle={sharedStyles.text}
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
});
