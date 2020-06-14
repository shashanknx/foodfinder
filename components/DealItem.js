import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default class DealItem extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.cardBody}>
          <View style={styles.bodyContent}>
            <Text style={styles.titleStyle}>{this.props.title}</Text>
            {this.props.desc == '' && <Text style={styles.subtitleStyle}>Description:</Text>}
            <Text style={styles.subtitleStyle}>{this.props.desc}</Text>
          </View>
          {this.props.title != "Atwoods" && this.props.title != "Moe Monday" &&
          <Image
            source={{uri: this.props.img}}
            style={styles.cardItemImagePlace}
          />
          }
          {this.props.title == "Atwoods" &&
            <Image
              source={require("../assets/images/pizza.png")}
              style={styles.cardItemImagePlace}
            />
          }
          {this.props.title == "Moe Monday" &&
            <Image
              source={require("../assets/images/burrito.jpg")}
              style={styles.cardItemImagePlace}
            />
          }
        </View>
        <View style={styles.actionBody}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.leftBtn}>
              <MaterialCommunityIconsIcon name="heart" style={styles.icon1} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.centerBtn}>
              <MaterialCommunityIconsIcon name="book" style={styles.icon2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightBtn}>
              <MaterialCommunityIconsIcon name="share" style={styles.icon3} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:"row"}}>
            <Text>By: </Text>
            <TouchableOpacity style={styles.actionButton1}>
              <Text style={styles.actionText1}>{this.props.author}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
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
