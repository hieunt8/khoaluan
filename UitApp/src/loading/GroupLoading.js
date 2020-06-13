import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { responseSchedule, responseDeadline } from '../actions/action';
const { width } = Dimensions.get('window');

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: 'Hello',
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Menu');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{ width: 130, height: 155 }}
          source={require('../../assets/logo/UIT.png')} />
        <View style={styles.indicator}>
          <ActivityIndicator animating={true} size="small" color={'blue'} />
        </View>
        <Text style={{ fontSize: 10, color: '#0033CC', textAlign: "center" }} >{this.state.info}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  indicator: {
    paddingTop: width / 7.2,
    justifyContent: "center",
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    getSchedule: (data) => {
      dispatch(responseSchedule(data));
    },
    getDeadline: (data) => {
      dispatch(responseDeadline(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);