// import React, {Component} from 'react';
// import { Text, View, StyleSheet, Image,Dimensions, TouchableOpacity, FlatList, } from 'react-native';
// import {data} from './data';
// import {date} from './listDaa';
// import { Card } from "native-base";
// import { connect } from 'react-redux';
// import Compensatory from './itemClass/compensatory'
// import Croom from './itemClass/croom'
// import { responseDaaCroom,  responseCompensatory}  from '../../actions/action';

// const { width } = Dimensions.get('window');

// class Daa extends Component {  
//   constructor(props){
//     super(props);
//    this.getToDay();
//   }

//   dayStyle = (id) => {
//     this.setState({ 
//       refresh: !this.state.refresh
//   })
//     date.map((date, index)=>{
//       if(id==date.id){
//         date.status = true;
//       }else{
//         date.status = false;
//       }
//     })
// }

//   componentDidMount(){
//     this.getToDay
//   }

//   getToDay = () =>{
//     const today = 0;
    
//     let handlingDate = [];
//     date.map((date, index)=>{
//       if(today==date.id){
//         date.status = true;
//       }else{
//         date.status = false;
//       }
//         handlingDate.push(date);
//       })
//       //this.getScheduleConstructer(today, handlingDate);
//       let result = [];
//       const dayClick = parseInt(today) + 2;
//         data.map((data, index)=>{
//           if(data.day == dayClick){
//             obj = {
//               data,
//               'id': index,
//             }
//             result.push(obj);
//           }
//           //console.log("@@@@@@@@", result);
//           return result;
//         }) 
//         this.state = {
//           datas: result,
//           da: data,
//           refresh: false,
//           dates: handlingDate,
//           checkid: 0
          
//         }
//   }


//   getScheduleDay(selectDay){
//     //console.log(data);
//     let result = [];
//     const dayClick = parseInt(selectDay) + 2;
//       data.map((data, index)=>{
//         if(data.day == dayClick){
//           obj = {
//             data,
//             'id': index,
//           }
//           result.push(obj);
//         }
//         return result;
//       }) 
//       if(result.length != 0){
//       this.setState ({
//         datas: result
//         })
//       }
//   }



//   handData = (id) => {
//     const student_id = this.props.student_id;
//     console.log("$$$$$$$$$$$$$$$$$$$3", id)
//     if (id == 0) {

//     } else if (id == 1) {
//         this.props.getCroom(student_id);
//     } else {
//         this.props.getCompensatory(student_id);
//     }
//     this.setState({   
//         checkId: id
//     })
// }
  
//   TranslateComponent = () => {
//     let index = this.state.checkid;
//     console.log("#####################3", this.state.checkid)
//     if (index == 1) {
//         return ( <Croom/>)
//     } else if (index == 2) {
//         return ( <Compensatory/> )
//     } 
// }


//   render() {
//     this.getToDay;
//     return (
//       <View>
//        <FlatList data={this.state.dates}
//             horizontal={false}
//             numColumns={7}
//             renderItem={({ item }) => (
//               <TouchableOpacity 
//                 onPress={()=>{
//                   this.dayStyle(item.id);
//                   this.getScheduleDay(item.id);
//                   this.handData(item.id);
//               }}>
//               <Text style={item.status? styles.stylesSelectDate : styles.stylesBaseDate}>{item.day}</Text>
//               </TouchableOpacity>
//             )}
//             keyExtractor={item => item.id.toString()}
//             extraData={this.state.refresh} // render lai flast list
//             />
//       </View>
//     );
//   }
// }


// const styles = StyleSheet.create({

//   stylesSelectDate:{
//     paddingHorizontal: (width)/12,
//     paddingVertical: 5,
//     fontSize: 20,
//     color:'red',
//     borderRadius: 1,
//     borderColor:'red'
//   },
//   stylesBaseDate:{
//     paddingHorizontal: (width)/12,
//     paddingVertical: 5,
//     color:'black',
//     borderRadius:1 
//   },

// })
// const mapStateToProps = state => {
//   return {
//       daaCroomReducer: state.daaCroomReducer,
//       student_id: state.accountReducer.username,
//   }
// }
// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     getCroom: (daa)=>{
//       dispatch(responseDaaCroom(daa))
//     },
//       getCompensatory: (daa) => {
//           dispatch(responseCompensatory(daa))
//       }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Daa)




//import React from 'react';
//import { Text, View } from 'react-native';
//import { createAppContainer } from 'react-navigation';




// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// import {createAppContainer} from 'react-navigation'
// import Compensatory from './itemClass/compensatory'
// import Croom from './itemClass/croom'

// const Daa = createMaterialTopTabNavigator({
//   'Phòng học': {screen: Compensatory},
//   'Nghỉ bù': {screen: Croom},
// });

// export default createAppContainer(Daa);