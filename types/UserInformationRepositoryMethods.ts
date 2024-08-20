import { Count } from "./Count";

export interface UserInformationRepositoryMethods {
    count(): Promise<Count>;
}
