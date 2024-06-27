import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SearchBar } from "components/SearchBar";
import { Span } from "components/Span";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Annotation } from "types/Annotation";

export default function ViewAnnotationsPage() {
	const [annotations, setAnnotations] = useState<Annotation[]>();

	useEffect(() => {
		fetchAnnotations();
	}, []);

	const fetchAnnotations = () => {
		Storage.listAnnotations().then((annotations) =>
			setAnnotations(annotations)
		);
	};

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
