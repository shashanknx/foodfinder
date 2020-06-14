import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import SettingsList from 'react-native-setting-list';
import axios from 'axios';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
  CheckRow
} from 'react-native-settings-page';
import { AsyncStorage } from 'react-native';
export default class SettingsScreen extends React.Component{
  
  constructor(props){
    super();
    this.state = {
      isLoading: false,
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    };
  }
  componentWillMount() {
    this.setState({isLoading: true})
    AsyncStorage.getItem('username').then((value) => {
      if (value) {
        this.setState({
          username: value
        });
      }
      var self = this;
      axios.get("https://foodfinderapi.herokuapp.com/UserData/" + self.state.username + "/").then(res => {
        if(res.data) {
            self.setState({
              email: res.data[0].email,
              firstName: res.data[0].firstName,
              lastName: res.data[0].lastName
            })
        } else {
          self.setState({
            error_msg: "Login error"
          })
        }
      })
      self.setState({
        isLoading: false
      });
    });

    
  }
  
  render() {
    if (this.state.isLoading){
      return(<View></View>)
    };
    // const { username, email} = this.state;
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <View style={{flex:1}}>
          <SettingsList>
            <SettingsList.Header headerText='User Information' headerStyle={{color:'#000', alignSelf: "center",fontSize: 20}}/>
            <SettingsList.Item titleInfo={this.state.username} titleStyle={{color:'#000'}} hasNavArrow={false} title='Username'/>
            <SettingsList.Item titleInfo={this.state.email} hasNavArrow={false} title='Email'/>
            <SettingsList.Item titleInfo={this.state.firstName} hasNavArrow={false} title='First Name'/>
            <SettingsList.Item titleInfo={this.state.lastName} hasNavArrow={false} title='Last Name'/>
          </SettingsList>
        </View>
      </View>
    );
  }
  
  onValueChange(value){
    this.setState({switchValue: value});
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerStyle: {
    backgroundColor: '#FF0000'
  },
  headerTintColor: '#fff'
};
