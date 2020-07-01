import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import ratchetTree from '../../../components/menu/RatchetTrees';
import JSONTree from 'react-native-json-tree'
import { Provider, Divider } from 'react-native-paper';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
const Realm = require('realm');
import DEFAULT_KEY from '../../../api/Config'
import { GroupSchema, listuserSchema, DirectPathSchema, listDirectPathInfoSchema } from '../../../models/Realm'
const realm = new Realm({ schema: [GroupSchema, listuserSchema, DirectPathSchema, listDirectPathInfoSchema], encryptionKey: DEFAULT_KEY });

class viewUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: new ratchetTree(),
      treeInfo: {},
      group: null,
      groupName: this.props.navigation.state.params.groupName,
      viewTree: false,
      showInfo: false,
      userInfo: false,
      viewGroup: false,
      directPath: false,
      nodeInfo: false,
      listdirectPath: null,
      userMssv: null,
      nameNode: null,
      infolistMssv: ''
    }
  }

  componentDidMount() {
    this.getTree();
  }



  getTree = () => {
    try {
      const allGroup = realm.objects('group');
      let group = allGroup.filtered(`groupName = "${this.state.groupName}"`);
      if (group[0]) {
        this.setState({
          infolistMssv: group[0].infolistMssv
        });
      }
      else {
        console.log("getTree not found tree info viewUserInfo.js", error)
      }
    } catch (error) {
      console.log("getTree viewUserInfo.js", error)
    }
  }
  actionclickviewuserInfo = (item) => {
    if (this.state.userMssv != item.mssv) {
      return null;
    }
    let data = {
      _id: item._id,
      mssv: item.mssv,
      name: item.name,
      publicKey: item.publicKey
    }
    return (
      <View>
        <ScrollView>
          <ScrollView horizontal>
            <JSONTree data={data} theme={theme} invertTheme={true} hideRoot />
          </ScrollView>
        </ScrollView>
      </View>
    )
  }
  clickviewuserInfo = async (mssv) => {
    await this.setState({
      userInfo: !this.state.userInfo,
      userMssv: mssv
    })
  }

  actionclickshowInfo = () => {
    return (
      <View >
        <FlatList
          data={this.state.infolistMssv}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.styleeTouch}
                onPress={() => { this.clickviewuserInfo(item.mssv) }}
              >
                <Text> <Feather name="user" size={20} color="black" />  {item.mssv}</Text>
                <Icon name="chevron-right" size={20} color="grey" />
              </TouchableOpacity>
              <Divider />
              {this.actionclickviewuserInfo(item)}
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
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

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('viewgroupInfo', { groupName: this.props.navigation.state.params.groupName }); }}>
                <Icon name="backspace" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View >
          <Text>View User Info</Text>
          <TouchableOpacity onPress={
            () => { }
          }>
            <Icon name="info" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Divider />
        <ScrollView>
          <View style={styles.container}>
            {this.actionclickshowInfo()}
          </View>
        </ScrollView>
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
const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633'
};

export default viewUserInfo;