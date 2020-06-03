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

const { width} = Dimensions.get('window');
class listFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: [],
    };
  }
  
  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      // <ScrollView>
      <Text style={{padding: 5}}>{chatMessage}</Text>
      // </ScrollView>
    ));
    return (
     <View style={styles.container}>
         <View style={styles.header}>       
        <Text style={{fontSize: 18, fontStyle:'bold'}}>Danh sách bạn bè tròng phòng</Text>
        </View>
     <View style={styles.listFriend}>
        <ScrollView >
         {chatMessages}
        </ScrollView>
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
  header: {width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3},
  
  listFriend:{flex: 1,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: "white",
    marginHorizontal: 5,
    borderColor: 'grey',
    marginVertical: 5
}
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


export default connect(mapStateToProps, mapDispatchToProps)(listFriend)

