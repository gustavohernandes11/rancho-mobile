import { Select } from "components/Select";
import { useGlobalStore } from "hooks/useGlobalStore";
import React, { memo } from "react";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";
import { serializeBatches } from "utils/serializers";

export const BatchSelectField: React.FC<AnimalFormField> = ({ formik }) => {
    const batches = useGlobalStore(state => state.batches);

    return (
        <Select
            items={[
                ...serializeBatches(batches || []),
                { key: "Nenhum", value: "" },
            ]}
            defaultButtonText={
                batches?.find(b => b.id === formik.values.batchID)?.name ||
                "Nenhum"
            }
            errorText={getFieldError("batchID", formik)}
            onSelect={option => formik.setFieldValue("batchID", option.value)}
            label="Lote"
            search={false}
        />
    );
};

export const MemoBatchSelectField = memo(
    BatchSelectField,
    (prev, next) =>
        prev.formik.values.batchID === next.formik.values.batchID &&
        prev.formik.errors.batchID === next.formik.errors.batchID &&
        prev.formik.touched.batchID === next.formik.touched.batchID
);
