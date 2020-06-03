import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
// import {responseCreategroup} from './../../actions/action';
class CreateGroup extends React.Component {
    constructor(props){
    super(props);
    this.state={
        title:'',
        mssv:'',
    }
  }
  handleMssv = (text) => {
    this.setState({ mssv: text })
  }
  handleTitle = (text) => {
      this.setState({ title: text })
  }
  LoginSubmit = () => {

        const data = {title: this.state.title, mssv: this.state.mssv} ;
        console.log("Send create group");
        this.props.getCreategroup(data);
        this.props.navigation.navigate('Menu');
      }
  render() {
    return (
      <View style={styles.container}>
        <Text>Tên group</Text>
        <TextInput
          placeholder="Nhập title"
          onChangeText={this.handleTitle}
          value={this.state.title}
          style={styles.inputitle}/>
        <Text style={{marginTop: 10}}>Mssv</Text>
         <View style={styles.listFriend}>
            <TextInput
              multiline = {true}
              editable = {true}
              placeholder="Nhập danh sách mssv"
              value={this.state.mssv}
              onChangeText={this.handleMssv}
            />
          </View>
  

          <TouchableOpacity style={styles.LoginStyles}
                            onPress={ this.LoginSubmit}>
            <Text>Tạo</Text>
         </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
   LoginStyles: {
    height: 40,
    backgroundColor: '#3399FF',
    borderRadius:7,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  inputitle: {
    backgroundColor: 'white', 
    borderRadius: 5, 
    borderColor: 'black', 
    borderWidth: 1, 
    padding: 5
  },
  listFriend:{flex: 1,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: "white",
    borderColor: 'grey',
    marginVertical: 5,
    padding: 5
}
});
const mapStateToProps = state => {
   return{
     
   }
  }
  const mapDispatchToProps = (dispatch, props) => {
    return {
        getCreategroup: (data) => {
        dispatch(responseCreategroup(data));
      }
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)
