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
    color: Colors.primary_3,
  },
  community: {
    position: "absolute",
    fontSize: 16,
    top: 35 + 30,
    right: 0,
    color: Colors.primary_3,
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
  deeplink: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height + 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  messageAvatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    marginLeft: 12,
  },
  author_name: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    color: Colors.primary_3,
  },
  content_author_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deeplink_container: {
    width: width * 0.9,
    left: 0,
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  follow_button: {
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 20,
    width: 110,
    backgroundColor: Colors.primary_2,
    borderWidth: 2,
    borderColor: Colors.primary_2,
  },
  unfollow_button: {
    width: 110,
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.primary_2,
  },
  unfollow_text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary_2,
    textAlign: "center",
  },
  follow_text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
    textAlign: "center",
  },
  friend_refer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    position:"absolute",
    bottom:20,
    width: width,
  },
  friend_refer_url: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.third,
    borderRadius: 10,
  },
  copy: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.third,
    borderRadius: 10,
    marginLeft: 5,
  },
});

export default styles;
