import React from "react";
import { shallow } from "enzyme";
import Placeholder from "./Placeholder";

describe("Placeholder", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Placeholder />);
    expect(wrapper).toMatchSnapshot();
  });
});
