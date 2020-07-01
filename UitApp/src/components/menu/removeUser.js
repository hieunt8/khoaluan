import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, BackHandler, Dimensions, Image } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
// import emails from './Listuser';
import { Menu, Divider, Provider, Portal, Dialog, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { responseCreategroup } from './../../actions/action';
const { width } = Dimensions.get('window');
import ratchetTree from './RatchetTrees';
import groupRemove from '../../api/ApiGroupRemove'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GroupRemoveLoading from '../../loading/GroupRemoveLoading'


const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { userSchema, GroupSchema, listuserSchema } from '../../models/Realm'
// import { Divider } from 'react-native-elements';
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema], encryptionKey: DEFAULT_KEY });


const KEYS_TO_FILTERS = ['mssv', 'subject'];

class removeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      listMssv: [],
      emails: [],
      keys: null,
      groupName: this.props.navigation.state.params.groupName,
      visiblePopup: false,
    }
  }

  getTree = () => {
    try {
      const allGroup = realm.objects('group');
      let group = allGroup.filtered(`groupName = "${this.state.groupName}"`);
      if (group[0]) {
        this.setState({
          emails: group[0].infolistMssv
        });
      }

      else {
        console.log("getTree not found tree info removeUser.js", error)
      }
    } catch (error) {
      console.log("getTree removeUser.js", error)
    }
  }
  backAction = () => {
    this.props.navigation.navigate('Menu');
    return true;
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    this.getTree();
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  selectMember = (item) => {
    if (!this.state.listMssv.includes(item.mssv) && this.state.listMssv.length != this.state.emails.length - 1)
      this.setState({
        listMssv: this.state.listMssv.concat([item.mssv])
      })
  }

  getinfoListMSSV = () => {
    let info = [];
    for (const xx of this.state.listMssv)
      info.push(this.state.emails.find(element => element.mssv === xx));
    return info;
  }

  removeGroup = () => {
    this.setState({ visiblePopup: true });
  }
  onDeleteItem = (index) => {
    let newTaskList = this.state.listMssv.filter((item, i) => i != index);
    this.setState({ listMssv: newTaskList });

  }
  ShowSelectMember() {
    let members = [];
    this.state.listMssv.map((item, index) => {
      members.push(
        <View key={index}>
          <TouchableOpacity
            onPress={() => this.onDeleteItem(index)}>
            <Image
              source={require('../../../assets/logo/UIT.png')}
              style={{ width: 40, height: 40, marginLeft: 5, marginRight: 5, borderRadius: 100 }} />
            <Text style={{ marginTop: -55, marginLeft: 40 }}>{`❌`}</Text>
            <Text style={{ marginTop: 50, fontSize: 9, color: 'grey', paddingLeft: 5 }}>{item}</Text>
          </TouchableOpacity>
        </View>
      );
    });
    return members;
  }
  render() {
    const filteredEmails = this.state.emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <Provider style={styles.backgroud}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', paddingVertical: 10 }}>
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
            <Text>Remove user</Text>
            <TouchableOpacity onPress={
              () => { }
            }>
              <Icon name="info" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.AddImgStyles}>
            <View style={styles.ImgStyles}>
              {this.ShowSelectMember()}
            </View>
          </View>
          <Divider />
          <SearchInput
            onChangeText={(term) => { this.searchUpdated(term) }}
            style={styles.searchInput}
            placeholder="Type a message to search"
          />
          <View>
            <Portal>
              <Dialog visible={this.state.visiblePopup} onDismiss={() => this.setState({ visiblePopup: false })}>
              {/* <Dialog visible={this.state.visiblePopup} > */}
                {/* <Dialog.Title>Alert</Dialog.Title> */}
                <ScrollView style={{
                  paddingTop: 20,
                  paddingBottom: 20
                }}>
                  <GroupRemoveLoading />
                </ScrollView >
                {/* <Dialog.Actions>
              
            </Dialog.Actions> */}
              </Dialog>
            </Portal>
          </View>
          <ScrollView>
            {filteredEmails.map(email => {
              return (
                <TouchableOpacity onPress={() => {
                  this.selectMember(email)
                }} key={email.mssv} style={styles.emailItem}>
                  <View>
                    <Text>{email.mssv}</Text>
                    <Text style={styles.emailSubject}>{email.name}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, justifyContent: 'flex-end', paddingVertical: 10 }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Menu'); }}>
              <Text style={{ marginHorizontal: 10, color: 'blue' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.removeGroup} >
              <Text style={{ marginHorizontal: 10, color: 'blue' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Provider>
    );
  }

}

const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getCreategroup: (data) => {
      dispatch(responseCreategroup(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(removeUser)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  AddImgStyles: {
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginVertical: 10
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    borderColor: '#CCC',
    borderWidth: 1
  },
  ImgStyles: {
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
});