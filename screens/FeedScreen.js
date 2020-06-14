import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, RefreshControl } from 'react-native';
import FeedView from '../components/Feed';
import DealInput from '../components/DealInput';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

export default class FeedScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      posts: [],
      refreshing: false,
      isLoading: true,
      error_msg: "",
      isAddMode: false,
      setIsAddMode: false,
      image: []
    };
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    var self = this;
    axios.get("https://foodfinderapi.herokuapp.com/Posts/yes").then(res => {
      if(res.data) {
        self.setState({
          posts: res.data.reverse()
        })
      } else {
        self.setState({
          error_msg: "Login error"
        })
      }
      this.setState({refreshing: false});
    })

  }
    componentWillMount() {
      this.setState({
        isLoading: true
      });
      var self = this;
      axios.get("https://foodfinderapi.herokuapp.com/Posts/yes").then(res => {
        self.setState({
          isLoading: false
        });
        if(res.data) {
          self.setState({
            posts: res.data.reverse()
          })
          // this.getImages();
        } else {
          self.setState({
            error_msg: "Login error"
          })
        }
      })
    }
    getImages = () => {
      this.setState({isLoading: true});
      var promiseArray = [];
      for (var i = 0; i < this.state.posts.length; i++) {
        promiseArray.push(this.addImage(this.state.posts[i]));
      }
      Promise.all(promiseArray).then(function(values){
        this.setState({image: values})
        this.setState({isLoading: false});
      }).catch(err => {
        console.log(err);
    })
  }
    addImage = (post) => {
      return new Promise((resolve, reject) => {
        axios.get("http://foodfinderapi.herokuapp.com/Images/" + post.imgPointer, {headers: {'Content-Type':'image/png'}}).then(res => {
          if (res.data) {
            console.log(res.data);
            resolve(res.data);
          } else {
            reject("Error");
          }
        })
      })
    }
  addDeal = () => {
    this.setState({
      isAddMode: true
    })
  }
  addDealHandler = (dealTitle) => {
    this.setState({
      isAddMode: false
    })
  };

  cancelButtonHandler = () => {
    this.setState({
      isAddMode: false
    })
  };
  render (){
    if (this.state.isLoading) return <Text />;
    return (
    <View style={styles.screen}>
      <View style={styles.searchBar}>
          <TextInput
            placeholder="Search"
            style={styles.searchTitle}/>

       </View>
       <View style={{padding: 5}}>
        </View>
        <DealInput
        visible={this.state.isAddMode}
        onAddDeal={this.addDealHandler}
        onCancel={this.cancelButtonHandler}
      />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            />
          }
        >
          <FeedView
            posts={this.state.posts}
            props={this.props}
          />
        </ScrollView>

        <AwesomeButtonCartman type="secondary" onPress={this.addDeal} style={{alignSelf:"center", marginTop: 5}}>New Post</AwesomeButtonCartman>

    </View>
    )}
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,

  },
  searchBar: {
    width: 350,
    height: 40,
    backgroundColor: "rgba(255,255,255,1)",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    alignSelf: "center"
  },
  searchTitle: {
    color: "#000",
    padding: 5,
    fontSize: 18,

    alignItems: "center"
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 15
  },
  buttonPost: {
    width: 60,
    height: 30
  }
});
FeedScreen.navigationOptions = {
  title: 'Feed',
  headerStyle: {
    backgroundColor: '#b5490b'
  },
  headerTintColor: '#fff'
};
