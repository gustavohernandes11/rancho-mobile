import { AnnotationBanner } from "components/AnnotationBanner";
import { Button } from "components/Button";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { SearchBar } from "components/SearchBar";
import { Span } from "components/Span";
import { Stack, useRouter } from "expo-router";
import useDebounce from "hooks/useDebounce";
import { useFocus } from "hooks/useFocus";
import React, { useState } from "react";
import { Text } from "react-native";
import { Storage } from "services/StorageService";
import { Annotation } from "types";

export default function ViewAnnotationsPage() {
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const router = useRouter();

    const loadAnnotations = () => {
        Storage.listAnnotations({ searchText }).then(annotations =>
            setAnnotations(annotations)
        );
    };

    useFocus(loadAnnotations);

    useDebounce(
        () => {
            loadAnnotations();
        },
        [searchText],
        300
    );

    const handleChangeSearchText = (text: string) => setSearchText(text);

    return (
        <ContainerView>
            <Stack.Screen
                options={{
                    headerTitle: "Anotações",
                    headerRight: () => (
                        <Button
                            title="Nova anotação"
                            icon="bookmark-plus-outline"
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
                onChangeText={handleChangeSearchText}
                value={searchText}
                placeholder="Busque suas anotações"
            />
            <Span direction="column" py={16}>
                {annotations.length === 0 ? (
                    <Span justify="center">
                        <Text>Nenhuma nota encontrada.</Text>
                    </Span>
                ) : null}
                {annotations
                    ? annotations.map(annotation => (
                          <AnnotationBanner
                              key={annotation.id}
                              href={`/(screens)/annotations/${annotation.id}`}
                              title={annotation.title}
                              type={annotation.type}
                              description={annotation.description}
                              date={annotation.date}
                              animalIds={annotation.animalIDs}
                          />
                      ))
                    : null}
                <Span justify="center" py={8}>
                    <Button
                        title="Nova anotação"
                        onPress={() =>
                            router.push("/(screens)/annotations/add")
                        }
                    />
                </Span>
            </Span>
        </ContainerView>
    );
}
