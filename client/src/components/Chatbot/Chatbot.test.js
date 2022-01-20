import React from "react";
import { shallow } from "enzyme";
import Chatbot from "./Chatbot";

describe("Chatbot", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Chatbot />);
    expect(wrapper).toMatchSnapshot();
  });
});
