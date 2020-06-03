import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
// import Login from '../components/login/login'
import Login from '../components/login/newlogin'
export default class LoginScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Login navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
