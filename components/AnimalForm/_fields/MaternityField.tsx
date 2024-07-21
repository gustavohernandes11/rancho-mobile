import { Select } from "components/Select";
import { FormikProps } from "formik";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { memo } from "react";
import { Animal } from "types/Animal";
import { filterPossibleMaternity } from "utils/filters";
import { getFieldError } from "utils/forms";
import { serializeAnimals } from "utils/serializers";

type MaternityFieldProps = {
    formik: FormikProps<Animal>;
};

export const MaternityField: React.FC<MaternityFieldProps> = ({ formik }) => {
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
