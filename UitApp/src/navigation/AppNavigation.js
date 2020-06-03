import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './AppNavigator';

export default function AppNavigation(props) {
    return (
      <View style={styles.container}>
        {Platform.OS === 'android' && <StatusBar barStyle='default' />}
        <AppNavigator />
      </View>
    );
  // }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
