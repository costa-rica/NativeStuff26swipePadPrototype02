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
  const [demoOption, setDemoOption] = useState("4-8"); // 2, 4-8, 5-10, or 4-12
  const [numTrianglesMiddle, setNumTrianglesMiddle] = useState(4); // 2, 4, or 5
  const [numTrianglesOuter, setNumTrianglesOuter] = useState(8); // 8, 10 or 12
  const [circleRadiusOuter, setCircleRadiusOuter] = useState(100);
  const [circleRadiusMiddle, setCircleRadiusMiddle] = useState(50);
  const [circleRadiusInner, setCircleRadiusInner] = useState(25);

  const [padVisible, setPadVisible] = useState(true);

  const [swipePadStartX, setSwipePadStartX] = useState(0);
  const [swipePadStartY, setSwipePadStartY] = useState(0);
  // const swipePadStartY = 0;
  // const swipePadStartX = Dimensions.get("window").width / 3;
  // const swipePadStartY = Dimensions.get("window").height / 3.5 + 100;
  const [tapDetails, setTapDetails] = useState({
    timestamp: "no date",
    padPosCenterX: swipePadStartX + circleRadiusOuter / 2 - 2.5,
    padPosCenterY: swipePadStartY + circleRadiusOuter / 2 - 2.5,
  });
  // const [tapIsActive, setTapIsActive] = useState(true);
  const [currentActionType, setCurrentActionType] = useState(null);

  // const circleRadiusMiddle = 50;
  //const circleRadiusInner = 25; // this can change no problem
  //const circleRadiusOuter = 125; // this needs to be twice the circleRadiusMiddle
  // const numTrianglesMiddle = 5;
  // const numTrianglesOuter = 10;
  const handleStyleVwSwipePadOnLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    // console.log(`x:${x}, y:${y}`);
    setSwipePadStartX(x);
    setSwipePadStartY(y);
    setTapDetails({
      timestamp: "",
      padPosCenterX: x + width / 2,
      padPosCenterY: y + height / 2,
      // padPosCenterX: x + width / 2 + circleRadiusOuter / 2 - 2.5,
      // padPosCenterY: y + circleRadiusOuter / 2 - 2.5,
    });
  };
  const defaultColors = {
    1: "rgba(125, 150, 100, 0.8)", // right
    2: "rgba(150, 100, 125, 0.8)", // bottom
    3: "rgba(150, 100, 125, 0.8)", // bottombottomleft
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
    // console.log("picked something");
    setDemoOption(option);
    if (option == "5-10") {
      setNumTrianglesMiddle(5);
      setNumTrianglesOuter(10);
      // need to adjust degrees rotation
    } else if (option == "4-12") {
      setNumTrianglesMiddle(4);
      setNumTrianglesOuter(12);
      // need to adjust degrees rotation in two places
    } else if (option == "4-8") {
      setNumTrianglesMiddle(4);
      setNumTrianglesOuter(8);
      // need to adjust degrees rotation in two places
    }
  };

  const onChangeSizeCircleOuter = (newSize) => {
    setCircleRadiusOuter(newSize);
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

  const gestureSwipeOnChange = Gesture.Pan().onChange((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    // const swipePosX = calculatePadPositionCenter(x, y).x;
    // const swipePosY = calculatePadPositionCenter(x, y).y;
    const swipePosX = calculatePadPositionCenter(absoluteX, absoluteY).x;
    const swipePosY = calculatePadPositionCenter(absoluteX, absoluteY).y;

    const distanceFromCenter = calculateDistanceFromCenter(
      swipePosX,
      swipePosY
    );

    const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
    const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;

    const inInnerCircle = distanceFromCenter < circleRadiusInner;
    const inMiddleCircle = distanceFromCenter < circleRadiusMiddle;

    if (inInnerCircle) {
      handleSwipeColorChange("center");
      setCurrentActionType(null);
    } else {
      if (demoOption == "5-10")
        logicFiveTenCircle(
          relativeToPadCenterX,
          relativeToPadCenterY,
          inMiddleCircle
        );
      if (demoOption === "4-12")
        logicFourTwelveCircle(
          relativeToPadCenterX,
          relativeToPadCenterY,
          inMiddleCircle
        );
      if (demoOption === "4-8")
        logicFourEightCircle(
          relativeToPadCenterX,
          relativeToPadCenterY,
          inMiddleCircle
        );
    }
  });

  const logicFourEightCircle = (
    relativeToPadCenterX,
    relativeToPadCenterY,
    inMiddleCircle
  ) => {
    const boundary45 = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45);
    // console.log(
    //   `relativeX: ${relativeToPadCenterX}, relativeY: ${relativeToPadCenterY}, b45:${boundary45}`
    // );
    if (relativeToPadCenterX > 0 && relativeToPadCenterY > 0) {
      // Bottom Right
      handleSwipeColorChange(1);
      setCurrentActionType(1);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY < boundary45) {
          handleSwipeColorChange(1, 5);
          setCurrentActionType(5);
        } else {
          handleSwipeColorChange(1, 6);
          setCurrentActionType(6);
        }
      }
    } else if (relativeToPadCenterX < 0 && relativeToPadCenterY > 0) {
      // Bottom Left
      handleSwipeColorChange(2);
      setCurrentActionType(2);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > Math.abs(boundary45)) {
          handleSwipeColorChange(2, 7);
          setCurrentActionType(7);
        } else {
          handleSwipeColorChange(2, 8);
          setCurrentActionType(8);
        }
      }
    } else if (relativeToPadCenterX < 0 && relativeToPadCenterY < 0) {
      // Top Right
      handleSwipeColorChange(3);
      setCurrentActionType(3);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > boundary45) {
          handleSwipeColorChange(3, 9);
          setCurrentActionType(9);
        } else {
          handleSwipeColorChange(3, 10);
          setCurrentActionType(10);
        }
      }
    } else if (relativeToPadCenterX > 0 && relativeToPadCenterY < 0) {
      // Top Right
      handleSwipeColorChange(4);
      setCurrentActionType(4);
      if (!inMiddleCircle) {
        if (Math.abs(relativeToPadCenterY) > boundary45) {
          handleSwipeColorChange(4, 11);
          setCurrentActionType(11);
        } else {
          handleSwipeColorChange(4, 12);
          setCurrentActionType(12);
        }
      }
    } else {
      setSwipeColorDict(defaultColors);
    }
  };

  const logicFiveTenCircle = (
    relativeToPadCenterX,
    relativeToPadCenterY,
    inMiddleCircle
  ) => {
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
  };

  const logicFourTwelveCircle = (
    relativeToPadCenterX,
    relativeToPadCenterY,
    inMiddleCircle
  ) => {
    // Y dependent
    const boundary15Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 15); // ? parts to circle, 15 degrees
    // const boundary30Y =
    //   relativeToPadCenterX * Math.tan((Math.PI / 180) * (360 / 12)); // 12 parts to circle
    const boundary45Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45); // 8 parts to circle 45 = 360/8
    // X dependent
    const boundary75X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 75));

    if (Math.abs(relativeToPadCenterY) < boundary45Y) {
      // Right side
      handleSwipeColorChange(1);
      setCurrentActionType(1);
      if (!inMiddleCircle) {
        if (-relativeToPadCenterY > boundary15Y) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(1, 16);
          setCurrentActionType(16);
        } else if (Math.abs(relativeToPadCenterY) < boundary15Y) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(1, 5);
          setCurrentActionType(5);
        } else {
          handleSwipeColorChange(1, 6);
          setCurrentActionType(6);
        }
      }
    } else if (relativeToPadCenterY > Math.abs(boundary45Y)) {
      // Bottom
      handleSwipeColorChange(2);
      setCurrentActionType(2);
      if (!inMiddleCircle) {
        if (relativeToPadCenterX > boundary75X) {
          handleSwipeColorChange(2, 7);
          setCurrentActionType(7);
        } else if (Math.abs(relativeToPadCenterX) < boundary75X) {
          handleSwipeColorChange(2, 8);
          setCurrentActionType(8);
        } else {
          handleSwipeColorChange(2, 9);
          setCurrentActionType(9);
        }
      }
    } else if (relativeToPadCenterY > boundary45Y) {
      // Left
      handleSwipeColorChange(3);
      setCurrentActionType(3);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > Math.abs(boundary15Y)) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(3, 10);
          setCurrentActionType(10);
        } else if (relativeToPadCenterY > boundary15Y) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(3, 11);
          setCurrentActionType(11);
        } else {
          handleSwipeColorChange(3, 12);
          setCurrentActionType(12);
        }
      }
    } else if (relativeToPadCenterY < boundary45Y) {
      // Top
      handleSwipeColorChange(4);
      setCurrentActionType(4);
      if (!inMiddleCircle) {
        if (relativeToPadCenterX < boundary75X) {
          handleSwipeColorChange(4, 13);
          setCurrentActionType(13);
        } else if (relativeToPadCenterX < Math.abs(boundary75X)) {
          handleSwipeColorChange(4, 14);
          setCurrentActionType(14);
        } else {
          handleSwipeColorChange(4, 15);
          setCurrentActionType(15);
        }
      }
    } else {
      setSwipeColorDict(defaultColors);
    }
  };

  const styleVwSwipePad = {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "green",
    // position: "absolute",
    // top: swipePadStartY - circleRadiusOuter / 2,
    // left: swipePadStartX - circleRadiusOuter / 2,
  };
  // const styleVwTapDetails = {
  //   width: 5,
  //   height: 5,
  //   backgroundColor: "black",
  //   position: "absolute",
  //   top: tapDetails.padPosCenterY,
  //   left: tapDetails.padPosCenterX,
  // };

  const calculatePadPositionCenter = (x, y) => {
    const centeredX = x;
    // const centeredY = y - 65;
    const centeredY = y;
    return { x: centeredX, y: centeredY };
  };
  const calculateDistanceFromCenter = (swipePosX, swipePosY) => {
    return Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );
  };

  // console.log(`circleRadiusInner: ${circleRadiusInner}`);
  return (
    <GestureHandlerRootView
      style={{
        // backgroundColor: "green",
        justifyContent: "center",
        flex: 1,
        // width: "100%",
      }}
    >
      {/* <SafeAreaView style={{ flex: 1 }}> */}
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
            width={60}
            onPress={() => handleChoice("4-8")}
            selected={demoOption == "4-8"}
          >
            4-8
          </ButtonKv>
          <ButtonKv
            colorBackground={"blue"}
            width={60}
            onPress={() => handleChoice("5-10")}
            selected={demoOption == "5-10"}
          >
            5-10
          </ButtonKv>
          <ButtonKv
            colorBackground={"blue"}
            width={60}
            onPress={() => handleChoice("4-12")}
            selected={demoOption == "4-12"}
          >
            4-12
          </ButtonKv>
        </View>
        {/* <View style={{ flex: 1 }} /> */}
        <GestureDetector gesture={gestureSwipeOnChange}>
          <View
            style={styleVwSwipePad}
            onLayout={(event) => handleStyleVwSwipePadOnLayout(event)}
          >
            {padVisible && (
              <SwipePad
                numTrianglesMiddle={numTrianglesMiddle}
                numTrianglesOuter={numTrianglesOuter}
                circleRadiusInner={circleRadiusInner}
                circleRadiusMiddle={circleRadiusMiddle}
                styleVwMainPosition={{}}
                circleRadiusOuter={circleRadiusOuter}
                swipeColorDict={swipeColorDict}
                setSwipeColorDict={setSwipeColorDict}
                defaultColors={defaultColors}
              />
            )}
          </View>
        </GestureDetector>
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
              goTo={"Test12modif"}
              title={"Go to Touch Pad Screen ➡️"}
              navigation={navigation}
              demoOption={demoOption}
              circleRadiusInner={circleRadiusInner}
              circleRadiusMiddle={circleRadiusMiddle}
              defaultColors={defaultColors}
              circleRadiusOuter={circleRadiusOuter}
              numTrianglesMiddle={numTrianglesMiddle}
              numTrianglesOuter={numTrianglesOuter}
            />
          ) : (
            <Text style={{ fontSize: 20 }}>Select a type</Text>
          )}
        </View>

        {/* <View style={styleVwTapDetails}></View> */}
      </View>
      {/* </SafeAreaView> */}
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
