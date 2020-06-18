import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { responseCreategroup } from '../actions/action';
const { width } = Dimensions.get('window');
import ratchetTree from '../components/menu/RatchetTrees';

const Realm = require('realm');
import DEFAULT_KEY from '../api/Config'
import { userSchema, GroupSchema, listuserSchema, TreeSchema } from '../models/Realm'
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema, TreeSchema], encryptionKey: DEFAULT_KEY });


class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'Creating Group!',
      listMssv: this.props.navigation.state.params.listMssv,
      groupName: this.props.navigation.state.params.groupName,
      infolistMssv: this.props.navigation.state.params.info,
      checkFinished: true
    }
  }

  _GetAsync = () => {
    try {
      const allGroup = realm.objects('group');
      let group = allGroup.filtered(`groupName = "${this.state.groupName}"`);
      if (group[0])
        return group[0];
      else
        console.log("_GetAsync GroupLoading.js not found group name");
    } catch (error) {
      console.log("_GetAsync GroupLoading.js", error)
    }
  };
  _SaveAsync = (newtree_serialize) => {
    try {
      const allGroup = realm.objects('tree');
      let group = allGroup.filtered(`groupName = "${this.state.groupName}"`);
      if (group[0]) {
        try {
          realm.write(() => {
            group[0].treeinfo = newtree_serialize;
          });
        } catch (erro) {
          console.log("_SaveAsync found tree info GroupLoading.js", erro)
        }
      }
      else {
        try {
          realm.write(() => {
            realm.create('tree', {
              groupName: this.state.groupName,
              treeinfo: newtree_serialize,
            });
          });
        }
        catch (error) {
          console.log("_SaveAsync not found tree info GroupLoading.js", error)
        }
      }
      setTimeout(() => {
        this.setState({
          info: 'Finished!',
          checkFinished: true
        });
      }, 1000);
    } catch (error) {
      console.log("_SaveAsync GroupLoading.js", error)
    }
  };
  async componentDidUpdate() {
    setTimeout(() => {
      if (this.state.checkFinished === true) {
        setTimeout(() => {
          this.props.navigation.navigate('Menu');
        }, 500);
      }
    }, 1000);
  }
  componentDidMount() {
    const data = { groupName: this.state.groupName, listMssv: this.state.listMssv.toString() };
    this.props.sendCreategroup(data);
    let group = this._GetAsync();
    let tree = this.props.navigation.state.params.tree;
    this.setState({ info: "Building tree!!!" })
    let newtree = this.buildTree(group, tree);
    this._SaveAsync(newtree.serialize());
  }

  buildGroup = (mssv, info, group) => {
    let currentGroup = group;
    try {
      realm.write(() => {
        currentGroup.listMssv.push(mssv);
        currentGroup.version = currentGroup.version + 1;
        currentGroup.infolistMssv.push(info);
      });
    } catch (erro) {
      console.log("buildGroup GroupLoading.js", erro)
    }
    return currentGroup;
  }
  buildTree = (group, tree) => {
    for (var i = 1; i < this.state.listMssv.length; i++) {
      this.setState({
        info: `Building tree!\nAdd user ${this.state.listMssv[i]}`,
      });
      tree.addNode(this.state.infolistMssv[i], Math.ceil(Math.log2(group.listMssv.length + 1)));
      group = this.buildGroup(this.state.listMssv[i], this.state.infolistMssv[i], group);
    }
    return tree;
  }
  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{ width: 130, height: 155 }}
          source={require('../../assets/logo/UIT.png')} />
        <View style={styles.indicator}>
          <ActivityIndicator animating={true} size="small" color={'blue'} />
        </View>
        <Text style={{ fontSize: 10, color: '#0033CC', textAlign: "center" }} >{this.state.info}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  indicator: {
    paddingTop: width / 7.2,
    justifyContent: "center",
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    sendCreategroup: (data) => {
      dispatch(responseCreategroup(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);