import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper,Col, Cell } from 'react-native-table-component';

export default class element extends Component {
    render() {
        return (
              <View>
                <TableWrapper style={{width: 80}}>
                <Cell data={this.props.celldata} style={styles.singleHead}/>
                <TableWrapper style={{flexDirection: 'row'}}>
                    <Col data={this.props.data} style={styles.headTime} heightArr={this.props.time} textStyle={styles.text} />
                </TableWrapper>
                </TableWrapper>
              </View>
        )
      }
}

const styles = StyleSheet.create({
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
      textAlign:'right' 
    },
    text: { 
      textAlign: 'center' 
    },
  });