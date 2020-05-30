import React,{Component} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Menu from '../components/menu/menu'
export default class MenuScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Menu navigation={this.props.navigation}/>
            </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
