import React, {Component} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, FlatList, Alert} from 'react-native';
import { Card } from "native-base";
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');
class compensatory extends React.Component {  
  constructor(props){
    super(props);
     this.handData();
     //console.log('get_compensatoryReducers', this.props.compensatoryReducers);
  }

  handData = () => {
    const compensatoryReducers = this.props.compensatoryReducers;
   // console.log('get_compensatoryReducers', compensatoryReducers);
    const datas = Object.values( compensatoryReducers );
    let i = 0;
    let numbers = [];
    while (i < datas.length) {
     // console.log(datas[i])
      const obj = {
        'title':datas[i].split('(')[0], 
        'teacher': datas[i+1],
        'science': datas[i+2],
        'subject': datas[i+3],
        'code' : datas[i+4],
        'room': datas[i+5],
        'startime': datas[i+6],
        'endtime': datas[i+7],
        'day': datas[i+8].split(', ')[0],
        'date':datas[i+8].split(', ')[1],
        'id': i
        };
      //console.log(i, obj)
      numbers.push(obj)
      i = i + 9;
    }
   


    if(numbers.length!=0){
      return numbers
    }
}

clickIteam(item){
    Alert.alert(
      item.subject,
      `Khoa/ Bộ môn: ${item.science}
Lớp: ${item.code}
Phòng: ${item.room}
Thời gian: ${item.startime}
Tiết bắt đầu: ${item.startime}
Tiết kết thúc: ${item.endtime}
Thứ: ${item.day}
${item.date}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK'},
      ],
      { cancelable: false }
    );
  };


  render() {
    const check = this.handData();
    return (
        !check? <ActivityIndicator style={styles.loading} animating={true} size="small" color={'blue'} /> :<View>
         <FlatList data={check}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
                  this.clickIteam(item);
                }}>
                <Card>
                    <View style={{margin: 7}}>
                        <Text>{item.title} </Text>
                        <Text>Khoa/ Bộ môn : {item.science} </Text>
                        <Text>Môn học: {item.subject} </Text>
                        <Text>Lớp: {item.code} </Text>
                    </View>
                </Card>
                </TouchableOpacity>)}
            keyExtractor={item => item.id.toString()}/>
       
      </View>
    );
  }
}


const styles = StyleSheet.create({

  stylesSelectDate:{
    paddingHorizontal: (width)/12,
    paddingVertical: 5,
    fontSize: 20,
    color:'red',
    borderRadius: 1,
    borderColor:'red'
  },
  stylesBaseDate:{
    paddingHorizontal: (width)/12,
    paddingVertical: 5,
    color:'black',
    borderRadius:1 
  },
  loading:{ 
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
const mapStateToProps = state => {
  return {
    compensatoryReducers: state.compensatoryReducers,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(compensatory)
