import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import BtnHomNav from "./components/BtnHomeNav";
import ButtonKv from "./components/ButtonKv";
import SwipePad from "../screens/components/SwipePad";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { SafeAreaView, StatusBar } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function Home({ navigation }) {
  const [demoOption, setDemoOption] = useState(2); // 2, 5, 7
  // const [modalRadius, setModalRadius] = useState(100);
  const [circleRadiusOuter, setCircleRadiusOuter] = useState(100);
  const [circleRadiusMiddle, setCircleRadiusMiddle] = useState(50);
  const [circleRadiusInner, setCircleRadiusInner] = useState(25);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  // const [actionList, setActionList] = useState([]);

  const [padVisible, setPadVisible] = useState(true);
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [actionList, setActionList] = useState([]);
  const swipePadStartX = Dimensions.get("window").width / 3;
  const swipePadStartY = Dimensions.get("window").height / 3.5;
  const [tapDetails, setTapDetails] = useState({
    timestamp: "no date",
    padPosCenterX: swipePadStartX + circleRadiusOuter / 2 - 2.5,
    padPosCenterY: swipePadStartY + circleRadiusOuter / 2 - 2.5,
  });
  const [tapIsActive, setTapIsActive] = useState(true);
  const [currentActionType, setCurrentActionType] = useState(null);

  // const circleRadiusMiddle = 50;
  //const circleRadiusInner = 25; // this can change no problem
  //const circleRadiusOuter = 125; // this needs to be twice the circleRadiusMiddle
  const numTrianglesMiddle = 5;
  const numTrianglesOuter = 10;

  const defaultColors = {
    1: "rgba(125, 150, 100, 0.5)", // right
    2: "rgba(150, 100, 125, 0.5)", // bottom
    3: "rgba(150, 100, 125, 0.5)", // bottombottomleft
    4: "rgba(125, 100, 150, 0.5)",
    5: "rgba(150, 100, 125, 0.5)", // bottombottomleft
    6: "rgba(125, 100, 150, 0.5)",
    7: "rgba(150, 100, 125, 0.5)", // bottombottomleft
    8: "rgba(125, 100, 150, 0.5)",
    9: "rgba(150, 100, 125, 0.5)", // bottombottomleft
    10: "rgba(125, 100, 150, 0.5)",
    11: "rgba(150, 100, 125, 0.5)", // bottombottomleft
    12: "rgba(125, 100, 150, 0.5)",
    13: "rgba(150, 100, 125, 0.5)", // bottombottomleft
    14: "rgba(125, 100, 150, 0.5)",
    15: "rgba(150, 100, 125, 0.5)", // bottombottomleft
    16: "rgba(125, 100, 150, 0.5)",
    center: "gray",
  };
  const [swipeColorDict, setSwipeColorDict] = useState(defaultColors);

  const handleChoice = (option) => {
    console.log("picked somethinge");
    setDemoOption(option);
  };

  const onChangeSizeCircleOuter = (newSize) => {
    setCircleRadiusOuter(newSize);
    setTapDetails({
      timestamp: "",
      padPosCenterX: swipePadStartX + newSize / 2 - 2.5,
      padPosCenterY: swipePadStartY + newSize / 2 - 2.5,
    });
  };

  // const onVwSipePadCreated = (event) => {
  //   console.log("onSwipePad crated ");
  //   // console.log(event);
  //   const { x, y, width, height } = event.nativeEvent.layout;
  //   // setTimelineLayout({ x, y, width, height });
  //   // setTapDetails({
  //   //   timestamp: "",
  //   //   padPosCenterX: calculatePadPositionCenter(x, y).x,
  //   //   padPosCenterY: calculatePadPositionCenter(x, y).y,
  //   // });
  //   console.log(` x: ${x}, y:${y}`);

  //   // setTapDetails({
  //   //   timestamp: "",
  //   //   padPosCenterX: x + circleRadiusOuter - 2.5,
  //   //   padPosCenterY: y + circleRadiusOuter - 2.5,
  //   // });
  // };

  // const gestureTapBegin = Gesture.Tap().onBegin((event) => {
  //   if (tapIsActive) {
  //     const timestamp = new Date().toISOString();
  //     const { x, y, absoluteX, absoluteY } = event;

  //     setPadPositionCenter({
  //       x: calculatePadPositionCenter(x, y).x,
  //       y: calculatePadPositionCenter(x, y).y,
  //     });
  //     setPadVisible(true);
  //     setTapDetails({
  //       timestamp,
  //       padPosCenterX: calculatePadPositionCenter(x, y).x,
  //       padPosCenterY: calculatePadPositionCenter(x, y).y,
  //     });
  //     setTapIsActive(false);
  //     handleSwipeColorChange("center");
  //   }
  // });

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
    const inMiddleCircle = distanceFromCenter < circleRadiusMiddle;

    console.log(
      `circle x: ${tapDetails.padPosCenterX}, y:${tapDetails.padPosCenterY}`
    );
    // console.log(
    //   `relativeToPadCenterX: ${Math.round(
    //     relativeToPadCenterX
    //   )}, relativeToPadCenterY:${Math.round(relativeToPadCenterY)}`
    // );
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

        if (!inMiddleCircle) {
          if (relativeToPadCenterY < boundary21Y) {
            handleSwipeColorChange(1, 6);
            setCurrentActionType(6);
          } else {
            handleSwipeColorChange(1, 7);
            setCurrentActionType(7);
          }
        }
      } else if (
        relativeToPadCenterY > boundary57Y &&
        relativeToPadCenterY > boundary129Y
      ) {
        // Bottom (sector 2)
        handleSwipeColorChange(2);
        setCurrentActionType(2);
        if (!inMiddleCircle) {
          if (relativeToPadCenterY > boundary93Y) {
            handleSwipeColorChange(2, 8);
            setCurrentActionType(8);
          } else {
            handleSwipeColorChange(2, 9);
            setCurrentActionType(9);
          }
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
        if (!inMiddleCircle) {
          if (relativeToPadCenterY > boundary165Y) {
            // line that splits the the outer sectors and cuts the middle sector in half
            handleSwipeColorChange(3, 10);
            setCurrentActionType(10);
          } else {
            handleSwipeColorChange(3, 11);
            setCurrentActionType(11);
          }
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
        if (!inMiddleCircle) {
          if (relativeToPadCenterY > boundary237Y) {
            handleSwipeColorChange(4, 12);
            setCurrentActionType(12);
          } else {
            handleSwipeColorChange(4, 13);
            setCurrentActionType(13);
          }
        }
      } else {
        // setSwipeColorDict(defaultColors);
        handleSwipeColorChange(5);
        setCurrentActionType(5);
        if (!inMiddleCircle) {
          if (relativeToPadCenterY < boundary309Y) {
            handleSwipeColorChange(5, 14);
            setCurrentActionType(14);
          } else {
            handleSwipeColorChange(5, 15);
            setCurrentActionType(15);
          }
        }
      }
    }
  });

  const styleVwMainPosition = {
    // position: "absolute",
    // left: padPositionCenter.x, // Center modal horizontally
    // top: padPositionCenter.y, // Center modal vertically
  };

  const styleVwSwipePad = {
    position: "absolute",

    // top: Dimensions.get("window").height / 4.5 - circleRadiusOuter / 2,
    // left: Dimensions.get("window").width / 5 - circleRadiusOuter / 2,
    top: swipePadStartY - circleRadiusOuter / 2,
    left: swipePadStartX - circleRadiusOuter / 2,
  };
  const styleVwTapDetails = {
    width: 5,
    height: 5,
    backgroundColor: "black",
    position: "absolute",
    top: tapDetails.padPosCenterY,
    left: tapDetails.padPosCenterX,
  };

  const calculatePadPositionCenter = (x, y) => {
    // const centeredX = x - circleRadiusOuter;
    // const centeredY = y - circleRadiusOuter;
    const centeredX = x;
    const centeredY = y - 65;
    return { x: centeredX, y: centeredY };
    // return { x: 0, y: 0 };
  };
  const calculateDistanceFromCenter = (swipePosX, swipePosY) => {
    return Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );
  };

  return (
    <GestureHandlerRootView
      style={{
        // backgroundColor: "green",
        justifyContent: "center",
        flex: 1,
        // width: "100%",
      }}
    >
      <GestureDetector gesture={gestureSwipeOnChange}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.vwTitle}>
              <Text style={styles.txtTitle}>Swipe Pad Demo</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                width: Dimensions.get("window").width * 0.9,
              }}
            >
              <Text style={{ fontSize: 20 }}> Choose type:</Text>

              <ButtonKv
                colorBackground={"blue"}
                width={50}
                onPress={() => handleChoice(2)}
                selected={demoOption == 2}
              >
                2
              </ButtonKv>
              <ButtonKv
                colorBackground={"blue"}
                width={50}
                onPress={() => handleChoice(5)}
                selected={demoOption == 5}
              >
                5
              </ButtonKv>
              <ButtonKv
                colorBackground={demoOption == 7 ? "red" : "blue"}
                width={50}
                onPress={() => handleChoice(7)}
                selected={demoOption == 7}
              >
                7
              </ButtonKv>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.vwSlider}>
              <Text style={styles.txtLabel}>
                Adjust OuterRadius: {circleRadiusOuter}
              </Text>

              <Slider
                style={{ width: 300, height: 20 }}
                minimumValue={50}
                maximumValue={200}
                step={1}
                value={circleRadiusOuter}
                onValueChange={(value) => {
                  onChangeSizeCircleOuter(value);
                }}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#8E8E93"
                thumbTintColor="#1EB1FC"
              />
              <Text style={styles.txtLabel}>
                Adjust Middle : {circleRadiusOuter}
              </Text>

              <Slider
                style={{ width: 300, height: 20 }}
                minimumValue={25}
                maximumValue={100}
                step={1}
                value={circleRadiusMiddle}
                onValueChange={(value) => {
                  setCircleRadiusMiddle(value);
                }}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#8E8E93"
                thumbTintColor="#1EB1FC"
              />
              <Text style={styles.txtLabel}>Center : {circleRadiusInner}</Text>

              <Slider
                style={{ width: 300, height: 20 }}
                minimumValue={5}
                maximumValue={50}
                step={1}
                value={circleRadiusInner}
                onValueChange={(value) => {
                  setCircleRadiusInner(value);
                }}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#8E8E93"
                thumbTintColor="#1EB1FC"
              />
            </View>
            <View style={{ padding: 20 }}>
              {demoOption != 0 ? (
                <BtnHomNav
                  goTo={"GestureScreen08"}
                  title={"Go to Touch Pad Screen ➡️"}
                  // description={"use location to display swipe pad"}
                  navigation={navigation}
                  // modalRadius={modalRadius}
                  demoOption={demoOption}
                />
              ) : (
                <Text style={{ fontSize: 20 }}>Select a type</Text>
              )}
            </View>
            <View
              style={styleVwSwipePad}
              // onLayout={(event) => onVwSipePadCreated(event)}
            >
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
            <View style={styleVwTapDetails}></View>
          </View>
        </SafeAreaView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    // justifyContent: "center",
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  txtTitle: {
    fontSize: 30,
    color: "#fff",
  },

  vwSlider: {
    marginTop: 20,
    alignItems: "center",
  },
  txtLabel: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
});
