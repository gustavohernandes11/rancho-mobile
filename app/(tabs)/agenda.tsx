import { AnnotationBanner } from "components/AnnotationBanner";
import { Button } from "components/Button";
import { Calendar } from "components/Calendar";
import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { DayProductionForm } from "components/DayProductionForm";
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

export default function ViewAgendaScreen() {
    const {
        selectedDateId,
        setSelectedDateId,
        onPressNextMonth,
        onPressPrevMonth,
    } = useControlledCalendar();

    const [dayAnnotations, setDayAnnotations] = useState<Annotation[]>([]);

    const fetchSelectedDateAnnotations = () => {
        Storage.listAnnotations({ day: selectedDateId }).then(annotations =>
            setDayAnnotations(annotations)
        );
    };

    useFocusEffect(
        useCallback(() => {
            fetchSelectedDateAnnotations();
        }, [selectedDateId])
    );

    const monthString = moment(selectedDateId).format("MMMM/YYYY");
    const monthQualityDetailsLabel = `Inserir qualidade do leite em ${monthString}`;
    const dayInfoLabel = `Informações do dia ${moment(selectedDateId).format(
        "DD/MM/YYYY"
    )}`;

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
                <Heading size="medium">{dayInfoLabel}</Heading>
                <DayProductionForm selectedDate={selectedDateId} />
            </Span>
            <Span>
                <Heading size="medium">Anotações do dia</Heading>
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
                            Não há anotações nesse dia.
                        </Paragraph>
                    </Span>
                )}
                <Span justify="flex-end" marginY={0}>
                    <NewDayAnnotationButton dateId={selectedDateId} />
                </Span>
            </Span>
            <Span>
                <Heading size="medium">Mais ações</Heading>
                <Span marginY={0}>
                    <Card
                        href={"/production/add-month-details/" + selectedDateId}
                        alt="Production"
                        iconSource={require("assets/images/ChartIcon_green.png")}
                        title={monthQualityDetailsLabel}
                    />
                </Span>
                <Span>
                    <Card
                        iconSource={require("assets/images/BookMarkIcon_green.png")}
                        alt="Ir para anotações"
                        href="/annotations"
                        title="Ver todas as anotações"
                        color="cian"
                    />
                    <Card
                        href="/production"
                        alt="Production"
                        iconSource={require("assets/images/ChartIcon_green.png")}
                        title="Relatório de produção"
                        color="purple"
                    />
                </Span>
            </Span>
        </ContainerView>
    );
}
