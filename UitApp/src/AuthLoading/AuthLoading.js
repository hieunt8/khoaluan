import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

 class AuthLoading extends Component{
    constructor(props) {
      super(props);
     
    }
    // _bootstrapAsync = async () => {
     
    //  
   
      
    // };

    componentDidUpdate() {
      if (this.props.flag) {
          this.props.navigation.navigate( 'Menu' );
        }
        else{
          this.props.navigation.navigate('Login');
        }
    }

    // shouldComponentUpdate(){
    //   const isLogin = this.props.flag;
    //   return isLogin;
    //   // console.log('AuthLoading ',isLogin);
    //   // if(isLogin === true){
    //   //   this.props.navigation.navigate( 'Menu' );
    //   // }
    //   // else{
    //   //   this.props.navigation.navigate('Login');
    //   // }
    // }
  
    // Render any loading content that you like here

    setloading(){
      if (this.props.flag) {
       return this.props.navigation.navigate( 'Menu' );
      }
      else{
        return this.props.navigation.navigate( 'Login' );
      }
    }
    render() {
      // this.setloading();
      // return (
      //   <View style={styles.container}>
      //     <ActivityIndicator />
      //     <StatusBar barStyle="default" />
      //   </View>
      // );
      if (this.props.flag) 
      return <Secured 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
    else 
      return <Login 
          onLoginPress={() => this.setState({isLoggedIn: true})}
        />;
  
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  
const mapStateToProps = state => {
  return {
    flag: state.accountReducer.flag,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)