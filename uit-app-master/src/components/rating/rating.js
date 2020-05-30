import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Icon } from 'react-native-elements';
import { responseComment, responseResComment} from '../../actions/action';
import { connect } from 'react-redux';
import { rescomment } from '../../api/ApiLink';
import { Card } from "native-base";


const { width} = Dimensions.get('window');
let datas = []
class rating extends React.Component {
  constructor(props){
    super(props);
    this.state={
      content: '',
      data: '',
      checkValue: false
    }
  }
  
  ratingCompleted(rating) {
    //console.log("Rating is: " + rating)
  }
  handleMssv = (text) => {
    if(text!='' || text!=null){
    this.setState({ 
      content: text,
      checkValue: true
    })
    }else{
      this.setState({ 
        content: text,
        checkValue: false
      })
    }
  }
  Comment(text){
    console.log('jkjlkljkl', text)
    const today = new Date();
    const data = {student_id: this.props.student_id, name: this.props.name, content: text, 'rating': 0, time: today.getDate() + '/'+ today.getMonth()+ '/' +today.getFullYear()} ;
    this.setState({
      content:'',
      checkValue: false
    })
    this.props.reqComment(data);
    setTimeout(() => {
      this.props.getResComment();
    }, 500);
  //  let i = 1;
    // while(i>0){
    //   if(i==1){
    //     console.log('i=true')
    //     this.props.reqComment(data);
    //     i=2;
    //   }
    //   if(i==2){
    //     console.log('i=false')
    //   this.props.getResComment();
    //   i=3;
    //   break;
    // }
    // }
   
  }

  xlarr = () =>{
    const comment = this.props.Comment;
    // console.log(comment);
    const datas = Object.values( comment );
    // console.log("dataState", this.state.data)
    // console.log(datas);
    
    return datas
    
  }


  componentWillReceiveProps(nextState){
    
   }

  render() {
  datas = this.xlarr();
   //const comment = ;
   //console.log( comment )
   //console.log(this.state.data)
  //  this.setState({
  //    data: datas
  //  })
   //console.log(this.state.data)
    return (
      <View style={styles.container}>
        <AirbnbRating 
          count={5}
          reviews={["Kinh khủng", "Tệ", "Bình thường", "Tốt", "Hoàn hảo"]}
          onFinishRating={this.ratingCompleted}
          defaultRating={5}
          size={20}/>
      <View>
        <View 
        // style ={{flexDirection: 'row', margin: 5, flex: 1}}
        style={styles.inputCommentStyles}>
          <TextInput placeholder="Bình luận..." 
            style = {{paddingLeft: 7, height: 20, flex: 1, marginTop: 7}}
            onChangeText={this.handleMssv}
            value={this.state.content}/>
              <Icon
                name="send"
                color={this.state.checkValue? 'blue' : 'grey'}
                style={{marginVertical: 50, paddingRight: 5}} 
                onPress = {()=>{
                  this.state.checkValue? this.Comment(this.state.content) : alert("Nhập nội dung")
                }}/>
            </View>
                <FlatList  
                data = {datas}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>(
                
                <View style={{margin:5}}>
                  <View>
                      <View style ={styles.RowMargin}>
                          <Text style={styles.TextNameStyle}>{item.name}</Text>
                          <Text style={{ color: 'black', marginLeft: 7, fontSize: 13}}>{item.student_id}</Text>
                      </View>
                      <Text style={styles.TextCommentStyle}>{item.time}</Text>
                  </View>
                
                  <Text style={{paddingLeft: 20, marginRight: 10}}>{item.content}</Text>
                  <View style={{marginBottom:20}}>
                </View>
                </View>)}
                keyExtractor={item => item._id.toString()}
                />
              </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 8,
  },
RowMargin:{
    flexDirection: 'row', 
},
TextCommentStyle:{
    color: '#A9A9A9',
    fontSize:10,
    marginLeft:6,
    marginBottom: 5,
},
TextNameStyle:{
    color: 'black', 
    marginLeft: 7,
    fontSize: 15
},
 inputCommentStyles:{
    flexDirection: 'row', 
    borderWidth: 0.5, 
    borderColor: '#d6d7da', 
    borderRadius: 20,
    padding: 10
 },
});
const mapStateToProps = state => {
  return {
      student_id: state.accountReducer.username,
      name: state.accountReducer.name,
      Comment: state.resCommentReducers,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    reqComment: (daa)=>{
      dispatch(responseComment(daa))
    },
    getResComment: (daa)=>{
      dispatch(responseResComment(daa))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(rating)