import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SearchBar } from "components/SearchBar";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import React from "react";

export default function ViewAnnotationsPage() {
	return (
		<ContainerView>
			<Stack.Screen
				options={{
					headerTitle: "Anotações",
					headerRight: () => <Button title="Nova anotação" />,
				}}
			/>
			<Span justify="space-between" my={8} align="center">
				<Heading>Faça suas anotações aqui</Heading>
			</Span>
			<SearchBar
				onChangeText={() => ""}
				value={""}
				placeholder="Busque suas anotações"
			/>
		</ContainerView>
	);
}
