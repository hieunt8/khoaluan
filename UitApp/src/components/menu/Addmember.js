import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
// import emails from './Listuser';
import { connect } from 'react-redux';
import { responseCreategroup } from './../../actions/action';
const { width } = Dimensions.get('window');
import callApi from '../../api/ApiCaller';
import * as link from '../../api/ApiLink';
import ratchetTree from './RatchetTrees';

const KEYS_TO_FILTERS = ['mssv', 'subject'];

class Addmember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      listMssv: [this.props.navigation.state.params.Sender],
      emails: [],
      tree: new ratchetTree()
    }
  }
  componentDidMount() {
    this.setState({ tree: this.state.tree.addNode(this.state.listMssv[0]) })
    console.log(this.state.tree)
    callApi(link.getlistuser, 'GET', null).then(res => {
      this.setState({ emails: res.data })
    })
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  selectMember = (item) => {
    if (!this.state.listMssv.includes(item.mssv))
      this.setState({
        listMssv: this.state.listMssv.concat([item.mssv])
      })
  }
  createGroup = () => {
    let listMssvString = this.state.listMssv.toString();
    const data = { groupName: this.props.navigation.state.params.title, listMssv: listMssvString };
    this.props.getCreategroup(data);
    this.props.navigation.navigate('GroupLoading',data);
  }

  render() {
    // console.log("listMssv", this.state.listMssv)
    const filteredEmails = this.state.emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, alignItems: 'center' }}>
          <View style={{ paddingTop: -5 }}>
            <Text>Add members</Text>
          </View>
        </View>
        <View style={styles.AddImgStyles}>
          <View style={styles.ImgStyles}>
            {this.ShowSelectMember()}
          </View>
        </View>
        <SearchInput
          onChangeText={(term) => { this.searchUpdated(term) }}
          style={styles.searchInput}
          placeholder="Type a message to search"
        />
        <ScrollView>
          {filteredEmails.map(email => {
            return (
              <TouchableOpacity onPress={() => {
                this.selectMember(email)
              }} key={email.mssv} style={styles.emailItem}>
                <View>
                  <Text>{email.mssv}</Text>
                  <Text style={styles.emailSubject}>{email.name}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 10, justifyContent: 'flex-end', paddingVertical: 10 }}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Menu'); }}>
            <Text style={{ marginHorizontal: 10, color: 'blue' }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.createGroup} >
            <Text style={{ marginHorizontal: 10, color: 'blue' }}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  onDeleteItem = (index) => {
    // console.log("index", index)
    if (index) {
      let newTaskList = this.state.listMssv.filter((item, i) => i != index);
      this.setState({ listMssv: newTaskList });
    }
  }
  ShowSelectMember() {
    let members = [];
    this.state.listMssv.map((item, index) => {
      members.push(
        <View key={index}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/listMssvs?q=tbn%3AANd9GcSTaXFFSyR_PMavft5Yt1L3p9Dr0Ak1WCQJtRc8q8-7AWJ-WmIr&usqp=CAU' }}
            style={{ width: 40, height: 40, marginLeft: 5, marginRight: 5, borderRadius: 100 }} />
          <TouchableOpacity style={{ marginTop: -55, marginLeft: 40 }}
            onPress={() => this.onDeleteItem(index)}>
            <Text>{`❌`}</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 50, fontSize: 9, color: 'grey', paddingLeft: 5 }}>{item}</Text>
        </View>
      );
    });
    return members;
  }
}

const mapStateToProps = state => {
  return {

  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getCreategroup: (data) => {
      dispatch(responseCreategroup(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Addmember)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  AddImgStyles: {
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 130,
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    marginTop: 20
  },
  ImgStyles: {
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingTop: 20,
  },
});