import { Circle, Group, Line, Path, vec } from "@shopify/react-native-skia";
import React from "react";

// Colors and size used by the Gooey example
export const BG = "lightblue";
export const FG = "#ade6bb";
export const R = 50;

// Turns a point {x, y} into a Skia transform (move to that point)
export const translate = ({ x, y }) => {
  "worklet";
  return [{ translateX: x }, { translateY: y }];
};

// Draws a 24x24 SVG icon, centered and scaled up 2x
export const Icon = ({ path }) => {
  return (
    <Group
      origin={vec(12)}
      transform={[{ translateX: -12 }, { translateY: -12 }, { scale: 2 }]}
    >
      <Path path={path} color="white" />
    </Group>
  );
};

// The center button: a circle with three white lines
export const Hamburger = () => {
  return (
    <>
      <Circle r={R} color={FG} />
      <Line p1={vec(-20, -15)} p2={vec(20, -15)} color="white" style="stroke" strokeWidth={6} />
      <Line p1={vec(-20, 0)} p2={vec(20, 0)} color="white" style="stroke" strokeWidth={6} />
      <Line p1={vec(-20, 15)} p2={vec(20, 15)} color="white" style="stroke" strokeWidth={6} />
    </>
  );
};
