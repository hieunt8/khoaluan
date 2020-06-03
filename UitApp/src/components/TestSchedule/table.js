import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Table, TableWrapper,Col, Cols, Cell, Row } from 'react-native-table-component';
import {datas} from './data';
import Element from './element'

const s = datas.Size;
const ArrT2=[];
export default class table extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        tableTime: [
          `Tiết  1 (07:30 - 8:15)`, 
          `Tiết  2 (08:15 - 9:00)`, 
          `Tiết  3 (09:00 - 9:45)`, 
          `Tiết  4 (10:00 - 10:45)`, 
          `Tiết  5 (10:45 - 11:30)`,
          `Tiết  6 (13:00 - 13:45)`, 
          `Tiết  7 (13:45 - 14:30)`, 
          `Tiết  8 (14:30-15:15)`, 
          `Tiết  9 (15:30-16:15)`, 
          `Tiết 10 (16:15-17:00)`],
        T2:  ['', '', '', '', '', 'CE101.I21.1 Lý thuyết mạch điện\nC216\nPhan Hoàng Chương 2018-01-15 2018-05-26'],
        T3:  ['', '', '', '', '', '', '', '', '', ''],
        T4:  ['', '', '', '', '', '', '', '', '', ''],
        T5:  ['', '', '', '', '', '', '', '', '', ''],
        T6:  ['', '', '', '', '', '', '', '', '', ''],
        T7:  ['', '', '', '', '', '', '', '', '', ''],
        
      }
    }
    setUpt2 = () => {
      for(i = 0; i < s; i++){
        //if(datas[i].date === '2') ArrT2.push(datas[i].Code + '\n' + datas[i].name + '\n' + datas[i].class + '\n' + datas[i].teacher + '\n' + datas[i].start + '\n' + datas[i].end);
        if(datas[i].date === '2') {
          count = a.length;
          bd =  Number(datas[i].secretion.charAt(0));
          kt = Number(bd) + count - 1;
          for(j=0; j<bd; j++){
            ArrT2.push(datas[i].Code + '\n' + datas[i].name + '\n' + datas[i].class + '\n' + datas[i].teacher + '\n' + datas[i].start + '\n' + datas[i].end)
          }
        }
      }
    }




    render() {
        const state = this.state;
        const timeLab = 60*5;
        const time2=60*2;
        const time3=60*3;
        const TimeSize = 60;
        const T3=[];
        for(j=0; j<10; j++){
          T3.push("");
        }
        return (
              <View style={styles.container}>
                <Table style={{flexDirection: 'row', flex: 1}} borderStyle={{borderWidth: 1, borderColor: 'black'}}> 
                   {/* <Element celldata = {''} data={this.state.tableTime} time = {[TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize]}/>
                  <Element celldata = {'Thứ 2'} data={this.state.T2} time={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, TimeSize * 5]}/>
                  <Element celldata = {'Thứ 3'} data={this.state.T3} time={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, TimeSize * 5]}/>
                  <Element celldata = {'Thứ 4'} data={this.state.T4} time={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, TimeSize * 5]}/>
                  <Element celldata = {'Thứ 5'} data={this.state.T5} time={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, TimeSize * 5]}/>
                  <Element celldata = {'Thứ 6'} data={this.state.T6} time={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, TimeSize * 5]}/>
                  <Element celldata = {'Thứ 7'} data={this.state.T7} time={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, TimeSize * 5]}/> */}

                  <TableWrapper style={{width: 80}}>
                    <Cell data="" style={styles.singleHead}/>
                    <TableWrapper style={{flexDirection: 'row'}}>
                      <Col data={state.tableTime} style={styles.headTime} heightArr={[TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize, TimeSize]} textStyle={styles.text} />
                    </TableWrapper>
                  </TableWrapper>
                 
                  <TableWrapper style={{width: 80}}>
                    <Cell data="Thứ 2" style={styles.singleHead}/>
                    <TableWrapper  style={{flexDirection: 'row'}}>
                      <Col data={state.T2} style={styles.head} heightArr={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, timeLab]} textStyle={styles.text} />
                  </TableWrapper>
                  </TableWrapper>
                  <TableWrapper style={{width: 80}}>
                    <Cell data="Thứ 3" style={styles.singleHead}/>
                    <TableWrapper  style={{flexDirection: 'row'}}>
                      <Col data={T3} style={styles.head} heightArr={[TimeSize, TimeSize,TimeSize,TimeSize,TimeSize, TimeSize, TimeSize, TimeSize,TimeSize, TimeSize]} textStyle={styles.text} />
                  </TableWrapper>
                  </TableWrapper>
                  <TableWrapper style={{width: 80}}>
                    <Cell data="Thứ 4" style={styles.singleHead}/>
                    <TableWrapper  style={{flexDirection: 'row'}}>
                    <Col data={['H1', 'H2']} style={styles.head} heightArr={[420, 180]} textStyle={styles.text} />
                  </TableWrapper>
                  </TableWrapper>
                  <TableWrapper style={{width: 80}}>
                    <Cell data="Thứ 5" style={styles.singleHead}/>
                    <TableWrapper  style={{flexDirection: 'row'}}>
                    <Col data={['H1', 'H2']} style={styles.head} heightArr={[420, 180]} textStyle={styles.text} />
                  </TableWrapper>
                  </TableWrapper>
                  <TableWrapper style={{width: 80}}>
                    <Cell data="Thứ 6" style={styles.singleHead}/>
                    <TableWrapper  style={{flexDirection: 'row'}}>
                    <Col data={['H1', 'H2']} style={styles.head} heightArr={[420, 180]} textStyle={styles.text} />
                  </TableWrapper>
                  </TableWrapper>
                  <TableWrapper style={{width: 80}}>
                    <Cell data="Thứ 7" style={styles.singleHead}/>
                    <TableWrapper  style={{flexDirection: 'row'}}>
                      <Col data={['H1', 'H2', 'Thực hành']} style={styles.head} heightArr={[180, 120, 299]} textStyle={styles.text} />
                  </TableWrapper>
                  </TableWrapper>
                  {/* Right Wrapper */}
                
                 </Table> 
              </View>
        )
      }
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      padding: 16, 
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

