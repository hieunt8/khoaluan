import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView  } from 'react-native';
import ratchetTree from '../../components/menu/RatchetTrees';
import JSONTree from 'react-native-json-tree'


const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import { TreeSchema } from '../../models/Realm'
const realm = new Realm({ schema: [TreeSchema], encryptionKey: DEFAULT_KEY });

class viewTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: new ratchetTree(),
      treeinfo: {},
      groupName: this.props.navigation.state.params.groupName,
    }
  }
  componentDidMount() {
    this.getTree();
  }


  getTree = () => {
    try {
      const allGroup = realm.objects('tree');
      let group = allGroup.filtered(`groupName = "${this.state.groupName}"`);
      if (group[0]) {
        let tree2 = new ratchetTree();
        tree2 = tree2.deserialize(group[0].treeinfo);
        this.setState({
          tree: tree2,
          treeinfo: group[0].treeinfo,
        });
        console.log(tree2);
      }
      else {
        console.log("getTree not found tree info viewTree.js", error)
      }
    } catch (error) {
      console.log("getTree viewTree.js", error)
    }
  }


  render() {
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
    return (
      <View style={styles.container}>
      <ScrollView>
        <JSONTree data={this.state.tree} theme={theme} invertTheme={false} hideRoot/>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { margin: 10 },
});

export default viewTree;


























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