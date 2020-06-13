import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList, BackHandler, Alert } from 'react-native';
import { Menu, Divider, Provider, Portal, Dialog, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { datas } from './titleButton';
import { responseEschedule, getDataFromCreategroup, responseLogin } from '../../actions/action';
// import CreateGroup from './Addmember'
import { Icon, SearchBar } from 'react-native-elements';
const { width } = Dimensions.get('window');
let checkName = "The name should not be empty!";

const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { userSchema } from '../../models/Realm'
const realm = new Realm({ schema: [userSchema], encryptionKey: DEFAULT_KEY });


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
    const creategroupReducers = this.props.creategroupReducers;
    // alert(getDeadline);

    const datas = Object.values(creategroupReducers);
    // alert(datas[1].title)
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
              const user = realm.objects('user');
              realm.delete(user);
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

  setClickTransfer(title1, mssv1, namest) {
    let flag = false;
    var data = this.xlarr();
    // alert(title1);
    for (let i = 0; i < data.length; i++) {
      if (data[i].title === title1) {
        if (data[i].mssv && data[i].mssv.includes(mssv1)) {
          // console.log(data[i])
          this.props.navigation.navigate('NewChatting', {
            room: data[i].title,
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
                        name="menu"
                        color='black'
                        size={20} />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item onPress={() => { alert(1) }} title="Item 1" />
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
                name="add"
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
                      source={{ uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/62238278_2331875950424004_4230353030609895424_n.jpg?_nc_cat=109&_nc_sid=8024bb&_nc_ohc=dKhGXgTISkcAX--zEJt&_nc_ht=scontent.fsgn5-6.fna&oh=e80a15e7bd91b820cb9825e0939b508a&oe=5EEAD72A' }} />
                    <View>
                      <Text style={{ marginTop: 2, paddingLeft: 5 }}>{item.groupName}</Text>
                      <Text style={{ marginTop: -3, color: 'grey', fontSize: 11, paddingLeft: 5 }}>{item.listMssv}</Text>
                    </View>
                  </View>
                  <Text style={{ marginTop: -3, color: 'grey', fontSize: 11, marginTop: 10 }}>4:30PM</Text>
                </View>
                <Divider />
              </TouchableOpacity>)}
            keyExtractor={item => item._id.toString()} />
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
  }
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
    getEschedule: (data) => {
      dispatch(responseEschedule(data));
    },
    getAccount: (data) => {
      dispatch(responseLogin(data));
    },
    getData: () => {
      dispatch(getDataFromCreategroup());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(menu)