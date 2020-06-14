import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import { AsyncStorage } from 'react-native';
import ImageBuffer from '../components/ImageBuffer';
import axios from 'axios';

export default class ProfileScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: false,
      name: "",
      image: "",
      info: "",
      description: "",
      error_msg: ""
    };
  }
  componentWillMount() {
    this.setState({
      isLoading: true
    });
    var self = this;
    AsyncStorage.getItem('username').then((value) => {
      axios.get("http://foodfinderapi.herokuapp.com/UserData/" + value).then(res => {
        console.log(res.data);
        self.setState({
          isLoading: false
        });
        if(res.data) {
          self.setState({
            name: res.data[0].firstName + " " + res.data[0].lastName,
            info: res.data[0].job,
            description: res.data[0].bio,
            image: res.data[0].username
          })
        } else {
          self.setState({
            error_msg: "Login error"
          })
        }
        this.setState({isLoading: false});
      })
    })

  }
  logout() {
    AsyncStorage.removeItem('username').then((value) => {
      this.props.navigation.navigate('Auth')
    })
  }

  render() {
    if(this.state.isLoading){
      return(<View/>);
    }
    return (
      <ScrollView style={styles.container}>
          <View style={styles.header}></View>
          <ImageBuffer 
              props = {this.props}
              app = {this.state.image}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.info}>{this.state.info}</Text>
              <Text style={styles.description}>{this.state.description}</Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Button style={styles.buttonText}
                  title="Log out"
                  titleStyle={{fontSize:12}}
                  color="#FFFFFF"
                  onPress={() => this.logout()}

                />
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}
ProfileScreen.navigationOptions = {
  title: 'Profile',
};


const styles = StyleSheet.create({
  header:{
    backgroundColor: "lavenderblush",
    height:200,
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
  name:{
    fontSize:24,
    color:"#000000",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:10,
  },
  info:{
    fontSize:16,
    color: "red",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#000000",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: 'rgb(0, 122, 255)',
  },
  buttonText: {
    color:"#FFFFFF",
    fontSize: 18
  }
});
