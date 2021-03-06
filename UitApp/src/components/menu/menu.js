import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions, TouchableOpacity, FlatList, BackHandler, Alert } from 'react-native';
import { Menu, Divider, Provider, Portal, Dialog, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { datas } from './titleButton';
import { getDataFromCreategroup } from '../../actions/action';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('window');
let checkName = "The name should not be empty!";
import groupLoading from '../../api/ApiGroupLoading';
import * as link from '../../api/ApiLink';
import ApiGroupRemove from '../../api/ApiGroupRemove'
var CryptoJS = require("crypto-js");
import { generateRSAKey, encryptRSAKey, decryptRSAKey } from '../../api/ApiRSA'

const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema } from '../../models/Realm'
import groupUpdate from '../../api/ApiGroupUpdate';
import randomKey from '../../api/RandomKey';
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema], encryptionKey: DEFAULT_KEY });


class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: datas,
      visible: false,
      search: '',
      visiblePopup: false,
      groupName: '',
      mssv: "",
      // checkName: false
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };
  _openMenu = () => this.setState({ visible: true });
  _closeMenu = () => this.setState({ visible: false });

  _openPopup = () => this.setState({ visiblePopup: true });
  _closePopup = () => {
    if (checkName == '') {
      this.setState({ visiblePopup: false })
      this.props.navigation.navigate('Addmember', { title: this.state.groupName, Sender: this.state.mssv })
    }
    else {
      // this.setState({
      //   checkName: "Vui lòng nhập tên nhóm."
      // })
    }
  };

  // setClickTranslate = () => {
  //   this.props.navigation.navigate('NewChatting');
  // }

  backAction = () => {
    Alert.alert("Thông báo!", "Bạn có muốn thoát?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  componentDidMount() {
    this._GetAsync();
    setInterval(() => {
      groupLoading(this.state.mssv);
      this.props.getData();
    }, 5000);

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  _GetAsync = async () => {
    try {
      const user = realm.objects('user');
      const _mssv = user[0].mssv;
      if (_mssv !== null) {
        this.setState({
          mssv: _mssv
        })
      }
    } catch (error) { }
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }


  handlegroupName = (text) => {
    // console.log(text)
    this.setState({ groupName: text });
    if (text == "") {
      checkName = "The name should not be empty!"
    } else {
      checkName = '';
    }
  }
  xlarr = () => {
    const allGroup = realm.objects('listGroup');
    // const creategroupReducers = this.props.creategroupReducers;
    let datas = null;
    if (allGroup[0])
      datas = allGroup[0].info;
    else
      datas = [];
    // const datas = Object.values(creategroupReducers);
    if (datas.length != 0) {
      return datas;
    }
  }

  logoutAction = () => {
    Alert.alert("Warning!", "Do you want to log out?\nAll your data will be removed!", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "YES", onPress: () => {
          try {
            realm.write(() => {
              realm.deleteAll();
            });
            setTimeout(() => {
              this.props.navigation.navigate('Login');
            }, 500);
          }
          catch (erro) {
            console.log("Logout menu.js", erro)
          }
        }
      }
    ]);
  };


  Logout = () => {
    this.logoutAction();
  }

  TestUppdate = async () => {
    var t0 = new Date().getTime();
    let MattsRSAkey = generateRSAKey("aaaaaaaaaaaaaaaaaaaaaaaaaaaa", 512);
    var t1 = new Date().getTime();
    var PlainText = "randomKey(120)";
    // console.log(MattsRSAkey);
    var EncryptionResult = encryptRSAKey(PlainText, MattsRSAkey.private);
    console.log(EncryptionResult);
    var t2 = new Date().getTime();
    var DecryptionResult = decryptRSAKey(EncryptionResult, MattsRSAkey.public);
    console.log(DecryptionResult);
    var t3 = new Date().getTime();
    console.log("generateRSAKey: ", ((t1 - t0) * 0.001).toFixed(3));
    console.log("encryptRSAKey: ", ((t2 - t1) * 0.001).toFixed(3));
    console.log("decryptRSAKey: ", ((t3 - t2) * 0.001).toFixed(3));
    console.log("Sum: ", ((t3 - t0) * 0.001).toFixed(3));
    this._closeMenu()
  }

  setClickTransfer(title1, mssv1, namest) {
    let flag = false;
    var data = this.xlarr();
    // alert(title1);
    for (let i = 0; i < data.length; i++) {
      if (data[i].groupName === title1) {
        // if (data[i].listMssv && data[i].listMssv.includes(mssv1)) {
        if (data[i].listMssv) {
          // console.log(data[i])
          this.props.navigation.navigate('NewChatting', {
            room: data[i].groupName,
            name: mssv1
          });
          flag = true;
        }
      }
    }
    if (flag === false)
      alert("Bạn không được phép tham gia vào group này!");
    //   // if(data[index].mssv && data[index].mssv.includes(mssv1)){
    //     this.props.navigation.navigate('chat');

    // }
  }
  render() {
    const { search } = this.state;
    const datas = this.xlarr();

    return (
      <Provider style={styles.backgroud}>
        <View>
          <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, justifyContent: 'space-between', paddingVertical: 10 }}>
            <View style={{ paddingTop: -5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <Menu
                  visible={this.state.visible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <TouchableOpacity onPress={this._openMenu}>
                      <Icon
                        name='menu'
                        type='evilicon'
                        color='black'
                        size={20} />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item onPress={this.TestUppdate} title="Item 1" />
                  <Menu.Item onPress={() => { }} title="Item 2" />
                  <Divider />
                  <Menu.Item onPress={this.Logout} title="Logout" />
                </Menu>
              </View>
            </View>
            <Text>Messenger</Text>
            <TouchableOpacity onPress={
              this._openPopup
            }>
              <Icon
                name="group-add"
                color='black'
                size={20} />
            </TouchableOpacity>
            <Portal>
              <Dialog
                visible={this.state.visiblePopup}
                onDismiss={() => this.setState({ visiblePopup: false })}>
                <Dialog.Title>Group Name</Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    style={{ backgroundColor: 'white', color: 'black' }}
                    value={this.state.groupName}
                    onChangeText={this.handlegroupName}
                  />
                  <Text style={{ color: 'red', fontSize: 13 }}>{checkName}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  {/* <Button onPress={this._closePopup}>Next</Button> */}
                  <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, justifyContent: 'flex-end', paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        visiblePopup: false
                      })
                    }}>
                      <Text style={{ marginHorizontal: 10, color: 'blue' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._closePopup} >
                      <Text style={{ marginHorizontal: 10, color: 'blue' }}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>

          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search} />

          <FlatList data={datas}
            horizontal={false}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                this.setClickTransfer(item.groupName, this.state.mssv, this.props.name)
              }}>
                <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 10, marginBottom: 15, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={{ width: 40, height: 40, borderRadius: 100, marginRight: 5 }}
                      source={require('../../../assets/logo/UIT.png')} />
                    <View>
                      <Text style={{ marginTop: 2, paddingLeft: 5 }}>{item.groupName}</Text>
                      <Text style={{ marginTop: 0, color: 'grey', fontSize: 11, paddingLeft: 5 }}>16520395-1652054</Text>
                    </View>
                  </View>
                  {/* <Text style={{ marginTop: -3, color: 'grey', fontSize: 11, marginTop: 10 }}>4:30PM</Text> */}
                </View>
                <Divider />
              </TouchableOpacity>)}
            keyExtractor={item => item._id.toString()} />
          {/* <TouchableOpacity style={styles.LoginStyles}
            onPress={this.TestUppdate}>
            <Text style={{
              fontWeight: "bold",
              color: 'white',
              fontSize: 20,
            }}>Test</Text>
          </TouchableOpacity> */}
        </View>
      </Provider>
    );
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
  },
  LoginStyles: {
    height: 40,
    backgroundColor: '#3399FF',
    borderRadius: 7,
    marginTop: 10,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
})

const mapStateToProps = state => {
  return {
    mssv: state.accountReducer.username,
    // password: state.accountReducer.password,
    creategroupReducers: state.creategroupReducers,
    name: state.accountReducer.name,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getData: () => {
      dispatch(getDataFromCreategroup());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(menu)