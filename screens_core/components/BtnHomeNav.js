import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function BtnHomeNav(props) {
  // console.log(props.setSwipeColorDict);
  // console.log(props.circleRadiusInner);
  return (
    <View style={styles.vwNavGroup}>
      <TouchableOpacity
        style={styles.touchOpNav}
        onPress={() =>
          props.navigation.navigate(props.goTo, {
            numTrianglesMiddle: props.numTrianglesMiddle,
            numTrianglesOuter: props.numTrianglesOuter,
            demoOption: props.demoOption,
            circleRadiusInner: props.circleRadiusInner,
            circleRadiusMiddle: props.circleRadiusMiddle,
            circleRadiusOuter: props.circleRadiusOuter,
            // swipeColorDict: props.swipeColorDict,
            // setSwipeColorDict: props.setSwipeColorDict,
            defaultColors: props.defaultColors,
          })
        }
      >
        <Text style={styles.txtTouchOpNav}>{props.title}</Text>
      </TouchableOpacity>
      <Text>{props.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  vwNavGroup: {
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
  touchOpNav: {
    backgroundColor: "black",
    padding: 5,
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 12,
    marginBottom: 1,
  },
  txtTouchOpNav: {
    color: "gray",
    alignSelf: "center",
    fontSize: 20,
  },
});
