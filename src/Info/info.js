import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Header } from 'react-native-elements'
import styles from './../Styles/index';

export default class InfoScreen extends React.Component {
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="#FF60A5"
          barStyle="dark-content"
        />
        <Header
          rightComponent={{ 
            icon: 'menu', 
            color: '#000', 
            onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
          }}
          backgroundColor="#fff"
        />
        <Text>Info!</Text>
        <Text>©Daniel Holmberg</Text>
      </View>
    );
  }
}
