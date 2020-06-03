import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { datasEvent } from './dataEvent';
import { Icon } from 'react-native-elements';
import { responseEschedule, responseLogin, responseDeadline, responseDaaCroom,  responseCompensatory, responseResComment, responseChatreal} from '../../actions/action';

import { connect } from 'react-redux';
const { width} = Dimensions.get('window');
class rating extends React.Component {
  constructor(props){
    super(props);
    this.state={
      content='',
    }
  }
  
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  handleMssv = (text) => {
    this.setState({ content: text })
  }

  

  render() {
    return (
      <View style={styles.container}>
        <FlatList  
        data = {this.state.datas.reply}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>(
        <View style={{margin:5}}>
            <View
                style ={styles.RowMargin}>
                    <View>
                        <Text style={styles.TextNameStyle}>{this.state.datas.name}</Text>
                        <Text style={styles.TextCommentStyle}>{this.state.datas.time}</Text>
                    </View>
            </View>
        
            <Text style={{paddingLeft: 20, marginRight: 10}}>{item.comment}</Text>
            <View style={{marginLeft:20}}>
        </View>
        </View>)}
        keyExtractor={item => item.idreply.toString()}
        />  
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
    margin: 3
},
TextCommentStyle:{
    color: '#A9A9A9',
    fontSize:10,
    marginLeft:5
},
TextNameStyle:{
    color: 'black', 
    marginTop: 7,  
    marginLeft: 7,
    fontSize: 15
},
});
const mapStateToProps = state => {
  return {
    resComment: state.resCommentReducers,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    reqComment: (daa)=>{
      dispatch(responseResComment(daa))
    },
    getResComment: (daa)=>{
      dispatch(responseResComment(daa))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(rating)