import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { responseLogin } from '../actions/action';
// const NodeRSA = require('node-rsa');
import { RSA } from 'react-native-rsa-native';
const { width } = Dimensions.get('window');

const Realm = require('realm');
import DEFAULT_KEY from '../api/Config'
import { userSchema } from '../models/Realm'
const realm = new Realm({ schema: [userSchema], encryptionKey: DEFAULT_KEY });


class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'Creating new user!',
      privateKey: '',
      publicKey: ''
    }
  }

  
  componentDidMount() {
    this._GenerateRSAKey(this.props.navigation.state.params.data);
  }

  async componentDidUpdate() {
    const flag = await this.props.flag;
    const checkexist = await this.props.checkexist;
    setTimeout(() => {
      if (flag === true) {
        if (checkexist) this.setState({ info: "User exist! Replace new RSA key" });
        else {
          this.setState({ info: "Created new user!" });
          this._SaveInAsync();
        }
        setTimeout(() => {
          this.props.navigation.navigate('Menu');
        }, 500);
      }
      else {
        // this.props.navigation.navigate('Login', {check: 1});
      }
    }, 2000);
  }


  _GenerateRSAKey = async (data) => {
    this.setState({ info: "Generate rsa key" })
    // const key = new NodeRSA({b: 1024});

    RSA.generateKeys(2048) // set key size
      .then(keys => {
        this.setState({ privateKey: keys.private })
        this.setState({ publicKey: keys.public })
        data.publickey = keys.public;
        this.props.getAccount(data);
      });
  }

  _SaveInAsync = async () => {
    const user = await realm.objects('user');
    // console.log("old" , user[0]);
    try {
      realm.write(() => {
        user[0].privateKey = this.state.privateKey;
        user[0].publicKey = this.state.publicKey;
      });
    } catch (erro) {
      console.log("_SaveInAsync Loading.js", erro)
    }
    // console.log("12" , user[0]);
  };

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
    flag: state.accountReducer.flag,
    checkexist: state.accountReducer.checkexist,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAccount: (data) => {
      dispatch(responseLogin(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);