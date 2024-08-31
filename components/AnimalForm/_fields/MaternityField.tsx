import { Select } from "components/Select";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { memo } from "react";
import { AnimalFormField } from "types/AnimalFormField";
import { filterPossibleMaternity } from "utils/filters";
import { getFieldError } from "utils/getFieldError";
import { serializeAnimals } from "utils/serializers";

export const MaternityField: React.FC<AnimalFormField> = ({ formik }) => {
    const animals = useGlobalStore(state => state.animals);

    return (
        <Select
            defaultButtonText={
                animals?.find(a => a.id === formik.values.maternityID)?.name ||
                "Selecione um animal"
            }
            items={[
                ...serializeAnimals(
                    filterPossibleMaternity(animals!, formik.values)
                ),
                { key: "Selecione um animal", value: "" },
            ]}
            errorText={getFieldError("maternityID", formik)}
            onSelect={option =>
                formik.setFieldValue("maternityID", Number(option.value))
            }
            label="Maternidade"
            searchPlaceHolder="Busque por nome"
            search={true}
        />
    );
};

export const MemoMaternityField = memo(
    MaternityField,
    (prev, next) =>
        prev.formik.values.maternityID === next.formik.values.maternityID &&
        prev.formik.errors.maternityID === next.formik.errors.maternityID &&
        prev.formik.touched.maternityID === next.formik.touched.maternityID
);
