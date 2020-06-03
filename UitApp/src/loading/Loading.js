import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import {responseLogin} from '../actions/action';
// const NodeRSA = require('node-rsa');

const { width } = Dimensions.get('window');


class Loading extends Component {  
  constructor(props){
    super(props);
    this.state={
      info : 'Creating new user!',
      privateKey : ''
    }
  }

  componentDidMount()
  {
    this._GenerateRSAKey(this.props.navigation.state.params.data);
  }

  async componentDidUpdate() {  
    const flag = await this.props.flag;
    const checkexist = await this.props.checkexist;
    setTimeout(() => {
      if (flag === true) {
        if(checkexist) this.setState({ info: "User exist! Replace new RSA key" });
        else this.setState({ info: "Created new user!" });
        this._SaveInAsync();
        setTimeout(() => {
        this.props.navigation.navigate('Menu');
        }, 1000);  
      }
      else{
        // this.props.navigation.navigate('Login', {check: 1});
      }
    }, 1000);
  }


  _GenerateRSAKey = async (data) => {
    this.setState({ info: "Generate rsa key" })
    // const key = new NodeRSA({b: 1024});
    // this.setState({ privateKey: key.exportKey('pkcs8-private')})
    // data.publickey = key.exportKey('pkcs8-public');
    this.props.getAccount(data);
  }

  _SaveInAsync = async () => {
    try{
      await AsyncStorage.setItem('key',  this.state.privateKey);
    }catch(erro){
    }
  };

  render(){
  return (
    <View style={styles.viewStyles}>
      <Image
        style={{ width: 130, height: 155 }}
        source={require('../../assets/logo/UIT.png')} />
      <View style={styles.indicator}>
        <ActivityIndicator animating={true} size="small" color={'blue'} />
      </View>
      <Text style={{fontSize: 10, color: '#0033CC', textAlign: "center"}} >{this.state.info}</Text>
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
    paddingTop: width/7.2,
    justifyContent: "center",
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
    return {
        flag: state.accountReducer.flag,
        checkexist: state.accountReducer.checkexist,
        accountReducer: state.accountReducer,
        student_id: state.accountReducer.username,
        jar: state.accountReducer
    }
  }
  const mapDispatchToProps = (dispatch, props) => {
    return  {
      getAccount: (data) => {
        dispatch(responseLogin(data));
      },
        }  
    }

export default connect(mapStateToProps, mapDispatchToProps)(Loading);