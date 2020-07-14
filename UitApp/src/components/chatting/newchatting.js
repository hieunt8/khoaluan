import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from "socket.io-client";
import * as Config from '../../api/Config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {  Text, View, StyleSheet, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import { Provider, Divider } from 'react-native-paper';
const { width } = Dimensions.get('window');

const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema } from '../../models/Realm'
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema], encryptionKey: DEFAULT_KEY });




export default class Chatting extends Component {
  state = {
    messages: [],
  }

  backAction = () => {
    this.socket.emit('Disco', {});
    this.props.navigation.navigate('Menu');
    console.log('disconnect')
    return true;
  };

  componentDidMount() {
    this.setState({
      messages: [
      ],
    })
    const { navigation } = this.props;
    // alert(navigation.getParam('name', 'NO-ID'));
    let room = navigation.getParam('room', 'NO-ID');
    let name = navigation.getParam('name', 'NO-ID');

    this.socket = io(`${Config.API_URL}`);  //Connect Socket io
    this.socket.emit('join', { name, room }, (error) => { //Request room to Server
      if (error){}
        // alert(error);
    })
    this.socket.on("sendMessage", msg => {
      // console.log(msg);
      if(msg.user != name){
      let messagerep = msg.text[0];
      messagerep.user._id = 2;
      messagerep.user.avater= 'https://placeimg.com/140/140/any';
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messagerep),
      }))}else{

      }
    });
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onSend(messages = []) {
    // console.log(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.socket.emit('sendMessage', messages); // Send message to server
    // this.setState({ chatMessage: '' });
    console.log(messages);
  }

  render() {
    let room = this.props.navigation.getParam('room', 'NO-ID');
    return (
      <Provider style={styles.backgroud}>
         <View style={{flexDirection:'row', marginTop: 5, marginHorizontal: 10, justifyContent:'space-between', paddingVertical: 10}}>
          <View style={{paddingTop: -5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
          
              <TouchableOpacity onPress={ this.backAction }>
                <Icon
                name="backspace"
                color='black'
                size={20}/>
              </TouchableOpacity>
            </View>
          </View>
          <Text>{room}</Text>
          <TouchableOpacity onPress={
              ()=>{this.props.navigation.navigate('viewgroupInfo', {groupName: this.props.navigation.state.params.room});}
          }>
            <Icon
              name="info-outline"
              color='black'
              size={20}/>
          </TouchableOpacity>
        </View>
        <Divider />
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          avatar: 'https://placeimg.com/140/140/any',
        }}/>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  backgroud:{ 
    flex: 1,
    backgroundColor: "white"
  },
  itemViewStyles:{ 
    justifyContent: 'center',
    alignItems: 'center',
    height: width/4,
    width: (width-40)/2,
    margin: 10, 
    backgroundColor: 'blue', 
    borderRadius: 7 
  }
})