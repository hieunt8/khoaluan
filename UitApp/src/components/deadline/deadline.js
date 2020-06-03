import React, {Component} from 'react';
import { Text, View, StyleSheet, Image ,Dimensions, ActivityIndicator, FlatList, } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Card } from "native-base";

const { width } = Dimensions.get('window');


class deadline extends Component {  
  constructor(props){
    super(props);
    this.xlarr();

  }
  
  componentDidUpdate(){

  }

  state={
    color:'#3399FF'
}



// tạo arr object
xlarr = () => {
  const cc = [];
  const vc = Object.values( cc );
  console.log(vc);
  if(vc[0] == null){
    console.log('********************************');
  }
  if(vc == []){
    console.log('#################################3');
  }
  const getDeadline = this.props.deadlineReducer;
  // alert(getDeadline);
  const datas = Object.values( getDeadline );
  let i = 0;
  let numbers = [];
  if(datas[0]==null){
    alert('Bạn không có deadline')
    const obj = {
      'date':'', 
      'subjects':'Bạn không có deadline', 
      'code': '',
      'describe': '',
      'id': 0
      };
    //console.log(i, obj)
    numbers.push(obj)
  }else{
    while (i < (datas.length/3)) {
      const obj = {
        'date':datas[i], 
        'subjects':(datas[(datas.length/3) + i]).split(' - ')[0], 
        'code': (datas[(datas.length/3) + i]).split(' - ')[1],
        'describe': datas[(datas.length/3)*2 + i],
        'id': i
        };
      //console.log(i, obj)
      numbers.push(obj)
      i++
    }
  }
 this.state={
   data: numbers
 }
}

  render() {
    const colorIcon = 'black';
    // const setColor = (index) => {
    //   if(index === 'Chưa nộp bài') return 'red';
    //   else return '#3399FF'
    // };
    // this.xlarr();
    return (
      !this.state.data?  <ActivityIndicator style={styles.loading} animating={true} size="small" color={'blue'} /> :
      <View style={styles.backgroud}>
        <FlatList data={this.state.data}
          renderItem={({ item }) => (
            <View style={{marginHorizontal: 5}}>
            <Card>
              <View style={{margin: 7}}>
                <Text numberOfLines={1}> { item.subjects}</Text>

                <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                  <Icon
                      name="code"
                      color={colorIcon}
                      size={15}/>
                  <Text style={styles.marginText}> Mã môn: {item.code}</Text>
                </View>

                <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                  <Icon
                      name="note"
                      color={colorIcon}
                      size={15}/>
                  <Text style={styles.marginText}> Mô tả: {item.describe}</Text>
                </View>
              
                <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                  <Icon
                      name="av-timer"
                      color={colorIcon}
                      size={15}/>
                   <Text style={styles.marginText}> Hạn: {item.date}</Text>
                </View>
              </View>
            </Card>
          </View>)}
            keyExtractor={item => item.id.toString()}/>
      </View>
    );
  }
}




const mapStateToProps = state => {
  return {
    deadlineReducer: state.deadlineReducer
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    // getDeadline: (data) => {
    //   dispatch(responseDeadline(data));
    //}
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
    marginTop: -2,
    paddingRight: 4
  },
  loading:{ 
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(deadline)