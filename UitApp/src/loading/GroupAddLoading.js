import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { responseCreategroup } from '../actions/action';
const { width } = Dimensions.get('window');
import ratchetTree from '../components/menu/RatchetTrees';
import { RSA } from 'react-native-rsa-native';
import { AesEnc, AesDec } from '../api/ApiAES'
import { generateRSAKey, encryptRSAKey } from '../api/ApiRSA'

const Realm = require('realm');
import DEFAULT_KEY from '../api/Config'
import { userSchema, GroupSchema, listuserSchema } from '../models/Realm'
import { random } from 'faker';
import randomKey from '../api/RandomKey';
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema], encryptionKey: DEFAULT_KEY });


class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'Creating Group!',
      listMssv: this.props.navigation.state.params.listMssv,
      groupName: this.props.navigation.state.params.groupName,
      infolistMssv: this.props.navigation.state.params.info,
      sender: this.props.navigation.state.params.sender,
      checkFinished: false
    }
  }

  _getGroupDatabase = () => {
    try {
      const allGroup = realm.objects('group');
      let group = allGroup.filtered(`groupName = "${this.state.groupName}"`);
      if (group[0])
        return group[0];
      else
        console.log("_getGroupDatabase GroupAddLoading.js not found group name");
    } catch (error) {
      console.log("_getGroupDatabase GroupAddLoading.js", error)
    }
  };

  _SaveGroupDatabase = (mssv, info, group, newtree_serialize) => {
    let currentGroup = group;
    try {
      realm.write(() => {
        currentGroup.listMssv.push(mssv);
        currentGroup.version = currentGroup.version + 1;
        currentGroup.infolistMssv.push(info);
        currentGroup.treeInfo = newtree_serialize;
      });
    } catch (erro) {
      console.log("_SaveGroupDatabase GroupAddLoading.js", erro)
    }
    return currentGroup;
  }
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
    setTimeout(() => {
      let group = this._getGroupDatabase();
      let tree = this.props.navigation.state.params.tree;
      this.setState({ info: "Building tree!!!" })
      this.buildTree(group, tree);
    }, 500);
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  buildTree = async (group, tree) => {
    for (var i = 0; i < this.state.listMssv.length; i++) {
      let keys = await generateRSAKey(randomKey(32), 512);
      let keyPair = {
        publicKey: keys.public,
        privateKey: keys.private
      };
      const data = {
        groupName: this.state.groupName,
        Status: "ADD",
        listMssv: group.listMssv.toString(),
        version: group.version + 1,
        senderMssv: this.state.sender.senderMssv,
        senderInfo: this.state.sender.senderInfo,
        userAddRemove: this.state.listMssv[i],
        useraddRemoveInfo: this.state.infolistMssv[i],
        keyPair: AesEnc(JSON.stringify(keyPair), group.shareKey),
        treeInfo: tree.serialize()
      };
      this.setState({ info: `Building tree!\nAdd user ${this.state.listMssv[i]}`, });
      tree.addNode(
        this.state.infolistMssv[i],
        Math.ceil(Math.log2(group.listMssv.length + 1)),
        keyPair
      );
      group = this._SaveGroupDatabase(
        this.state.listMssv[i],
        this.state.infolistMssv[i],
        group,
        tree.serialize()
      );
      // data.treeInfo = await encryptRSAKey(tree.serialize(), this.state.infolistMssv[i].publicKey)
      data.shareKey = await encryptRSAKey(group.shareKey, this.state.infolistMssv[i].publicKey);
      this.props.sendCreategroup(data);
      await this.delay(500);
    }
    setTimeout(() => {
      this.setState({
        info: 'Finished!',
        checkFinished: true
      });
    }, 1000);

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