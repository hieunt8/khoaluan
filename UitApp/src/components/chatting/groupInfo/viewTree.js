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

class viewTree extends Component {
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
      infolistMssv: null
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
        // console.log(group[0]);
        let tree2 = new ratchetTree();
        tree2 = tree2.deserialize(group[0].treeInfo);
        this.setState({
          tree: tree2,
        });
        // console.log(group[0].infolistMssv);
      }
      else {
        console.log("getTree not found tree info viewTree.js", error)
      }
    } catch (error) {
      console.log("getTree viewTree.js", error)
    }
  }


  actionclickviewTree = () => {
    // alert(this.state.value)
    // console.log(this.state.viewTree)
    if (this.state.tree == '' || this.state.tree == null) {
      return <Text>Ko co du lieu</Text>;
    }
    return (
      <View>
        <ScrollView>
          <ScrollView horizontal>
            <JSONTree data={this.state.tree} theme={theme} invertTheme={true} hideRoot />
          </ScrollView>
        </ScrollView>
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

              <TouchableOpacity onPress={
                () => { this.props.navigation.navigate('viewgroupInfo', { groupName: this.props.navigation.state.params.groupName }); }
              }>
                <Icon name="backspace" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View >
          <Text>View Tree</Text>
          <TouchableOpacity onPress={
            () => { }
          }>
            <Icon name="info" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Divider />
        <ScrollView>
          {this.actionclickviewTree()}
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
    flex: 1
  },
  styleText: {
    // marginVertical: 10,
    // justifyContent: 'space-between'
  },
  styleeTouch: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: { margin: 10 },
});

export default viewTree;