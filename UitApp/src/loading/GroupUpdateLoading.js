import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { responseCreategroup } from '../actions/action';
const { width } = Dimensions.get('window');
import { RSA } from 'react-native-rsa-native';
import groupUpdate from '../api/ApiGroupUpdate'
import oldGroupUpdate from '../api/ApiOldUpdateGroup'

const Realm = require('realm');
import DEFAULT_KEY from '../api/Config'
import { userSchema, GroupSchema, listuserSchema } from '../models/Realm'
import randomKey from '../api/RandomKey';
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema], encryptionKey: DEFAULT_KEY });


class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'Loading!',
      groupName: this.props.groupName,
      checkFinished: false,
      Method: this.props.Method,
      firstTime: '',
      secondTime: ''
    }
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
    // var t0 = new Date().getTime();
    // this.setState({ firstTime: t0 });
    setTimeout(() => {
      this.setState({ info: "Create new key!!!" });
      this.rebuildDatabase();
    }, 500);
  }


  rebuildDatabase = async () => {
    switch (this.state.Method) {
      case "NEW":
        await groupUpdate({groupName: this.state.groupName}, true);
        break;
      case "OLD":
        await oldGroupUpdate({groupName: this.state.groupName}, true);
        break;
    }
    setTimeout(() => {
      this.setState({
        info: 'Finished!',
        checkFinished: true
      });
      // var t1 = new Date().getTime();
      // this.setState({ secondTime: t1 });
      // let timeTaken = ((this.state.secondTime - this.state.firstTime) * 0.001).toFixed(3);
      // ToastAndroid.show("Update time: " + timeTaken + " seconds.", ToastAndroid.SHORT);
      // console.log("Update time: ", timeTaken, " seconds.");
    }, 300);
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