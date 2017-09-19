import React, { Component } from 'react';
import axios from 'axios';
import {
  TabNavigator,
} from 'react-navigation';
import App from '../../App'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button
} from 'react-native';

export default class FavoritesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Favorites'
  }
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return(
      <View>
        <Text>HELLO WORLD</Text>
      </View>
    );
  }
}

