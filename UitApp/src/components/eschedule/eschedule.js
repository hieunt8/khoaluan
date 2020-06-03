import React, {Component} from 'react';
import { Text, View, StyleSheet ,Dimensions, TouchableOpacity, ActivityIndicator, FlatList, } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Card } from "native-base";

const { width } = Dimensions.get('window');
//const data12 = { data:{username: '16520364', password: '1472528310'} };

class eschedule extends Component {  
  constructor(props){
    super(props);
    
  }
  
  state={
    color:'#3399FF'
}


componentDidMount() {
}

getData = () =>{
  return this.props.getEschedule;
}

  render() {
    const eschedule = this.getData();
    const colorIcon = 'black';
    const setColor = (index) => {
      if(index === 'Chưa nộp bài') return 'red';
      else return '#3399FF'
    };
    return (
      eschedule? <View style={styles.backgroud}>
        <FlatList data={eschedule}
          renderItem={({ item }) => (
            <View style={{marginHorizontal: 5}}>
              <Card>
                <View style={{margin: 7}}>
                  <Text> {item.room.name_subject}</Text>
                  <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                    <Icon
                        name="note"
                        color={colorIcon}
                        size={15}/>
                    <Text style={styles.marginText}> Mã môn học: {item.room.c_subject}</Text>
                  </View>
                
                  
                  <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                    <Icon
                        name="home"
                        color={colorIcon}
                        size={15}/>
                    <Text style={styles.marginText}> Phòng: {item.room.room}</Text>
                  </View>

                  <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                    <Icon
                        name="av-timer"
                        color={colorIcon}
                        size={15}/>
                     <Text style={styles.marginText}> Ngày: {item.room.day}</Text>
                  </View>
                </View>
              </Card>
            </View>)}
            keyExtractor={item => item._id}/>
      </View> : <ActivityIndicator style={styles.loading} animating={true} size="small" color={'blue'} /> 
    );
  }
}




const mapStateToProps = state => {
  return {
    getEschedule: state.escheduleReducer.data
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}


const styles = StyleSheet.create({
//   backgroud:{ 
//     flex: 1,
//     backgroundColor: "#3399FF"
//   },
  backgroud:{ 
    flex: 1,
    backgroundColor: "#eae9ef"
  },
 
  marginText: {
    marginTop: -2
  },
 
  loading:{ 
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(eschedule)