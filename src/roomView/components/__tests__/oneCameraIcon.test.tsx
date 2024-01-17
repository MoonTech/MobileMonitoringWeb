import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { OneCameraIcon } from "../oneCameraIcon";

describe("OneCameraIcon", () => {
  it("renders correctly ", () => {
    render(<OneCameraIcon />);
  });
});
