import "@testing-library/jest-dom/extend-expect";
import { testRender } from "../../testHelpers/testRender";
import ReactFlvPlayer from "./../ReactFlvPlayer";

describe("ReactFlvPlayer", () => {
  it("renders with default props", () => {
    testRender(<ReactFlvPlayer url="your-test-url" />);
  });

  it("renders with custom props", () => {
    testRender(
      <ReactFlvPlayer url="your-test-url" height="200px" width="300px" />,
    );
  });
});
