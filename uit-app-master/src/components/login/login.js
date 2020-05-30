import React, {Component} from 'react';
import { Text, View, TextInput, StyleSheet, Image, ActivityIndicator, Dimensions, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import axios from 'axios';
import { connect } from 'react-redux';
import {responseLogin} from '../../actions/action';
import LoginLoading from '../../loading/Loading'

const { width} = Dimensions.get('window');

class login extends Component {  
  constructor(props){
    super(props);
    this.state={
      mssv:'',
      password:'',
      checked: false,
    }
   this._GetAsync();

  }
  
  componentDidMount(){
    //   if(nextProps.flag){
    //     if (!this.props.flag){
    //       console.log(nextProps.isLoading)
    //       this.props.navigation.navigate('Menu')
    //     }
    //   }
    //   else if(this.props.flag){
    //     alert("Đăng xuất thành công!")
    // }
    // else{
    //   alert("Kiểm tra lại tài khoản mật khẩu!")
    // }
      try{
      const check = this.props.navigation.getParam('check');
      if(check == 1){
        alert("Kiểm tra lại tài khoản mật khẩu!")
      }
      else  if(check == 2){
        alert("Đăng xuất thành công!")
      }
    }catch(err){

    }
  }

  LoginSubmit = () => {
//    this.props.navigation.navigate('Menu')
    
    if(this.state.checked === true){   
      this._SaveInAsync();
    }
    const data = {username: this.state.mssv, password: this.state.password} ;
    
    this.props.getAccount(data);

    this.LoadingFunction();
    //this.LoadingFunction
   
  }

  LoadingFunction() {
    this.props.navigation.navigate('Loading')
  }

 
  
  _GetAsync = async () => {
    try {
      const _mssv = await AsyncStorage.getItem('mssv');
      const _password = await AsyncStorage.getItem('password');
      if ( _mssv !== null &&  _password !== null) {
        this.setState({
          mssv: _mssv,
          password: _password,
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _SaveInAsync = async () => { // lưu lại dữ liệu trên máy
    try{
      await AsyncStorage.setItem('mssv',  this.state.mssv);
      await AsyncStorage.setItem('password',  this.state.password);
    }catch(erro){
    }
  };

  handleMssv = (text) => {
    this.setState({ mssv: text })
  }
  handlePassword = (text) => {
      this.setState({ password: text })
  }


  render() {
    // console.log(data.length);
    return (
      <ScrollView>
        
      <View style={styles.backgroud}>
      {/* <LoginLoading loading = {this.state._isLoading}/> */}
        <Image
          style={{width: 130, height: 155}}
          source={require('../../../assets/logo/UIT.png')}/>
        <Text style={{fontSize: 20, color: '#0033CC', marginTop: 20}}>UIT Login</Text>
        
        <View style={{margin: 10, width: width}}> 

          <Text style={{marginLeft: 20}}>Nhập mssv</Text>

          <TextInput style={styles.TextInputStyles}
            placeholder="Nhập mssv"
            onChangeText={this.handleMssv}
            keyboardType="numeric"
            value={this.state.mssv}
            maxLength={8}/>

          <Text style={{marginLeft: 20}}>Nhập password</Text>

          <TextInput style={styles.TextInputStyles} 
                    secureTextEntry={true}
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    placeholder="nhập password"/>
                    
          <CheckBox
            center
            title='Nhớ tài khoản mật khẩu'
            borderColor='white'
            backgroundColor='white'
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})} />

          <TouchableOpacity style={styles.LoginStyles}
                            onPress={ this.LoginSubmit}>
            <Text>LOGIN</Text>
         </TouchableOpacity>
          
        
        
        </View>
        
      </View>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => {
  return {
    isLoading: state.accountReducer,
    flag: state.accountReducer.flag,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getAccount: (data) => {
      dispatch(responseLogin(data));
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

export default connect(mapStateToProps, mapDispatchToProps)(login)
