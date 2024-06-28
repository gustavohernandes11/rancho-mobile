import { AnnotationBanner } from "components/AnnotationBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SearchBar } from "components/SearchBar";
import { Span } from "components/Span";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Storage } from "services/StorageService";
import { Annotation } from "types/Annotation";

export default function ViewAnnotationsPage() {
	const [annotations, setAnnotations] = useState<Annotation[]>();
	const router = useRouter();

	useFocusEffect(() => {
		fetchAnnotations();
	});

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
					headerRight: () => (
						<Button
							title="Nova anotação"
							onPress={() =>
								router.push("/(screens)/annotations/add")
							}
						/>
					),
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
			<Span direction="column" py={16}>
				{annotations &&
					annotations.map((annotation) => (
						<AnnotationBanner
							key={annotation.id}
							href={`/(screens)/annotations/${annotation.id}`}
							title={annotation.title}
							type={annotation.type}
							description={annotation.description}
							date={annotation.date}
							animalIds={annotation.animalIDs}
						/>
					))}
			</Span>
		</ContainerView>
	);
}
