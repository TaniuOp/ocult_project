import React from "react";
import { shallow } from "enzyme";
import Prequiz from "./Prequiz";

describe("Prequiz", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Prequiz />);
    expect(wrapper).toMatchSnapshot();
  });
});
