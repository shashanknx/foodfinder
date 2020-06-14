import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { AsyncStorage } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import axios from 'axios';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      username_valid: true,
      password: '',
      error_msg: '',
      showLoading: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('username').then((value) => {
      if (value) {
        this.setState({
          username: value
        });
      }
    });
  }

  validateUsername(username) {
    return true;
  }
  submitLoginCredentials() {
    const { username, password } = this.state;
    this.setState({
      showLoading: true
    });
    let self = this;
    axios.get("https://foodfinderapi.herokuapp.com/UserData/" + username + "/" + password).then(res => {
      this.setState({
        showLoading: false
      });
      if(res.data) {
        AsyncStorage.setItem('username', username).then((value) => {
          self.props.navigation.navigate('App');
        })
      } else {
        self.setState({
          error_msg: "Login error"
        })
      }
    })
  }

  render() {
    const { username, password, username_valid, error_msg, showLoading } = this.state;

  return (
    <View style={styles.container}>
        <View style={styles.loginView}>
          <View style={styles.loginTitle}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.travelText}>Food</Text>
            </View>
            <View style={{ marginTop: -10 }}>
              <Text style={styles.travelText}>Finder</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styles.errorText}>{error_msg}</Text>
            </View>
          </View>
          <View style={styles.loginInput}>
            <Input
              leftIcon={
                <Icon
                  name="user-o"
                  type="font-awesome"
                  color="rgba(171, 189, 219, 1)"
                  size={25}
                />
              }
              containerStyle={{ marginVertical: 10 }}
              onChangeText={username => this.setState({ username })}
              value={username}
              inputStyle={{ marginLeft: 10, color: 'black' }}
              keyboardAppearance="light"
              placeholder="Username"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              ref={input => (this.usernameInput = input)}
              onSubmitEditing={() => {
                this.setState({ username_valid: this.validateUsername(username) });
                this.passwordInput.focus();
              }}
              blurOnSubmit={false}
              placeholderTextColor="black"
              errorStyle={{ textAlign: 'center', fontSize: 12 }}
              errorMessage={
                username_valid ? null : 'Please enter a valid username'
              }
            />
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  type="font-awesome"
                  color="rgba(171, 189, 219, 1)"
                  size={25}
                />
              }
              containerStyle={{ marginVertical: 10 }}
              onChangeText={password => this.setState({ password })}
              value={password}
              inputStyle={{ marginLeft: 10, color: 'black' }}
              secureTextEntry={true}
              keyboardAppearance="light"
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              ref={input => (this.passwordInput = input)}
              blurOnSubmit={true}
              placeholderTextColor="black"
            />
          </View>
          <Button
            title="LOG IN"
            activeOpacity={1}
            underlayColor="transparent"
            onPress={this.submitLoginCredentials.bind(this)}
            loading={showLoading}
            loadingProps={{ size: 'small', color: 'black' }}
            disabled={!username_valid || password.length < 8}
            buttonStyle={{
              height: 50,
              width: 250,
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 30,
              marginLeft: 25,
            }}
            containerStyle={{ marginVertical: 10 }}
            titleStyle={{ fontWeight: 'bold', color: 'black' }}
          />
          <View style={styles.footerView}>
            <Text style={{ color: 'grey' }}>New here?</Text>
            <Button
              title="Create an Account"
              type="clear"
              activeOpacity={0.5}
              titleStyle={{ color: 'black', fontSize: 15 }}
              containerStyle={{ marginTop: -10 }}
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </View>
    </View>

  )}
          }

  LoginScreen.navigationOptions = {
    title: 'Login Page',
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginView: {
    marginTop: 150,
    backgroundColor: 'transparent',
    width: 300,
    height: 400,
    marginLeft: 50,
    justifyContent: 'center',
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'bold',
  },
  errorText: {
    color: 'red'
  },
  plusText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'regular',
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
