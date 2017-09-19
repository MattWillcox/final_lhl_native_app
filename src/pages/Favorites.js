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
  Button,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

export default class FavoritesScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Favorites'
  }

  constructor(props){
    super(props)
    this.state = {
      favorites: []
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('token', (err, value) => {
      if (value !== null){
        axios.get("http://10.30.15.75:3000/favorites/all", {
          params: {
            user: value
          }
        })
        .then(result => {
          let userFavorites;
          if(result.data.length > 0) {
            userFavorites = this.state.favorites.concat(result.data);
          } else {
            userFavorites = [];
          }
          this.setState({favorites: userFavorites});
        });
      }
    })
  }

  render(){
    if(this.state.favorites.length > 0){
    let newQuery = '';
    let currQuery = '';
    const favoritesList = this.state.favorites.map((favorite, i) => {
      if(currQuery !== this.state.favorites[i].query) {
        newQuery = favorite.query;
        currQuery = favorite.query;
      } else {
        newQuery = null
      }
      if(newQuery){
        return (
          <View key={i}>
            <Text>{newQuery}</Text>
            <Text>{favorite.name}</Text>
            <Text>{favorite.address}</Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('FavMap', {favorite: favorite})}>
              <Text>View on Map</Text>
            </TouchableHighlight>
          </View>
        )
      } else {
        return(
          <View key={i}>
            <Text>{favorite.name}</Text>
            <Text>{favorite.address}</Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('FavMap', {favorite: favorite})}>
              <Text>View on Map</Text>
            </TouchableHighlight>
          </View>
        )
      }
    })

    return(
      <View>
        {favoritesList}
      </View>
    );
  }
  else{
    return(
      <Text>Loading....</Text>
      )
  }
  }
}

