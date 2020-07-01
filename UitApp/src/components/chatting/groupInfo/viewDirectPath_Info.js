import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import ratchetTree from '../../../components/menu/RatchetTrees';
import JSONTree from 'react-native-json-tree'
import { Provider, Divider } from 'react-native-paper';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Realm = require('realm');
import DEFAULT_KEY from '../../../api/Config'
import { GroupSchema, listuserSchema, DirectPathSchema, listDirectPathInfoSchema } from '../../../models/Realm'
const realm = new Realm({ schema: [GroupSchema, listuserSchema, DirectPathSchema, listDirectPathInfoSchema], encryptionKey: DEFAULT_KEY });

class viewDirectPathInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      groupName: this.props.navigation.state.params.groupName,
     
    }
  }

  componentDidMount() {
    this.getTree();
  }

  getTree = () => {
    try {
      const allGroup = realm.objects('listDirectPath');
      let group = allGroup.filtered(`groupName = "${this.state.groupName}"`);
      if (group[0]) {
        this.setState({
          listdirectPath: group[0].listNodePathKey,
        });
        // console.log(group[0].listNodePathKey);
      }
      else {
        console.log("getTree not found DirectPath info viewDirectPath.js", error)
      }
    } catch (error) {
      console.log("getTree  DirectPath viewDirectPath.js", error)
    }
  }

  actionclickviewTree = () => {
    // alert(this.state.value)
    if (this.state.viewTree == false) {
      return null;
    }
    return (
      <View style={{ marginLeft: 17 }}>
        <ScrollView>
          <ScrollView horizontal>
            <JSONTree data={this.state.tree} theme={theme} invertTheme={true} hideRoot />
          </ScrollView>
        </ScrollView>
      </View>
    )
  }
  
  clickviewDirectPathInfo = async (nameNode) => {
    await this.setState({
      nodeInfo: !this.state.nodeInfo,
      nameNode: nameNode
    })
    // console.log("userInfo", this.state.userInfo)
  }
  actionclickviewDirectPathInfo = (item) => {
    // console.log("@@@@@@@@@userInfo", this.state.userInfo)
    // if (this.state.nodeInfo == false) {
    //   return null;
    // }
    if (this.state.nameNode != item.nameNode) {
      return null;
    }
    // console.log("222222222222222",  JSON.parse(item));
    let data = {
      nameNode: item.nameNode,
      pathSecret: item.pathSecret,
      nodeSecret: item.nodeSecret,
      publicKey: item.publicKey,
      privateKey: item.privateKey,
    }
    return (
      // <Text>{item.name}</Text>
      <View style={{ marginLeft: 17 }}>
        {/* <Text>{item}</Text> */}
        <ScrollView>
          <ScrollView horizontal>
            <JSONTree data={data} theme={theme} invertTheme={true} hideRoot />
          </ScrollView>
        </ScrollView>
      </View>
    )
  }
  backAction = () => {
    this.props.navigation.navigate('viewgroupInfo', {groupName: this.props.navigation.state.params.groupName});
  }
  clickshowDirectPathInfo = () => {
    this.setState({ directPath: !this.state.directPath })
  }
  actionclickshowDirectPathInfo = () => {
    if (this.state.directPath == false) {
      return null;
    }
    return (
      <View style={{ marginLeft: 17 }}>
        <FlatList
          data={this.state.listdirectPath}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity style={styles.styleeTouch} onPress={() => { this.clickviewDirectPathInfo(item.nameNode) }}>
                <Text> <Icon name="arrow-right-bold" size={20} color="black" /> {item.nameNode}</Text>
                <Icon name="chevron-right" size={20} color="grey"/>
              </TouchableOpacity>
              <Divider />
              {this.actionclickviewDirectPathInfo(item)}
            </View>
          )}
          keyExtractor={item => item.nameNode.toString()}
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

              <TouchableOpacity onPress={this.backAction}>
                <Icon name="backspace" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View >
          <Text>view Direct</Text>
          <TouchableOpacity onPress={
            () => { }
          }>
            <Icon name="info" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Divider />
        <ScrollView>
          <View style={styles.container}>
            {this.actionclickshowDirectPathInfo()}
          </View>
        </ScrollView>
      </Provider>
    );
  }
}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxHeight: '60%'
  },
  styleeTouch: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: { margin: 10 },
});

export default viewDirectPathInfo;