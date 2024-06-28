import { StyleSheet, View } from "react-native";
import { HelperText, List } from "react-native-paper";
import { commonStyles } from "styles/Common";

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
				<HelperText style={commonStyles.label} type="info">
					{label}
				</HelperText>
			)}
			<List.Accordion
				style={[commonStyles.inputAspect, { padding: 0 }]}
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
});
