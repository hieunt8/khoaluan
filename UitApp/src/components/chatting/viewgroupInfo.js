import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import ratchetTree from '../../components/menu/RatchetTrees';
import JSONTree from 'react-native-json-tree'
import { Provider, Divider } from 'react-native-paper';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { GroupSchema, listuserSchema } from '../../models/Realm'
const realm = new Realm({ schema: [GroupSchema, listuserSchema], encryptionKey: DEFAULT_KEY });

class viewgroupInfo extends Component {
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
      viewGroup:false,
      userMssv: null,
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
          treeInfo: group[0].treeInfo,
          infolistMssv: group[0].infolistMssv,
          group: group[0]
        });
        // console.log(tree2);
      }
      else {
        console.log("getTree not found tree info viewgroupInfo.js", error)
      }
    } catch (error) {
      console.log("getTree viewgroupInfo.js", error)
    }
  }

  clickviewTree = () => {
    this.setState({ viewTree: !this.state.viewTree })
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
  clickviewGroup = () => {
    this.setState({ viewGroup: !this.state.viewGroup })
  }
  actionclickviewGroup = () => {
    // alert(this.state.value)
    if (this.state.viewGroup == false) {
      return null;
    }
    let groupData = JSON.stringify(this.state.group);
    groupData = JSON.parse(groupData);
    groupData.treeInfo = JSON.parse(groupData.treeInfo);
    return (
      <View style={{ marginLeft: 17 }}>
        <ScrollView>
          <ScrollView horizontal>
            <JSONTree data={groupData} theme={theme} invertTheme={true} hideRoot />
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
    // console.log("userInfo", this.state.userInfo)
  }
  actionclickviewuserInfo = (item) => {
    // console.log("@@@@@@@@@userInfo", this.state.userInfo)
    if (this.state.userInfo == false) {
      return null;
    }
    if (this.state.userMssv != item.mssv) {
      return null;
    }
    // console.log("222222222222222",  JSON.parse(item));
    let data = {
      _id: item._id,
      mssv: item.mssv,
      name: item.name,
      publicKey: item.publicKey
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

  clickshowInfo = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }
  actionclickshowInfo = () => {
    if (this.state.showInfo == false) {
      return null;
    }
    return (
      <View style={{ marginLeft: 17 }}>
        <FlatList
          data={this.state.infolistMssv}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => { this.clickviewuserInfo(item.mssv) }}>
                <View>
                  <Text> <Icon name="arrow-right-bold" size={20} color="black" /> {item.mssv}</Text>
                </View>
              </TouchableOpacity>
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

              <TouchableOpacity onPress={this.backAction}>
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
            <TouchableOpacity onPress={() => this.clickviewTree()}>
              <Text><Icon name="arrow-right-bold" size={20} color="black" /> View Tree </Text>
            </TouchableOpacity>
            {this.actionclickviewTree()}
            <TouchableOpacity onPress={() => this.clickviewGroup()}>
              <Text><Icon name="arrow-right-bold" size={20} color="black" /> View Group</Text>
            </TouchableOpacity>
            {this.actionclickviewGroup()}
            <TouchableOpacity onPress={() => this.clickshowInfo()}>
              <Text><Icon name="arrow-right-bold" size={20} color="black" /> Show User Info</Text>
            </TouchableOpacity>
            {this.actionclickshowInfo()}
          </View>
        {/* </ScrollView> */}
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
    maxHeight: '60%'
  },
  title: { margin: 10 },
});

export default viewgroupInfo;


























// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
// import OrgChart from './builtTree/OrgChart';
// import NodeComponent from './builtTree/NodeComponent';


// const tree = {
//   nodes: [{
//     text: 'node 0',
//     nodes: [
//       {
//         text: 'node 1',
//         nodes: [{
//           text: 'node 2',  
//         }]
//       },
//       {
//         text: 'node 3',
//         nodes: [{
//           text: 'node 4',
//         }]
//       }
//     ]
//   }]
// };


// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <OrgChart tree={tree} nodeWidth={16} nodeHeight={5} floorHeight={4} nodeSpace={4} NodeComponent={NodeComponent}/>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });