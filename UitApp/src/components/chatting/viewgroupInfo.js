import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import ratchetTree from '../../components/menu/RatchetTrees';
import JSONTree from 'react-native-json-tree'
import { Provider, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { GroupSchema, listuserSchema, DirectPathSchema, listDirectPathInfoSchema } from '../../models/Realm'
const realm = new Realm({ schema: [GroupSchema, listuserSchema, DirectPathSchema, listDirectPathInfoSchema], encryptionKey: DEFAULT_KEY });

class viewgroupInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider style={styles.backgroud}>
        <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, justifyContent: 'space-between', paddingVertical: 10 }}>
          <View style={{ paddingTop: -5 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center'
              }}>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                <Icon name="backspace" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View >
          <Text>Group Information</Text>
          <TouchableOpacity onPress={
            () => { }
          }>
            <Icon name="info" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Divider />
        {/* <ScrollView> */}
        <View style={styles.container}>
          <TouchableOpacity style={styles.styleeTouch} onPress={
            () => {
              this.props.navigation.navigate('viewTree', {
                groupName: this.props.navigation.state.params.groupName
              });
            }
          }>
            <Text> <Entypo name="flow-tree" size={20} color="black" />  View Tree </Text>
            <Icon name="chevron-right" size={20} color="grey" />
          </TouchableOpacity>
          <Divider />

          <TouchableOpacity style={styles.styleeTouch} onPress={() => {
            this.props.navigation.navigate('viewGroup', { groupName: this.props.navigation.state.params.groupName });
          }}>
            <Text> <Icon name="account-group" size={20} color="black" />  View Group</Text>
            <Icon name="chevron-right" size={20} color="grey" />
          </TouchableOpacity>
          <Divider />

          <TouchableOpacity style={styles.styleeTouch} onPress={() => {
            this.props.navigation.navigate('viewUserInfo', { groupName: this.props.navigation.state.params.groupName })
          }}>
            <Text> <Feather name="users" size={20} color="black" />  View User Info </Text>
            <Icon name="chevron-right" size={20} color="grey" />
          </TouchableOpacity>
          <Divider />

          <TouchableOpacity style={styles.styleeTouch} onPress={() => {
            this.props.navigation.navigate('viewDirectPathInfo', { groupName: this.props.navigation.state.params.groupName })
          }}>
            <Text> <Entypo name="flow-branch" size={20} color="black" />  View Direct Path Info</Text>
            <Icon name="chevron-right" size={20} color="grey" />
          </TouchableOpacity>
          <Divider />

        </View>

      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleeTouch: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: { margin: 10 },
});

export default viewgroupInfo;