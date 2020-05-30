import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import io from "socket.io-client";
import * as link from "../../api/ApiLink"
import { connect } from 'react-redux';
import callApi from './../../api/ApiCaller';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import {API_URL} from '../../api/Config'
import { Icon } from 'react-native-elements';
import * as Config from '../../api/Config';
const { width} = Dimensions.get('window');
class chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
      checkValue: false
    };
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    alert(navigation.getParam('name', 'NO-ID'));
    let room = navigation.getParam('room', 'NO-ID');
    let name = navigation.getParam('name', 'NO-ID');

    this.socket = io(`${Config.API_URL}`);  //Connect Socket io
    this.socket.emit('join', { name, room }, (error) => { //Request room to Server
      if (error)
        alert(error);
    })
    this.socket.on('message', message => { //Show user join room 
      this.setState({
        chatMessages: [...this.state.chatMessages, message.user + message.text.toUpperCase()]
      })
    })
    this.socket.on('roomData', roomData => { //Show users in room
      this.setState({
        chatMessages: [...this.state.chatMessages, " " + roomData.users]
      })
    })
    this.socket.on("sendMessage", msg => {
      this.setState({
        chatMessages: [...this.state.chatMessages, msg.user.toUpperCase() + " : " + msg.text]
      });
    });
  }

  submitChatMessage() {
    this.socket.emit('sendMessage', this.state.chatMessage); // Send message to server
    this.setState({ chatMessage: '' });
  }
  Disconnnect(){
    this.socket.emit('Disco', {});
    // this.socket.off();
    alert('disconnect');
    this.props.navigation.navigate('Group');
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      // <ScrollView>
      <Text >{chatMessage}</Text>
      // </ScrollView>
    ));
    return (
     <View style={styles.container}>
       <View style={{ flexDirection: 'row', marginHorizontal: 5, marginBottom: 5 }}>
        <TouchableOpacity style = {styles.Exit}
          onPress={() => {
            this.Disconnnect()
        }}
        >
          <Text style={{ borderRadius: 95, color: 'red' }}>Thoát</Text>
          </TouchableOpacity>
     
          <TouchableOpacity style = {styles.LoginStyles}>
          <Text style={{ borderRadius: 95 }}>Danh sách bạn bè tròng phòng</Text>
          </TouchableOpacity>
      </View>
     <View style={{flex: 1, borderWidth: 1, borderRadius: 7, backgroundColor: "white", marginHorizontal: 5, borderColor: 'grey'}}>
        <ScrollView >
         {chatMessages}
        </ScrollView>
        </View>
  
        <View 
        style={styles.inputCommentStyles}>
          <TextInput placeholder="Nhập tin nhắn của bạn..." 
            style = {{paddingLeft: 7, height: 20, flex: 1, marginTop: 7}}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              //this.setState({ chatMessage });
              if(chatMessage!='' || chatMessage!=null){
                this.setState({ 
                  chatMessage: chatMessage,
                  checkValue: true
                })
                }else{
                  this.setState({ 
                    chatMessage: "",
                    checkValue: false
                  })
                }
            }}
            value={this.state.chatMessage}/>
              <Icon
                name="send"
                color={this.state.checkValue? 'blue' : 'grey'}
                style={{marginVertical: 50, paddingRight: 5}} 
                onPress = {()=>{
                  this.state.checkValue? this.submitChatMessage() : alert("Nhập nội dung")
                }}/>
            </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',

  },
  LoginStyles: {
    height: 40,
    backgroundColor: '#3399FF',
    borderRadius:7,
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  Exit: {
    height: 40,
    backgroundColor: '#DCDCDC',
    borderRadius:7,
    borderColor: 'grey',
    marginTop: 10,
    width:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputCommentStyles:{
    flexDirection: 'row', 
    borderWidth: 0.5, 
    borderColor: 'grey', 
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10
 },
});
const mapStateToProps = state => {
  return {
    student_id: state.accountReducer.username,
    name: state.accountReducer.name,
    image: state.accountReducer.image,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(chat)
