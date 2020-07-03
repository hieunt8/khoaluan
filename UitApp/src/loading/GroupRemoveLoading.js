import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { responseCreategroup } from '../actions/action';
const { width } = Dimensions.get('window');
import ratchetTree from '../components/menu/RatchetTrees';
import { RSA } from 'react-native-rsa-native';
import { AesEnc, AesDec } from '../api/ApiAES'
import { generateRSAKey } from '../api/ApiRSA'
import groupRemove from '../api/ApiGroupRemove'

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
      info: 'Loading!',
      listMssv: this.props.listMssv,
      groupName: this.props.groupName,
      checkFinished: false
    }
  }

  async componentDidUpdate() {
    setTimeout(() => {
      if (this.state.checkFinished === true) {
        setTimeout(() => {
          this.props.navigation.navigate('Menu');
          // alert(1);
        }, 500);
      }
    }, 1000);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ info: "Rebuild Data!!!" })
      this.rebuildDatabase();
      // this.props.navigation.navigate('Menu');
    }, 500);
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  rebuildDatabase = async () => {
    for (let userName of this.state.listMssv) {
      let check = await groupRemove({
        groupName: this.state.groupName
      }, userName, true)
      if (check) {
        alert("error");
        break;
      }
    }
    setTimeout(() => {
      this.setState({
        info: 'Finished!',
        checkFinished: true
      });
    }, 1000);
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