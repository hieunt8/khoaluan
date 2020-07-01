import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, BackHandler, TouchableOpacity, Dimensions, Image } from 'react-native';
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
import { AesEnc, AesDec } from '../../api/ApiAES'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { userSchema, GroupSchema, listuserSchema } from '../../models/Realm'
import { Divider } from 'react-native-elements';
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema], encryptionKey: DEFAULT_KEY });


const KEYS_TO_FILTERS = ['mssv', 'subject'];

class Addmember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      listMssv: [this.props.navigation.state.params.Sender],
      emails: [],
      keys: null
    }
  }
  backAction = () => {
    // this.socket.emit('Disco', {});
    this.props.navigation.navigate('Menu');
    console.log('disconnect')
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
    this.createKey();
    callApi(link.getlistuser, 'GET', null).then(res => {
      if (res) {
        this.setState({ emails: res.data })
      }
      else {
        console.log("Addmember.js network error");
      }
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
        // console.log("saveToDatabase Addmember.js create group ", newgroup.groupName);
      });
    }
    catch (error) {
      console.log("saveToDatabase Addmember.js", error)
    }
  };
  createKey = () => {
    RSA.generateKeys(2048)
      .then(keys => {
        this.setState({ keys: keys });
      })
  }
  createGroup = () => {
    let listMssvString = this.state.listMssv;
    let tree = new ratchetTree();
    let info = this.getinfoListMSSV();

    tree.addNode(info[0], 1, {
      publicKey: this.state.keys.public,
      privateKey: this.state.keys.private
    });
    this.saveToDatabase(info[0]);
    let sender = { senderMssv: this.props.navigation.state.params.Sender, senderInfo: info[0] }
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
          <Text>Add member</Text>
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