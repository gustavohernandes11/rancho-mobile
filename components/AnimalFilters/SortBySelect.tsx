import { Select } from "components/Select";
import { OrderByOptions } from "types/StorageServicesMethods";

type SortBySelectProps = {
    orderBy: OrderByOptions;
    onSelectOrdering: (option: any) => void;
};

export const SortBySelect = ({
    orderBy,
    onSelectOrdering,
}: SortBySelectProps) => {
    const getDefaultOrderText = () =>
        orderBy === "alfabetic" ? "Alfabética" : "Idade";

    return (
        <Select
            label="Ordenar"
            items={[
                {
                    key: "Alfabética",
                    value: "alfabetic",
                },
                {
                    key: "Idade",
                    value: "age",
                },
            ]}
            defaultValue="alfabetic"
            defaultButtonText={getDefaultOrderText()}
            onSelect={onSelectOrdering}
            size="small"
            search={false}
        />
    );
};
