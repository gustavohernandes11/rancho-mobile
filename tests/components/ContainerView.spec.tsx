import { render, screen } from "tests/setupTests";

import { ContainerView } from "components/ContainerView";
import { Text } from "react-native";

describe("ContainerView", () => {
    it("should render the component", () => {
        render(<ContainerView testID="container_id" />);
        const sut = screen.getByTestId("container_id");
        expect(sut).toBeOnTheScreen();
    });

    it("should render the children", () => {
        render(
            <ContainerView testID="container_id">
                <Text>FOO</Text>
            </ContainerView>
        );
        const sut = screen.getByTestId("container_id");
        expect(sut).toHaveTextContent("FOO");
    });
});
