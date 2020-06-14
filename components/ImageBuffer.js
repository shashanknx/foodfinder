import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default ImageBuffer = ({ app, props }) => {
  if (app == "ckillens") {
    return <Image source={require("../assets/images/cole.png")} style={styles.avatar}/>
  } else if (app == "nishs9") {
    return <Image source={require("../assets/images/nish.png")} style={styles.avatar}/>
  } else if (app == "shashanknx") {
    return <Image source={require("../assets/images/shashank.png")} style={styles.avatar}/>
  } else if (app == "shopaniuk") {
    return <Image source={require("../assets/images/sho.png")} style={styles.avatar}/>
  } else if (app.includes("Moe") || app.includes("moe")) {
    return <Image source={require("../assets/images/burrito.jpg")} style={styles.cardItemImagePlace}/>
  } else if (app.includes("Pizza") || app.includes("pizza")) {
    return <Image source={require("../assets/images/pizza.png")} style={styles.cardItemImagePlace}/>
  } else if (app.includes("Mongolian") || app.includes("mongolian")) {
    return <Image source={require("../assets/images/mongo.png")} style={styles.cardItemImagePlace}/>
  } else if (app.includes("Waffle") || app.includes("waffle")) {
    return <Image source={require("../assets/images/wafflehouse.jpg")} style={styles.cardItemImagePlace}/>
  } else if (app.includes("Curry") || app.includes("curry")) {
    return <Image source={require("../assets/images/curry.png")} style={styles.cardItemImagePlace}/>
  } else {
    return <Image source={require("../assets/images/cardImage2.png")} style={styles.cardItemImagePlace}/>
  }

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "lavenderblush",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 5,
    borderColor: "#FFF",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden"
  },
  cardBody: {
    color: "#ffb6c1",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    color: "#ffb6c1",
    flex: 1,
    padding: 16,
    paddingTop: 24
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 14
  },
  cardItemImagePlace: {
    width: 80,
    height: 80,
    margin: 16,
    borderRadius: 5
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 68,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:40
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftBtn: {
    padding: 8
  },
  icon1: {
    fontSize: 24,
    color: "#000",
    opacity: 0.5
  },
  centerBtn: {
    padding: 8
  },
  icon2: {
    fontSize: 24,
    color: "#000",
    opacity: 0.5
  },
  rightBtn: {
    padding: 8
  },
  icon3: {
    fontSize: 24,
    color: "#000",
    opacity: 0.5
  },
  actionBody: {
    flexDirection: "column",
    padding: 8
  },
  actionButton1: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    fontSize: 14
  },
  actionText1: {
    color: "red",

    alignItems: "center",

    opacity: 0.9,
    fontSize: 14
  }
});
