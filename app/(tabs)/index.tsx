import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { Span } from "components/Span";
import { useFocus } from "hooks/useFocus";
import { useGlobalStore } from "hooks/useGlobalStore";
import { useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Count } from "types";

export default function TabOneScreen() {
    const [count, setCount] = useState<Count>();
    const refreshAll = useGlobalStore(state => state.refreshAll);

    useFocus(() => {
        Storage.count().then(count => setCount(count));
    });

    useEffect(() => {
        refreshAll();
    }, []);

    return (
        <ContainerView>
            <Heading>Início</Heading>
            {count ? (
                <>
                    <Heading size="small">Informações gerais</Heading>
                    <Span paddingY={4} gap={4}>
                        <InfoCard
                            title={count.animals.toString() || "?"}
                            label="Animais ativos"
                        />
                        <InfoCard
                            title={count.batches.toString() || "?"}
                            label="Lotes registrados"
                        />
                    </Span>
                </>
            ) : null}
            <Heading size="small">O que você quer fazer?</Heading>
            <Span flexWrap="wrap" paddingY={4} gap={4}>
                <Span direction="row" flexWrap="nowrap" gap={4} marginY={0}>
                    <Card
                        href="/(tabs)/animals"
                        alt="Rebanho"
                        iconSource={require("assets/images/CowIcon.png")}
                        title="Ver rebanho"
                    />
                </Span>
                <Span direction="row" flexWrap="nowrap" gap={4} marginY={0}>
                    <Card
                        href="/animals/add"
                        alt="Registrar animal"
                        iconSource={require("assets/images/AddCowIcon.png")}
                        title="Registrar animal"
                    />
                    <Card
                        href="/animals/register-multiple-animals"
                        alt="Registrar vários animais"
                        iconSource={require("assets/images/AddCowIcon.png")}
                        title="Registrar vários"
                    />
                </Span>
                <Span direction="row" flexWrap="nowrap" gap={4} marginY={0}>
                    <Card
                        href="/(tabs)/batches"
                        alt="Lotes"
                        iconSource={require("assets/images/CowFolderIcon.png")}
                        title="Lotes"
                        color="blue"
                    />
                    <Card
                        href="/batches/add"
                        alt="Registrar lote"
                        iconSource={require("assets/images/FolderPlusIcon.png")}
                        title="Registrar lote"
                        color="blue"
                    />
                </Span>
                <Span direction="row" flexWrap="nowrap" gap={4} marginY={0}>
                    <Card
                        href="/(tabs)/agenda"
                        alt="Agenda de anotações"
                        iconSource={require("assets/images/BookIcon.png")}
                        title="Agenda"
                        color="cian"
                    />
                    <Card
                        href="/annotations"
                        alt="Annotations"
                        iconSource={require("assets/images/BookMarkIcon.png")}
                        title="Ver anotações"
                        color="purple"
                    />
                </Span>
                <Span direction="row" flexWrap="nowrap" gap={4} marginY={0}>
                    {/* TO IMPLEMENT */}
                    {/* <Card
                        href="/error"
                        alt="Export data"
                        iconSource={require("assets/images/BookMarkIcon.png")}
                        title="Exportar dados"
                        color="cian"
                    /> */}
                </Span>
            </Span>
        </ContainerView>
    );
}
