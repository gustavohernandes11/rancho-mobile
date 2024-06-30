import { Card } from "components/Card";
import { ContainerView } from "components/ContainerView";
import { Heading } from "components/Heading";
import { InfoCard } from "components/InfoCard";
import { ProductionChart } from "components/ProductionChart";
import { Span } from "components/Span";
import { useFocus } from "hooks/useFocus";
import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { Storage } from "services/StorageService";
import { Count } from "types";

export default function TabOneScreen() {
    const [count, setCount] = useState<Count>();
    const { refreshAll } = useGlobalState();

    useFocus(() => {
        Storage.count().then(count => setCount(count));
    });

    useEffect(() => {
        refreshAll();
    }, []);

    return (
        <ContainerView>
            <Heading>Início</Heading>
            <Span>
                <Heading size="small">Produção do mês atual</Heading>
            </Span>
            <ProductionChart />
            <Span py={4}>
                {count ? (
                    <InfoCard
                        title={count.animals.toString() || "?"}
                        description="Animais registrados"
                    />
                ) : null}
                {count ? (
                    <InfoCard
                        title={count.batches.toString() || "?"}
                        description="Lotes registrados"
                    />
                ) : null}
                {count ? (
                    <InfoCard
                        title={count.litersProduced.toString() || "?"}
                        description="Litros produzidos"
                    />
                ) : null}
            </Span>
            <Heading size="small">O que você quer fazer?</Heading>
            <Span flexWrap="wrap" py={4}>
                <Card
                    href="/animals/add"
                    alt="Registrar animal"
                    iconSource={require("assets/images/AddCowIcon.png")}
                    title="Registrar animal"
                />
                <Card
                    href="/(tabs)/animals"
                    alt="Rebanho"
                    iconSource={require("assets/images/CowIcon.png")}
                    title="Rebanho"
                />
                <Card
                    href="/batches/add"
                    alt="Registrar lote"
                    iconSource={require("assets/images/FolderPlusIcon.png")}
                    title="Registrar lote"
                    color="blue"
                />
                <Card
                    href="/(tabs)/batches"
                    alt="Lotes"
                    iconSource={require("assets/images/CowFolderIcon.png")}
                    title="Lotes"
                    color="blue"
                />
                <Card
                    href="/(tabs)/production"
                    alt="Production"
                    iconSource={require("assets/images/ChartIcon.png")}
                    title="Produção do mês"
                    color="purple"
                />
                <Card
                    href="/(tabs)/annotations"
                    alt="Annotations"
                    iconSource={require("assets/images/BookMarkIcon.png")}
                    title="Anotações"
                    color="cian"
                />
            </Span>
        </ContainerView>
    );
}
