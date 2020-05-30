import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { 
  responseSchedule,
  responseDeadline, } from '../actions/action';


const { width } = Dimensions.get('window');


class Loading extends Component {  

  async componentDidUpdate() {
    const data = await this.props.flag;
    const checkexist = await this.props.checkexist;
    // console.log(checkexist);
    //console.log('gfdsf',this.props.accountReducer);
      setTimeout(() => {
     
      // console.log(data)
        if (data === false) {
          this.props.navigation.navigate('Login', {check: 1});
        }
        else if(data === true){
          // const data = {student_id: this.props.student_id};
          // this.props.getSchedule(data);
          // const deadline=this.props.jar;
          // this.props.getDeadline(deadline);
          if(checkexist) alert("User exist!")
          else alert("Created new user!")
          this.props.navigation.navigate('Menu');
        }
        else{

        }
    }, 1000);
  }
  
    render(){
     // console.log('dsadsadasdas',this.props.accountReducer)

      //const isLoading = this.props.navigation.getParam('loading', false)
      //console.log(isLoading)
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{ width: 130, height: 155 }}
          source={require('../../assets/logo/UIT.png')} />
        <View style={styles.indicator}>
          <ActivityIndicator animating={true} size="small" color={'blue'} />
        </View>
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
      getSchedule: (data) => {
        dispatch(responseSchedule(data));
          },
      getDeadline: (data) =>{
        dispatch(responseDeadline(data));
      },
        }  
    }

export default connect(mapStateToProps, mapDispatchToProps)(Loading);