import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Dialog as PaperDialog, Portal } from "react-native-paper";
import { commonStyles } from "styles/Common";
import Theme from "styles/Theme";
import { Paragraph } from "./Paragraph";

interface DialogProps {
    title: string;
    visible: boolean;
    onDismiss: () => void;
    buttons?: JSX.Element;
    content?: JSX.Element;
    scrollableContent?: JSX.Element;
}

export const Dialog: React.FC<DialogProps> = ({
    title,
    content,
    scrollableContent,
    visible,
    onDismiss,
    buttons,
}) => {
    return (
        <Portal>
            <PaperDialog
                style={styles.dialog}
                visible={visible}
                onDismiss={onDismiss}
            >
                <PaperDialog.Title style={styles.title}>
                    {title}
                </PaperDialog.Title>
                {scrollableContent ? (
                    <PaperDialog.ScrollArea style={{ maxHeight: "60%" }}>
                        <ScrollView>{scrollableContent}</ScrollView>
                    </PaperDialog.ScrollArea>
                ) : null}
                <PaperDialog.Content>
                    <Paragraph>{content}</Paragraph>
                </PaperDialog.Content>
                <PaperDialog.Actions>
                    <View style={styles.actionContainer}>{buttons}</View>
                </PaperDialog.Actions>
            </PaperDialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        ...commonStyles.border,
        borderRadius: 8,
        backgroundColor: Theme.colors.lightest,
    },
    title: {
        fontFamily: Theme.fonts.primaryFamily,
    },
    actionContainer: {
        width: "100%",
        flexDirection: "row",
        gap: 8,
        justifyContent: "flex-end",
    },
});
