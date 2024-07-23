import { AnimalTable } from "components/AnimalTable";
import { ListAccordion } from "components/ListAccordion";
import { Loading } from "components/Loading";
import React from "react";
import { Animal } from "types/Animal";

type AnimalSelectionFieldProps = {
    animals: Animal[] | null;
    selectedIDs: number[];
};

export const AnimalSelectionField: React.FC<AnimalSelectionFieldProps> = ({
    animals,
    selectedIDs,
}) => {
    return (
        <ListAccordion
            title={`${selectedIDs.length} selecionado(s)`}
            label="Selecione os animais (você pode editar isso depois)"
        >
            {animals ? <AnimalTable animals={animals} /> : <Loading />}
        </ListAccordion>
    );
};
