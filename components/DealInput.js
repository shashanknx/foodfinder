import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Alert,
  AsyncStorage,
  Text,
  TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import $ from 'jquery';
import { CheckBox } from 'react-native-elements';

const DealInput = props => {
  src = "../assets/images/cardImage2.png";

  const dict = {
    title: "",
    description: "",
    author: "Nish",
    img: "../assets/images/cardImage2.png",
    obj_num: null,
    healthDescriptors: [0, 0, 0],
    dietaryRestrictions: [0,0,0],
    colors:['powderblue', 'lavenderblush']
  };
  const boxes = {
    b1: false,
    b2: false,
    b3: false,
    b4: false,
    b5: false,
    b6: false,
  }
  const [eboxes, setboxes] = useState(boxes);

  const [enteredDeal, setEnteredDeal] = useState(dict);

  const titleHandler = (enteredText) => {
    var newDict = {
      title: enteredText,
      description: enteredDeal.description,
      author: enteredDeal.author,
      img: enteredDeal.img,
      obj_num: null
      };
    setEnteredDeal(newDict);
  };

  const dealInputHandler = (enteredText) => {
    var newDict = {
      title: enteredDeal.title,
      description: enteredText,
      author: enteredDeal.author,
      img: enteredDeal.img,
      obj_num: null
      };
    setEnteredDeal(newDict);
  };

   onChooseImagePress = async () => {
    Permissions.askAsync(Permissions.CAMERA)
    Permissions.askAsync(Permissions.CAMERA_ROLL)
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      exif: true,
    })
    if (!result.cancelled) {
      Alert.alert("Success");
    } else {
      Alert.alert("Error!");
    }

    // Post Image
    var bla = new FormData();
    bla.append("image", "/Users/wizard/0a/react-app/food-finder/assets/images/icon.png");
    console.log(bla);

    var form = new FormData();
    data2 = result.uri.slice(7);
    form.append("image", data2);
    // axios.post('https://foodfinderapi.herokuapp.com/Images/', form, {
    //   headers: { 'content-type': 'multipart/form-data'}
    // }).then(res => {console.log(res)}).catch(error => {console.log(['image error', error])});

    // var data = new FormData();
    // data.append("image", data2);
    // console.log(data);
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     console.log(this.responseText);
    //   }
    // });
    // xhr.open("POST", "https://foodfinderapi.herokuapp.com/Images/");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.19.0");
    // xhr.setRequestHeader("Accept", "*/*");
    // xhr.setRequestHeader("Cache-Control", "no-cache");
    // xhr.setRequestHeader("Postman-Token", "76cb312b-fb8c-4604-9c52-4cac91f78369,51959064-01f8-4d29-a055-5dd0f6ac0ad9");
    // xhr.setRequestHeader("Host", "foodfinderapi.herokuapp.com");
    // xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
    // xhr.setRequestHeader("Content-Length", "905");
    // xhr.setRequestHeader("Connection", "keep-alive");
    // xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.send(data);



    var newDict = {
      title: enteredDeal.title,
      description: enteredDeal.description,
      author: enteredDeal.author,
      img: result.uri,
      obj_num: 10// set this to the image object number returned from Post Image
      };

    setEnteredDeal(newDict);
  }


  const addDealHandler = () => {
    props.onAddDeal(enteredDeal);
    AsyncStorage.getItem('username').then((value) => {
      if (value) {
        axios.post("https://foodfinderapi.herokuapp.com/Posts/", {
      username: value,
      postTitle: enteredDeal.title,
      description: enteredDeal.description,
      likes: 0,
      imgPointer: "5dd36fd496907d210a03e9c0"
    }).then(res => {console.log(res);}).catch(error => {console.log(["Create Post Error", error]);});
    console.log(enteredDeal);
    setEnteredDeal(dict);
      }
    });
    // Create Post

  };

  const cancelButtonHandler = () => {
    props.onCancel()
    setEnteredDeal(dict);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View style={styles.card}>
          <View style={styles.content}>
            <TextInput
            placeholder="Title"
            placeholderTextColor = "gray"
            style={styles.inputTitle}
            onChangeText={titleHandler}
            value={enteredDeal.title}
            />
          <TextInput
            placeholder="Description/Deal"
            placeholderTextColor = "gray"
            style={styles.inputDesc}
            onChangeText={dealInputHandler}
            value={enteredDeal.description}
            />
          </View>
          <View style={styles.imgContainer} >
            <TouchableOpacity onPress={this.onChooseImagePress}>
              {enteredDeal.img == "../assets/images/cardImage2.png" &&
              <Image
                style={{width: 50, height: 50}}
                source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
                />
              }
              {enteredDeal.img != "../assets/images/cardImage2.png" &&
              <Image
                style={{width: 75, height: 75}}
                source={{uri: enteredDeal.img}}
              />
              }
            </TouchableOpacity>
          </View>
        </View>
      <View style={styles.options}>

        <Text style={{fontSize:20, paddingBottom:10}}>Dietary Restrictions</Text>

        <View style={{flexDirection:'column'}}>
          <CheckBox
            title='Vegan'
            size={10}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={eboxes.b1}
            onPress={function ()
              {
                var brandNew = {
                  b1: !eboxes.b1,
                  b2: eboxes.b2,
                  b3: eboxes.b3,
                  b4: eboxes.b4,
                  b5: eboxes.b5,
                  b6: eboxes.b6,
                };
                setboxes(brandNew);
              }
            }
            />
            <CheckBox
              title='Vegetarian'
              size={10}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={eboxes.b2}
              onPress={function ()
                {
                  var brandNew = {
                    b1: eboxes.b1,
                    b2: !eboxes.b2,
                    b3: eboxes.b3,
                    b4: eboxes.b4,
                    b5: eboxes.b5,
                    b6: eboxes.b6,
                  };
                  setboxes(brandNew);
                }
              }
              />
            <CheckBox
              size={10}
              title='Gluten Free'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={eboxes.b3}
              onPress={function ()
                {
                  var brandNew = {
                    b1: eboxes.b1,
                    b2: eboxes.b2,
                    b3: !eboxes.b3,
                    b4: eboxes.b4,
                    b5: eboxes.b5,
                    b6: eboxes.b6,
                  };
                  setboxes(brandNew);
                }
              }
              />
        </View>
        <View>
          <Text style={{fontSize:25}}> </Text>
        </View>

        <Text style={{fontSize:20, paddingBottom:10}}>Health Tags</Text>

        <View style={{flexDirection:'column'}}>
          <CheckBox
            size={10}
            title='Keto'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={eboxes.b4}
            onPress={function ()
              {
                var brandNew = {
                  b1: eboxes.b1,
                  b2: eboxes.b2,
                  b3: eboxes.b3,
                  b4: !eboxes.b4,
                  b5: eboxes.b5,
                  b6: eboxes.b6,
                };
                setboxes(brandNew);
              }
            }
            />

            <CheckBox
              size={10}
              title='Low Sodium'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={eboxes.b5}
              onPress={function ()
                {
                  var brandNew = {
                    b1: eboxes.b1,
                    b2: eboxes.b2,
                    b3: eboxes.b3,
                    b4: eboxes.b4,
                    b5: !eboxes.b5,
                    b6: eboxes.b6,
                  };
                  setboxes(brandNew);
                }
              }
              />
          <CheckBox
            size={10}
            title='Superfruits'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={eboxes.b6}
            onPress={function ()
              {
                var brandNew = {
                  b1: eboxes.b1,
                  b2: eboxes.b2,
                  b3: eboxes.b3,
                  b4: eboxes.b4,
                  b5: eboxes.b5,
                  b6: !eboxes.b6,
                };
                setboxes(brandNew);
              }
            }
            />
        </View>

      </View>
        <View style={styles.buttons}>
          <Button title="Post" onPress={addDealHandler} />
          <Button title="Cancel" color="red" onPress={cancelButtonHandler} />
        </View>

      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#000000",
    borderWidth: 4
  },
  inputTitle: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 0,
    paddingBottom: 12,
    fontSize: 24,
  },
  inputDesc: {
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 0,
    fontSize: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  card: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: "lavenderblush",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 5,
    borderColor: "#FFF",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2,
    }
  },
  content: {
    color: "#ffb6c1",
    flex: 1,
    padding: 16,
    paddingTop: 24
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    paddingTop: 20,
    width: '90%',
    flexDirection: 'column',
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',

  }
});

DealInput.navigationOptions = {
  title: 'New Post',
};

export default DealInput;
