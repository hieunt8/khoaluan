import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from "socket.io-client";
import * as Config from '../../api/Config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, StyleSheet, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
var image = require('../../../assets/logo/UIT.png')
import { Provider, Divider } from 'react-native-paper';
const { width } = Dimensions.get('window');
import { AesEnc, AesDec } from '../../api/ApiAES'


const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema } from '../../models/Realm'
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema], encryptionKey: DEFAULT_KEY });
const user = realm.objects('user');

_getGroupDatabase = (groupName) => {
  try {
    const allGroup = realm.objects('group');
    let group = allGroup.filtered(`groupName = "${groupName}"`);
    if (group[0])
      return group[0];
    else {
      return null;
    }

  } catch (error) {
    console.log("_getGroupDatabase ApiGroupLoading.js", error)
  }
};

export default class Chatting extends Component {
  state = {
    messages: [],
    shareKey: ''
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

    let groupLocal = _getGroupDatabase(this.props.navigation.state.params.room);
    this.setState({
      shareKey: groupLocal.shareKey,
    })
    const { navigation } = this.props;
    // alert(navigation.getParam('name', 'NO-ID'));
    let room = navigation.getParam('room', 'NO-ID');
    let name = navigation.getParam('name', 'NO-ID');

    this.socket = io(`${Config.API_URL}`);  //Connect Socket io
    this.socket.emit('join', { name, room }, (error) => { //Request room to Server
      if (error) { }
      // alert(error);
    })
    this.socket.on("sendMessage", msg => {
      // let msg = AesDec(msg2, this.state.shareKey);
      if (msg.user != name) {
        let messagerep = msg.text[0];
        messagerep.user._id = 2;
        messagerep.text = AesDec(messagerep.text, this.state.shareKey);
        // messagerep.user.avatar = msg[0].avatar;
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messagerep),
        }))
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
    console.log(this.state.messages);
    messages[0].text = AesEnc(messages[0].text, this.state.shareKey);
    // let messages2 = AesEnc(JSON.stringify(messages), this.state.shareKey);
    this.socket.emit('sendMessage', messages); // Send message to server
    // this.setState({ chatMessage: '' });
    console.log("User: ", user[0].name, " send mess:", messages);
    messages[0].text = AesDec(messages[0].text, this.state.shareKey);
  }

  render() {
    let room = this.props.navigation.getParam('room', 'NO-ID');
    return (
      <Provider style={styles.backgroud}>
        <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, justifyContent: 'space-between', paddingVertical: 10 }}>
          <View style={{ paddingTop: -5 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center'
              }}>

              <TouchableOpacity onPress={this.backAction}>
                <Icon
                  name="backspace"
                  color='black'
                  size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <Text>{room}</Text>
          <TouchableOpacity onPress={
            () => { this.props.navigation.navigate('viewgroupInfo', { groupName: this.props.navigation.state.params.room }); }
          }>
            <Icon
              name="info-outline"
              color='black'
              size={20} />
          </TouchableOpacity>
        </View>
        <Divider />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
            name: user[0].name,
            // avatar: image,
            avatar: 'https://placeimg.com/140/140/any',
          }} />
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  backgroud: {
    flex: 1,
    backgroundColor: "white"
  },
  itemViewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width / 4,
    width: (width - 40) / 2,
    margin: 10,
    backgroundColor: 'blue',
    borderRadius: 7
  }
})