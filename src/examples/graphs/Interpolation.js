import { interpolatePaths, Canvas, Fill, Path } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { createGraphPath } from "./createGraphPath";

export const Interpolation = ({ height, width }) => {
  const [currentPath, setCurrentPath] = useState(() =>
    createGraphPath(width, height, 60)
  );

  useEffect(() => {
    // Make a new random graph every second
    const h = setInterval(() => {
      setCurrentPath(createGraphPath(width, height, 60));
    }, 1000);
    setCurrentPath(createGraphPath(width, height, 60));
    return () => {
      clearInterval(h);
    };
  }, [height, width]);

  return (
    <View style={{ height, marginBottom: 10 }}>
      <Canvas style={styles.graph}>
        <Fill color="black" />
        <TransitioningPath
          path={currentPath}
          strokeWidth={4}
          style="stroke"
          strokeJoin="round"
          strokeCap="round"
          color="#cccc66"
          start={0}
          end={1}
        />
      </Canvas>
      <Text>Transitions between graphs</Text>
    </View>
  );
};

const TransitioningPath = ({ path, start = 0, end = 1, ...props }) => {
  // Save current and next paths (initially the same)
  const currentPathRef = useSharedValue(path);
  const nextPathRef = useSharedValue(path);

  // Progress value (0 -> 1) drives the animation
  const progress = useSharedValue(0);

  // The animated path is a mix of current and next path, based on progress.
  const animatedPath = useDerivedValue(() =>
    interpolatePaths(
      progress.value,
      [0, 1],
      [currentPathRef.value, nextPathRef.value]
    )
  );

  useEffect(() => {
    // Both paths must have the same number of points to be mixed
    if (!path.isInterpolatable(currentPathRef.value)) {
      console.warn("Paths must have the same length. Skipping interpolation.");
      return;
    }
    // Start from wherever the animation is right now
    currentPathRef.value = animatedPath.value;
    nextPathRef.value = path;
    // Reset progress and animate to 1
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 750,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [animatedPath, currentPathRef, nextPathRef, path, progress]);

  return <Path {...props} start={start} end={end} path={animatedPath} />;
};

const styles = StyleSheet.create({
  graph: {
    flex: 1,
  },
});
