import React, { Component } from 'react';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  StatusBar
} from 'react-native';

import App from '../../App'
import {
  TabNavigator, StackNavigator
} from 'react-navigation';
import styles from '../../styles'
import FavMap from './FavMap'

export default class FavoritesLocation extends React.Component {

  render(){
    return(
      <View style={styles.flexFavoritesChild}>
        <StatusBar
               hidden={true}
        />
        <Text style={styles.textChild}>{this.props.name}</Text>
        <Text style={styles.textChild}>{this.props.address}</Text>
        <TouchableHighlight
          style={styles.viewOnMap}
          onPress={() => this.props._onViewMap(this.props.favorite)}>
          <Text style={[styles.textChild, {fontSize: 13}, {color: 'white'}, {marginLeft: 0}]}>View on Map</Text>
        </TouchableHighlight>
      </View>);
  }
}