import React, {Component} from 'react';
import { Text, View, StyleSheet, Image,Dimensions, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { Card } from "native-base";
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class croom extends Component {  
  constructor(props){
    super(props);
     this.handData();
    // console.log('get_Croom', this.props.daaCroomReducer);
  }

  handData = () => {
    const get_Croom = this.props.daaCroomReducer;
    //console.log('get_Croom', get_Croom);
    const datas = Object.values( get_Croom );
    let i = 0;
    let numbers = [];
    while (i < datas.length) {
      const obj = {
        'title':datas[i], 
        'id': i
        };
      //console.log(i, obj)
      numbers.push(obj)
      i++
    }
    //console.log(numbers);
    if(numbers.length!=0){
     
      this.state={
        data:numbers
      }
      return numbers
    }
}
  render() {
    const check = this.handData();
    return (
        !check? <ActivityIndicator style={styles.loading} animating={true} size="small" color={'blue'} /> :<View>
         <FlatList data={check}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{
               
                }}>
                <Card>
                    <View style={{marginVertical: 17}}>
                        <Text style={{paddingHorizontal: 10}}>{item.title} </Text>
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
    daaCroomReducer: state.daaCroomReducer,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(croom)
