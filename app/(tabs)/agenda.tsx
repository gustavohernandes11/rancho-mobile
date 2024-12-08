import { AnnotationBanner } from "components/AnnotationBanner";
import { Button } from "components/Button";
import { Calendar } from "components/Calendar";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useControlledCalendar } from "hooks/useControlledCalendar";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { IconButton } from "react-native-paper";
import { Storage } from "services/StorageService";
import { Annotation } from "types/Annotation";

const NewDayAnnotationButton = ({ dateId }: { dateId: string }) => {
    const router = useRouter();

    return (
        <Button
            title="Nova anotação"
            icon="bookmark-plus"
            onPress={() =>
                router.push(
                    `/(screens)/annotations/add-with-selected-date/${dateId}`
                )
            }
        />
    );
};

const ViewAllAnnotationsButton = () => {
    const router = useRouter();

    return (
        <Button
            title="Ver todas"
            type="secondary"
            icon="eye"
            onPress={() => router.push(`/(screens)/annotations`)}
        />
    );
};

export default function ViewAgendaScreen() {
    const {
        selectedDateId,
        setSelectedDateId,
        onPressNextMonth,
        onPressPrevMonth,
    } = useControlledCalendar();

    const [dayAnnotations, setDayAnnotations] = useState<Annotation[]>([]);

    const fetchSelectedDateAnnotations = () => {
        Storage.listAnnotations({
            day: selectedDateId,
            shouldIncludeMonthlyAnnotations: true,
        }).then(annotations => setDayAnnotations(annotations));
    };

    const monthString = moment(selectedDateId).format("MMMM/YYYY");

    useFocusEffect(
        useCallback(() => {
            fetchSelectedDateAnnotations();
        }, [monthString])
    );

    return (
        <ContainerView>
            <Stack.Screen
                options={{
                    headerTitle: "Agenda",
                    headerRight: () => (
                        <NewDayAnnotationButton dateId={selectedDateId} />
                    ),
                }}
            />
            <Span justify="space-between" align="center" marginY={0}>
                <IconButton icon={"arrow-left"} onPress={onPressPrevMonth} />
                <Heading>{monthString}</Heading>
                <IconButton icon={"arrow-right"} onPress={onPressNextMonth} />
            </Span>
            <Span>
                <Calendar
                    onSelectDate={setSelectedDateId}
                    selectedDate={selectedDateId}
                />
            </Span>
            <Span>
                <Heading size="medium">Anotações nesse mês</Heading>
                {dayAnnotations && dayAnnotations.length > 0 ? (
                    dayAnnotations.map(annotation => (
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
                ) : (
                    <Span>
                        <Paragraph secondary>
                            Não há anotações nesse mês.
                        </Paragraph>
                    </Span>
                )}
                <Span justify="flex-end" paddingY={8}>
                    <ViewAllAnnotationsButton />
                    <NewDayAnnotationButton dateId={selectedDateId} />
                </Span>
            </Span>
        </ContainerView>
    );
}
