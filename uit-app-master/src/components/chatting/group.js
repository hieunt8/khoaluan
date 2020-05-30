import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, Dimensions, TouchableOpacity, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import { datas } from './listGroup';
import { getDataFromCreategroup } from './../../actions/action';

const { width } = Dimensions.get('window');

class group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      room: "",
    }
  }
  componentDidMount() {
    // this.props.getData();

  }
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps && nextProps.creategroupReducers){
  //     var {creategroupReducers}=nextProps;
  //     this.setState({
  //       data:creategroupReducers
  //     })
  //   }
  //   alert(nextProps.creategroupReducers[0].title);
  // }



  // tạo arr object
  xlarr = () => {
    const creategroupReducers = this.props.creategroupReducers;
    // alert(getDeadline);

    const datas = Object.values(creategroupReducers);
    // alert(datas[1].title)
    if (datas.length != 0) {
      return datas;
    }
  }


  setClickTranslate(title1, mssv1,namest) {
    let flag = false;
    var data = this.xlarr();
    // alert(title1);
    for (let i = 0; i < data.length; i++) {
      if (data[i].title === title1) {
        if (data[i].mssv && data[i].mssv.includes(mssv1)) {
          this.props.navigation.navigate('chat',{
            room:data[i].title,
            name: mssv1 +"-"+namest
          });
          flag = true;
        }
      }
    }
    if (flag === false) 
      alert("Bạn không được phép tham gia vào group này!");
    //   // if(data[index].mssv && data[index].mssv.includes(mssv1)){
    //     this.props.navigation.navigate('chat');

    // }
  }
  setRedirectChat() {
    this.props.navigation.navigate('CreateGroup');
  }
  render() {
    // var { creategroupReducers } = this.props;
    // for(let i=0;i<3;i++)
    // {
    //   alert(creategroupReducers[i].title);
    // }
    const datas = this.xlarr();
    // if(creategroupReducers[0].title==null){
    //   this.props.navigation.navigate('CreateGroup');
    // }
    console.log(datas)
    return (
      //!creategroupReducers?  <ActivityIndicator style={styles.loading} animating={true} size="small" color={'blue'} /> : 
      <View style={styles.backgroud}>
        <View>
          <TouchableOpacity style={styles.itemViewStyles} onPress={() => {
            this.setRedirectChat()
          }}>

            <Text> Create Group </Text>
          </TouchableOpacity>
        </View>
        <FlatList data={datas}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.setClickTranslate(item.title, this.props.student_id,this.props.name)
              }}
            >
              <View style={styles.itemViewStyles}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>)}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroud: {
    flex: 1,
    backgroundColor: "#3399FF"
  },
  itemViewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width / 4,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 7
  }
})

const mapStateToProps = state => {
  return {
    name: state.accountReducer.name,
    creategroupReducers: state.creategroupReducers,
    student_id: state.accountReducer.username,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    // getData: () => {
    //   dispatch(getDataFromCreategroup());
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(group)
