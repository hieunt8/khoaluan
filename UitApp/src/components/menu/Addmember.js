import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
// import emails from './Listuser';
import { connect } from 'react-redux';
import { responseCreategroup } from './../../actions/action';
const { width } = Dimensions.get('window');
import callApi from '../../api/ApiCaller';
import randomKey from '../../api/RandomKey'
import * as link from '../../api/ApiLink';
import ratchetTree from './RatchetTrees';
import { RSA } from 'react-native-rsa-native';


const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { userSchema, GroupSchema, listuserSchema } from '../../models/Realm'
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema], encryptionKey: DEFAULT_KEY });


const KEYS_TO_FILTERS = ['mssv', 'subject'];

class Addmember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      listMssv: [this.props.navigation.state.params.Sender],
      emails: []
    }
  }

  componentDidMount() {
    callApi(link.getlistuser, 'GET', null).then(res => {
      this.setState({ emails: res.data })
    })
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  selectMember = (item) => {
    if (!this.state.listMssv.includes(item.mssv))
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

  saveToDatabase = (info) => {
    try {
      realm.write(() => {
        let newgroup = realm.create('group', {
          groupName: this.props.navigation.state.params.title,
          listMssv: [this.props.navigation.state.params.Sender],
          infolistMssv: [],
          version: 0,
          shareKey: randomKey(32),
          treeInfo: '',
        });
        newgroup.infolistMssv.push(info);
      });
    }
    catch (error) {
      console.log("saveToDatabase Addmember.js", error)
    }
  };

  createGroup = () => {
    let listMssvString = this.state.listMssv;
    let tree = new ratchetTree();
    let info = this.getinfoListMSSV();
    tree.addNode(info[0], 1);
    this.saveToDatabase(info[0]);
    sender = {senderName: this.props.navigation.state.params.Sender, senderInfo: info[0]}
    const data = {
      groupName: this.props.navigation.state.params.title,
      sender: sender,
      listMssv: listMssvString.slice(1),
      tree: tree,
      info: info.slice(1)
    };
    this.props.navigation.navigate('GroupAddLoading', data); 
  }
  onDeleteItem = (index) => {
    if (index) {
      let newTaskList = this.state.listMssv.filter((item, i) => i != index);
      this.setState({ listMssv: newTaskList });
    }
  }
  ShowSelectMember() {
    let members = [];
    this.state.listMssv.map((item, index) => {
      members.push(
        <View key={index}>
          <Image
            source={require('../../../assets/logo/UIT.png')}
            style={{ width: 40, height: 40, marginLeft: 5, marginRight: 5, borderRadius: 100 }} />
          <TouchableOpacity style={{ marginTop: -55, marginLeft: 40 }}
            onPress={() => this.onDeleteItem(index)}>
            <Text>{`❌`}</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 50, fontSize: 9, color: 'grey', paddingLeft: 5 }}>{item}</Text>
        </View>
      );
    });
    return members;
  }
  render() {
    const filteredEmails = this.state.emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, alignItems: 'center' }}>
          <View style={{ paddingTop: -5 }}>
            <Text>Add members</Text>
          </View>
        </View>
        <View style={styles.AddImgStyles}>
          <View style={styles.ImgStyles}>
            {this.ShowSelectMember()}
          </View>
        </View>
        <SearchInput
          onChangeText={(term) => { this.searchUpdated(term) }}
          style={styles.searchInput}
          placeholder="Type a message to search"
        />
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
          <TouchableOpacity onPress={this.createGroup} >
            <Text style={{ marginHorizontal: 10, color: 'blue' }}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Addmember)

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
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 130,
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
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    marginTop: 20
  },
  ImgStyles: {
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingTop: 20,
  },
});