import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../resources/Colors";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    top: 25,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
    color: Colors.primary_3
  },
  community: {
    position:'absolute',
    fontSize: 16,
    top: 35 + 30,
    right: 0,
    color: Colors.primary_3
  },
  controls: {
    left: 0,
    top: 30,
    width: width,
    height: 80,
    flexDirection: "row",
    marginBottom: 30,
  },
  back_control: {
    width: 40,
    height: 40,
    //backgroundColor: "rgba(241,241,241,0.8)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    top: 20,
    borderWidth: 0,
    backgroundColor: Colors.third,
  },
  back_control_icon: {
    fontSize: 20,
    fontWeight: "800",
    //color: "white",
  },
});

export default styles;
