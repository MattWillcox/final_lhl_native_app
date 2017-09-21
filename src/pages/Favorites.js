import React, { Component } from 'react';
import axios from 'axios';
import {
  TabNavigator,
} from 'react-navigation';
import App from '../../App'
import styles from '../../styles'
import FavoriteLocation from './FavoriteLocation'
import DropdownMenu from 'react-native-dropdown-menu'

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
      favorites: [],
      options: [],
      currQuery: null,
      noFavorites: false
    }

    this._viewOnMap = this._viewOnMap.bind(this);
    this.options = [];
  }

  componentDidMount(){
    AsyncStorage.getItem('token', (err, value) => {
      if (value !== null){
        axios.get("https://nearhere-lhl.herokuapp.com/favorites/all", {
          params: {
            user: value
          }
        })
        .then(result => {
          let userFavorites;
          if(result.data.length > 0) {
            userFavorites = this.state.favorites.concat(result.data);
            this.setState({favorites: userFavorites, currQuery: userFavorites[0].query});
          } else {
            userFavorites = [];
            this.setState({noFavorites: true, favorites: userFavorites, currQuery: ''});
          }
        })
        .catch(error => {
          this.setState({noFavorites: true})
        });
      }
    })
  }

  render(){
    console.log(this.state);
    if(this.state.favorites.length > 0){
      let newQuery = '';
      let queryList = [];
      let queryObj = {};
      const favoritesList = this.state.favorites.forEach((favorite, i) => {
        if(newQuery !== this.state.favorites[i].query) {
          newQuery = favorite.query;
          queryObj[newQuery] = [];
          queryList.push(newQuery);
        }
        queryObj[newQuery].push(
          <FavoriteLocation
            key={i}
            name={favorite.name}
            address={favorite.address}
            favorite={favorite}
            query={favorite.query}
            _onViewMap={this._viewOnMap}
          />
        );
      })

      return(
          <View style={{flex: 1, marginLeft: 30, marginRight: 30, marginTop: 30}} >
            <Text style={{
              color:'steelblue',
              fontSize: 16,
              paddingBottom: 10
            }}>Select a location below...</Text>
            <DropdownMenu style={{height:200}}      //set the arrow icon, default is a triangle    //set the icon of the selected item, default is a check mark
              bgColor={"steelblue"}                            //the background color of the head, default is grey
              tintColor={"white"}                        //the text color of the head, default is white
              selectItemColor={"steelblue"}                    //the text color of the selected item, default is red
              data={[queryList]}
              maxHeight={410}                            // the max height of the menu
              handler={(selection, row) => this._dropdown_onSelect(queryList[row])} >
              <ScrollView>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10}} >
                  {queryObj[this.state.currQuery]}
                </View>
              </ScrollView>
            </DropdownMenu>
          </View>
      );
    }
    if(this.state.noFavorites){
      return(
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color:'steelblue', fontSize: 30}} >No Favorites Saved</Text>
        </View>
      )
    }

    else {
      return(
        <Text>Loading....</Text>
      )
    }
  }
  _dropdown_onSelect(value){
    this.setState({currQuery: value})
  }

  _viewOnMap(favorite){
    this.props.navigation.navigate('FavMap', {favorite: favorite})
  }
}

