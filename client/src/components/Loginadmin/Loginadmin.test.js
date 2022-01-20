import React from "react";
import { shallow } from "enzyme";
import Loginadmin from "./Loginadmin";

describe("Loginadmin", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Loginadmin />);
    expect(wrapper).toMatchSnapshot();
  });
});
