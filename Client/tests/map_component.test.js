// __tests__/MapScreen.test.js
import React from "react";
import renderer from "react-test-renderer";
import MapScreen from "../components/map_component"; // Adjust the import path based on your project structure

//jest.mock("expo-location");

describe("MapScreen", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<MapScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("menu toggle works", () => {
    const component = renderer.create(<MapScreen />);
    const instance = component.getInstance();

    // Example: Test if menu is initially not visible
    expect(instance.state.isMenuVisible).toBeFalsy();

    // Example: Trigger toggle menu
    instance.handleMenuToggle();

    // Example: Test if menu becomes visible
    expect(instance.state.isMenuVisible).toBeTruthy();
  });

  // Add more tests based on your component's functionality
});
