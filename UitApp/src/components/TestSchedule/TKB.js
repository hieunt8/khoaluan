import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell } from 'react-native-table-component';
import PinchZoomView from 'react-native-pinch-zoom-view';
import TableTKB from './table'
 
export default class TKB extends Component {
  constructor(props) {
    super(props);
  }
 
 
  render() {
    return (
      <PinchZoomView>
          <View>
           <TableTKB/>
          </View>
          
      </PinchZoomView>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  singleHead: { 
    width: 80, 
    height: 40, 
    backgroundColor: '#c8e1ff',
    justifyContent: 'center',
  },
  head: {
    flex: 1, 
    backgroundColor: 'white' 
  },
  headTime: {
    flex: 1, 
    backgroundColor: 'white',
    backgroundColor: '#c8e1ff' 
  },
  title: { 
    flex: 2, 
    backgroundColor: '#f6f8fa' 
  },
  titleText: { 
    marginRight: 6, 
    textAlign:'right' },
  text: { 
    textAlign: 'center' 
},
  
});