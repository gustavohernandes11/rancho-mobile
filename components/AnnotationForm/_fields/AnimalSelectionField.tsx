import { AnimalTable } from "components/AnimalTable";
import { ListAccordion } from "components/ListAccordion";
import { Loading } from "components/Loading";
import { useGlobalStore } from "hooks/useGlobalStore";
import React from "react";

type AnimalSelectionFieldProps = {
    selectedIDs: number[];
};

export const AnimalSelectionField: React.FC<AnimalSelectionFieldProps> = ({
    selectedIDs,
}) => {
    const animals = useGlobalStore(state => state.animals);

    return (
        <ListAccordion
            label="Quais animais estão associados?"
            title={`${selectedIDs.length} selecionado(s)`}
        >
            {animals ? <AnimalTable animals={animals} /> : <Loading />}
        </ListAccordion>
    );
};
