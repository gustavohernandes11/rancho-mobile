import { Skeleton } from "./Skeleton";
import { Span } from "./Span";

export const PageSkeleton = () => {
    return (
        <>
            <Skeleton width={60} height={60} />
            <Span direction="row">
                <Skeleton width={150} flex={0} />
                <Skeleton width={80} flex={0} />
                <Skeleton width={50} flex={0} />
            </Span>
            <Span direction="column">
                <Skeleton width={150} />
                <Skeleton width="100%" height={60} />
                <Skeleton width={150} />
            </Span>
            <Span direction="column">
                <Skeleton width={150} />
                <Skeleton width={200} />
                <Skeleton width="100%" height={80} />
            </Span>
            <Span direction="row" justify="flex-end">
                <Skeleton flex={0} width={80} height={30} />
                <Skeleton flex={0} width={80} height={30} />
            </Span>
        </>
    );
};
