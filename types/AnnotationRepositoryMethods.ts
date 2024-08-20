import { AddAnnotation, Annotation, UpdateAnnotation } from "./Annotation";
import { AnnotationQueryOptions } from "./StorageServicesMethods";

export interface AnnotationRepositoryMethods {
    insertAnnotation(annotation: AddAnnotation): Promise<number | undefined>;
    getAnnotation(id: number): Promise<Annotation | null>;
    listAnnotations(query?: AnnotationQueryOptions): Promise<Annotation[]>;
    updateAnnotation(
        updateData: UpdateAnnotation | UpdateAnnotation[]
    ): Promise<boolean>;
    deleteAnnotation(id: number): Promise<boolean>;
    unlinkAnimalFromAnnotations(animalID: number | number[]): Promise<boolean>;
}
