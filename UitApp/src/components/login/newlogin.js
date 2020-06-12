import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import {responseLogin} from '../../actions/action';
const { width} = Dimensions.get('window');

const Realm = require('realm');
import DEFAULT_KEY from '../../api/Config'
import {userSchema} from '../../models/Realm'
const realm = new Realm({schema: [userSchema], encryptionKey: DEFAULT_KEY});

class newlogin extends Component {  
  constructor(props){
    super(props);
    this.state={
      mssv:'',
      password:'',
      checked: true,
    }
    this._GetAsync();
  }

  componentDidMount(){}

  LoginSubmit = () => { 
    if(this.state.checked === true){   
      this._SaveInAsync();
    }

    const data = {username: this.state.mssv, password: this.state.password} ;
    this.props.navigation.navigate('Loading', {data})
  }

  _GetAsync = async () => {
    try {
      const user = await realm.objects('user');
      const _key = user[0].privateKey;
      console.log(user[0])
      if (_key !== ""){
        this.props.navigation.navigate('Menu');
      }
      else{
        const _mssv = user[0].mssv;
        const _password = user[0].name;
        if ( _mssv !== null &&  _password !== null) {
          this.setState({
            mssv: _mssv,
            password: _password,
          })
        }
      }
    } catch (error) {}
  };



  _SaveInAsync = async () => { // lưu lại dữ liệu trên máy
      try {
        realm.write(() => {
          realm.create('user', {
            mssv: this.state.mssv,
            name:  this.state.password,
          });
        });
      }
      catch(error){
        console.log("_SaveInAsync newlogin.js",error)
      }
  };

  handleMssv = (text) => {
    this.setState({ mssv: text })
  }
  handlePassword = (text) => {
      this.setState({ password: text })
  }


  render() {
    return (
      <ScrollView>
      <View style={styles.backgroud}>
        <Image
          style={{width: 130, height: 155}}
          source={require('../../../assets/logo/UIT.png')}/>
        <Text style={{fontSize: 20, color: '#0033CC', marginTop: 20}}>Security Group Chat</Text>
        
        <View style={{margin: 10, width: width}}> 

          <Text style={{marginLeft: 20}}>Nhập Mssv</Text>

          <TextInput style={styles.TextInputStyles}
            placeholder="Nhập Mssv"
            onChangeText={this.handleMssv}
            keyboardType="numeric"
            value={this.state.mssv}
            maxLength={8}/>

          <Text style={{marginLeft: 20}}>Nhập Name</Text>

          <TextInput style={styles.TextInputStyles} 
                    secureTextEntry={false}
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    placeholder="Nhập Name"/>       
          <CheckBox
            center
            title='Nhớ tài khoản'
            borderColor='white'
            backgroundColor='white'
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})} />

          <TouchableOpacity style={styles.LoginStyles}
                            onPress={ this.LoginSubmit}>
            <Text>ACCESS</Text>
         </TouchableOpacity>

        </View>
        <Text style={{fontSize: 10, color: '#0033CC', textAlign: "center"}}>{'\u00A9'}16520395-16520354</Text>
      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAccount: (data) => {
      dispatch(responseLogin(data));
    },
    saveAccount: (data) => {
      dispatch(saveAccount(data));
    }
  }
}

const styles = StyleSheet.create({
  backgroud:{ 
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  TextInputStyles:{
    borderColor: 'gray', 
    borderWidth: 1, 
    margin: 5,
    height:35,
    paddingLeft: 20,
    marginHorizontal: 20,
    borderRadius: 7 ,
    marginBottom: 10,
  },
  LoginStyles: {
    height: 40,
    backgroundColor: '#3399FF',
    borderRadius:7,
    marginTop: 10,
    width:width-40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(newlogin)
