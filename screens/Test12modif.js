import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import ViewTemplate from "../screens_core/components/ViewTemplate";
import ButtonKv from "../screens_core/components/ButtonKv";
// import SwipePadGeoFunc03 from "./components/SwipePadGeoFunc03";
import SwipePad from "./components/SwipePad";
import { Polygon, Svg, Circle } from "react-native-svg";

export default function Test12modif({ route, navigation }) {
  const {
    numTrianglesMiddle,
    numTrianglesOuter,
    circleRadiusInner,
    circleRadiusMiddle,
    circleRadiusOuter,
    // swipeColorDict,
    // setSwipeColorDict,
    defaultColors,
  } = route.params;
  const [padVisible, setPadVisible] = useState(false);
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const [tapDetails, setTapDetails] = useState({
    timestamp: "no date",
    padPosCenterX: 0,
    padPosCenterY: 0,
  });
  const [tapIsActive, setTapIsActive] = useState(true);
  const [currentActionType, setCurrentActionType] = useState(null);

  // console.log(`defaultColors: ${defaultColors}`);
  // console.log(route.params);
  // const circleRadiusMiddle = 50;
  // const circleRadiusInner = 25; // this can change no problem
  // const circleRadiusOuter = 175; // this needs to be twice the circleRadiusMiddle
  // const numTrianglesMiddle = 5;
  // const numTrianglesOuter = 10;

  // const defaultColors = {
  //   1: "rgba(125, 150, 100, 0.5)", // right
  //   2: "rgba(150, 100, 125, 0.25)", // bottom
  //   3: "rgba(150, 100, 125, 0.25)", // bottombottomleft
  //   4: "rgba(125, 100, 150, 0.25)",
  //   5: "rgba(150, 100, 125, 0.25)", // bottombottomleft
  //   6: "rgba(125, 100, 150, 0.25)",
  //   7: "rgba(150, 100, 125, 0.25)", // bottombottomleft
  //   8: "rgba(125, 100, 150, 0.25)",
  //   9: "rgba(150, 100, 125, 0.25)", // bottombottomleft
  //   10: "rgba(125, 100, 150, 0.25)",
  //   11: "rgba(150, 100, 125, 0.25)", // bottombottomleft
  //   12: "rgba(125, 100, 150, 0.25)",
  //   13: "rgba(150, 100, 125, 0.25)", // bottombottomleft
  //   14: "rgba(125, 100, 150, 0.25)",
  //   15: "rgba(150, 100, 125, 0.25)", // bottombottomleft
  //   16: "rgba(125, 100, 150, 0.25)",
  //   center: "gray",
  // };
  const [swipeColorDict, setSwipeColorDict] = useState(defaultColors);

  const calculateDistanceFromCenter = (swipePosX, swipePosY) => {
    return Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );
  };

  const addAction = (direction) => {
    if (direction === null) return;
    if (actionList?.length > 0) {
      setActionList([...actionList, direction]);
    } else {
      setActionList([direction]);
    }
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction, outerDirection = false) => {
    setSwipeColorDict(defaultColors);
    const brightColors = {
      1: "rgba(255, 255, 175, 1)", // right
      2: "rgba(255, 175, 255, 1)", //bottom
      3: "rgba(255, 200, 225, 1)", //bottombottomleft
      4: "rgba(255, 175, 255, 1)",
      5: "rgba(255, 200, 225, 1)", //bottombottomleft
      6: "rgba(255, 175, 255, 1)",
      7: "rgba(255, 200, 225, 1)", //bottombottomleft
      8: "rgba(255, 175, 255, 1)",
      9: "rgba(255, 200, 225, 1)", //bottombottomleft
      10: "rgba(255, 175, 255, 1)",
      11: "rgba(255, 200, 225, 1)", //bottombottomleft
      12: "rgba(255, 175, 255, 1)",
      13: "rgba(255, 200, 225, 1)", //bottombottomleft
      14: "rgba(255, 175, 255, 1)",
      15: "rgba(255, 200, 225, 1)", //bottombottomleft
      16: "rgba(255, 175, 255, 1)",
      center: "white",
    };

    if (!outerDirection) {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
      }));
    } else {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
        [outerDirection]: brightColors[outerDirection],
      }));
    }
  };

  const calculatePadPositionCenter = (x, y) => {
    const centeredX = x - circleRadiusOuter;
    const centeredY = y - circleRadiusOuter;
    return { x: centeredX, y: centeredY };
  };

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;

      setPadPositionCenter({
        x: calculatePadPositionCenter(x, y).x,
        y: calculatePadPositionCenter(x, y).y,
      });
      setPadVisible(true);
      setTapDetails({
        timestamp,
        padPosCenterX: calculatePadPositionCenter(x, y).x,
        padPosCenterY: calculatePadPositionCenter(x, y).y,
      });
      setTapIsActive(false);
      handleSwipeColorChange("center");
    }
  });
  const gestureTapOnEnd = Gesture.Tap()
    .maxDuration(2000)
    .onEnd((event) => {
      console.log("- tap on end");
      const { x, y, absoluteX, absoluteY } = event;

      const swipePosX = calculatePadPositionCenter(x, y).x;
      const swipePosY = calculatePadPositionCenter(x, y).y;

      const distanceFromCenter = Math.sqrt(
        Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
          Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
      );

      if (distanceFromCenter < circleRadiusInner) {
        setPadVisible(false);
        setTapIsActive(true);
      }
    });

  const gestureSwipeOnChange = Gesture.Pan().onChange((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = calculateDistanceFromCenter(
      swipePosX,
      swipePosY
    );

    const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
    const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;

    const inInnerCircle = distanceFromCenter < circleRadiusInner;

    // Y dependent
    const boundary345Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 345); // sector 1 beginning
    const boundary57Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 57); // sector 1 end sector 2 begin
    const boundary21Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 21); // sector 1-1 end 1-2 begin
    const boundary129Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 129); // sector 2 end 3begin
    const boundary93Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 93); // splits sector 2
    const boundary201Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 201); // sector 3-1 top end
    const boundary165Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 165); // sector 3-1 top end
    const boundary273Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 273); // sector 4 end 5 begin
    const boundary237Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 237); // splits sector 4
    const boundary309Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 309); // splits sector 5

    if (inInnerCircle) {
      handleSwipeColorChange("center");
      setCurrentActionType(null);
    } else {
      if (
        relativeToPadCenterY > boundary345Y &&
        relativeToPadCenterY < boundary57Y
      ) {
        // Right (bottom - ish) side (sector 1)
        handleSwipeColorChange(1);
        setCurrentActionType(1);

        if (relativeToPadCenterY < boundary21Y) {
          handleSwipeColorChange(1, 6);
          setCurrentActionType(6);
        } else {
          handleSwipeColorChange(1, 7);
          setCurrentActionType(7);
        }
      } else if (
        relativeToPadCenterY > boundary57Y &&
        relativeToPadCenterY > boundary129Y
      ) {
        // Bottom (sector 2)
        handleSwipeColorChange(2);
        setCurrentActionType(2);

        if (relativeToPadCenterY > boundary93Y) {
          handleSwipeColorChange(2, 8);
          setCurrentActionType(8);
        } else {
          handleSwipeColorChange(2, 9);
          setCurrentActionType(9);
        }
      }
      //
      else if (
        // relativeToPadCenterY < -boundary231Y &&
        relativeToPadCenterY > boundary201Y
      ) {
        // Left
        handleSwipeColorChange(3);
        setCurrentActionType(3);

        if (relativeToPadCenterY > boundary165Y) {
          // line that splits the the outer sectors and cuts the middle sector in half
          handleSwipeColorChange(3, 10);
          setCurrentActionType(10);
        } else {
          handleSwipeColorChange(3, 11);
          setCurrentActionType(11);
        }
      }
      //
      else if (
        relativeToPadCenterY < boundary273Y
        // &&
        // relativeToPadCenterY > boundary201Y
      ) {
        // Top Left
        handleSwipeColorChange(4);
        setCurrentActionType(4);

        if (relativeToPadCenterY > boundary237Y) {
          handleSwipeColorChange(4, 12);
          setCurrentActionType(12);
        } else {
          handleSwipeColorChange(4, 13);
          setCurrentActionType(13);
        }
      } else {
        // setSwipeColorDict(defaultColors);
        handleSwipeColorChange(5);
        setCurrentActionType(5);
        if (relativeToPadCenterY < boundary309Y) {
          handleSwipeColorChange(5, 14);
          setCurrentActionType(14);
        } else {
          handleSwipeColorChange(5, 15);
          setCurrentActionType(15);
        }
      }
    }
  });

  const gestureSwipeOnEnd = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );

    if (distanceFromCenter > circleRadiusInner) {
      addAction(currentActionType);
    }
    setPadVisible(false);
    setTapIsActive(true);
  });

  // Combine swipe and tap gestures
  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureTapOnEnd,
    gestureSwipeOnEnd,
    gestureSwipeOnChange
  );

  // ----- Dynamic Styles -----------------
  const styleVwMainPosition = {
    position: "absolute",
    left: padPositionCenter.x, // Center modal horizontally
    top: padPositionCenter.y, // Center modal vertically
  };

  const styleVwBoundary = {
    position: "absolute",
    left: padPositionCenter.x, // Center modal horizontally
    top: padPositionCenter.y, // Center modal vertically
    width: circleRadiusOuter * 2,
    height: circleRadiusOuter * 2,
    // backgroundColor: "rgba(125, 100, 150, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  };

  const styleSvgBoundary = {
    // top: circleRadiusOuter
    // backgroundColor: "green",
    // top: 50,
  };

  // ---- JSX --------------------
  return (
    <ViewTemplate navigation={navigation}>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={combinedGestures}>
          <View style={styles.tapArea}>
            <View style={styles.vwRegisterTaps}>
              {tapDetails && (
                <View>
                  <Text>Time: {tapDetails.timestamp}</Text>
                  <Text>
                    Coordinates: X:{tapDetails.padPosCenterX}, Y:
                    {tapDetails.padPosCenterY}
                  </Text>
                </View>
              )}
              {actionList.length > 0 &&
                actionList.map((elem, index) => {
                  return (
                    <View key={index}>
                      <Text style={styles.txtAction}>Action: {elem}</Text>
                    </View>
                  );
                })}
            </View>
            <Text style={styles.tapText}>Tap anywhere inside this view</Text>
            {/* These are used to identify the boundaries */}
            {/* <View style={styleVwBoundary}>
              <Svg
                height={circleRadiusOuter * 2}
                width={circleRadiusOuter * 2}
                style={styleSvgBoundary}
              >
                <Polygon
                  // key={index}
                  points={`${circleRadiusOuter},${circleRadiusOuter} ${
                    circleRadiusOuter +
                    circleRadiusOuter * Math.cos((Math.PI / 180) * 345)
                  },${
                    circleRadiusOuter +
                    circleRadiusOuter * Math.sin((Math.PI / 180) * 345)
                  }`}
                  stroke="black" // Stroke color
                  strokeWidth="2" // Thickness of the stroke
                />
                <Polygon
                  // key={index}
                  points={`${circleRadiusOuter},${circleRadiusOuter} ${
                    circleRadiusOuter +
                    circleRadiusOuter * Math.cos((Math.PI / 180) * 273)
                  },${
                    circleRadiusOuter +
                    circleRadiusOuter * Math.sin((Math.PI / 180) * 273)
                  }`}
                  stroke="black" // Stroke color
                  strokeWidth="2" // Thickness of the stroke
                />
              </Svg>
            </View> */}
            {padVisible && (
              <SwipePad
                circleRadiusInner={circleRadiusInner}
                circleRadiusMiddle={circleRadiusMiddle}
                styleVwMainPosition={styleVwMainPosition}
                swipeColorDict={swipeColorDict}
                circleRadiusOuter={circleRadiusOuter}
                numTrianglesMiddle={numTrianglesMiddle}
                numTrianglesOuter={numTrianglesOuter}
              />
            )}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: Dimensions.get("window").width,
          alignItems: "flex-end",
          // padding: 20,
        }}
      >
        <ButtonKv
          colorBackground={"blue"}
          width={150}
          onPress={() => setActionList([])}
        >
          Send Action
        </ButtonKv>
      </View>
    </ViewTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  tapArea: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  tapText: {
    fontSize: 16,
    color: "#333",
  },
  vwRegisterTaps: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 3,
    borderRadius: 5,
  },
  // ---- MOdal ---
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignItems: "center",
    position: "absolute",
    // backgroundColor: "purple",
  },
  txtAction: {
    backgroundColor: "gray",
    alignSelf: "center",
    margin: 1,
  },
});
