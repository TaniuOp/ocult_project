import React from "react";
import { shallow } from "enzyme";
import Quiz from "./Quiz";

describe("Quiz", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Quiz />);
    expect(wrapper).toMatchSnapshot();
  });
});
