import React, {Component} from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Image,Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
//import {data} from './data';
import {date} from './listDate';
import { Card } from "native-base";
import { connect } from 'react-redux';
import { reset } from 'expo/build/AR';

const { width } = Dimensions.get('window');


class schedule extends Component {  
  constructor(props){
    super(props);
    this.getToDay();
  }

  getScheduleDay(selectDay){
    //console.log(data);
    let data = this.props.scheduleReducer;
    //console.log('@@', data)
    //const data = Object.values( scheduleReducer );
    console.log(data)
    let result = [];
    const dayClick = parseInt(selectDay) + 2;
      data.data.map((data, index)=>{
        if(data.day != "" && data.day == dayClick){
          obj = {
            data,
            'id': index,
          }
          //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%",data.day) 
          
          result.push(obj);
        }
       // return result;
        
      })
      this.setState ({
        datas: result
        })
  }

  getToDay = () =>{  
    const today = new Date().getDay()-1;
    let handlingDate = [];
    date.map((date, index)=>{
      if(today==date.id){
        date.status = true;
      }else{
        date.status = false;
      }
        handlingDate.push(date);
      }
    )
      let result = [], i=0;
      const dayClick = parseInt(today) + 2;
 
     const data = this.props.scheduleReducer;

    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", data);
     
      data.data.map((data, index)=>{
        if(data.day != "" && data.day == dayClick){
          obj = {
            data,
            'id': index,
          }
          result.push(obj);
      }
      //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%",result) 
      })
      this.state = {
        dates: handlingDate,
        datas: result,
       // da: data,
        refresh: false,
      }
}

newPage = () =>{  
  const today = new Date().getDay()-1;  
  let result = [], i=0;
  const dayClick = parseInt(today) + 2;
   const data = this.props.scheduleReducer;
    data.data.map((data, index)=>{
      if(data.day != "" && data.day == dayClick){
        obj = {
          data,
          'id': index,
        }
        result.push(obj);
    }
    
    })
    this.setState({
      datas: result
    })
    //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%",result) 
    return result;
}

    dayStyle = (id) => {
      console.log(id);
      
        date.map((date, index)=>{
          if(id==date.id){
            date.status = true;
          }else{
            date.status = false;
          }
        })
        
        this.setState({ 
          refresh: !this.state.refresh,
          dates: date
          })
          //console.log(this.state.dates)
      }

  render() {
   //const check = this.newPage();
    return (
      <View>
        <FlatList data = {this.state.dates}
            horizontal={false}
            extraData={this.state} // render lai flast list
            numColumns={7}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={()=>{
                  this.dayStyle(item.id);
                  //console.log(this.state.dates)
                  this.getScheduleDay(item.id);
              }}>
              <Text style={item.status? styles.stylesSelectDate : styles.stylesBaseDate}>{item.day}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            />
        <FlatList data={this.state.datas}
            extraData={this.state}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
               
                }}>
                <Card>
                    <View style={{margin: 7}}>
                        <Text> Môn học: {item.data.subject_name}</Text>
                        <Text> Giảng viên: {item.data.teacher_name}</Text>
                        <Text> Thời gian học:  {item.data.time}</Text>
                        <Text> Phòng: {item.data.room}</Text>
                    </View>
                </Card>
                </TouchableOpacity>)}
            keyExtractor={item => item.id.toString()}
            
            />
        
      </View>

    );
  }
}


const styles = StyleSheet.create({

  stylesSelectDate:{
    paddingHorizontal: (width)/36,
    paddingVertical: 5,
    fontSize: 20,
    color:'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius:7,
    borderTopLeftRadius: 7,
    borderTopLeftRadius: 9,
  },
  stylesBaseDate:{
    paddingHorizontal: (width)/36,
    paddingVertical: 5,
    color:'black',
    borderRadius:1 
  },

})

const mapStateToProps = state => {
  return {
    scheduleReducer: state.scheduleReducer
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(schedule)