import React, { Component } from 'react';
import axios from 'axios';
import { MapView } from 'expo';
import App from '../../App'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  AsyncStorage,
  StatusBar
} from 'react-native';

export default class MapScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      dataLoaded: false,
    }

    this.mapCoordinates;
    this.searchQuery;
    this.resultSet;
    this.getGoogleResults = this.getGoogleResults.bind(this);
  }

  componentDidMount(){
    this.getGoogleResults();
  }

  getGoogleResults(){
    AsyncStorage.getItem('token', (err, value) => {
      if (value !== null){
        axios.get("https://nearhere-lhl.herokuapp.com/map", {
          params: {
            user: value
          }
        })
        .then(result => {
          this.mapCoordinates = result.data[0];
          this.searchQuery = result.data[1];
          this.resultSet = result.data[2];
          this.setState({dataLoaded: true});
        })
      }
    });
  }

  render(){
    if(this.state.dataLoaded){
      const lat = this.mapCoordinates[0];
      const lng = this.mapCoordinates[1];
      let count = 0;
      let newResult = [];
      for (let filter in this.resultSet) {
        newResult = newResult.concat(this.resultSet[filter].map((place, i) => {
          count += 1;
          let rating = place.rating || '-1';
          return (
            <MapView.Marker
              coordinate={{latitude: place.geometry.location.lat, longitude: place.geometry.location.lng}}
              title={place.name}
              description={'Rating: '+ place.rating + ' / 5.00'}
              key={count}
            />
          )
        }))
      }

      return(
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <StatusBar
               hidden={true}
             />
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0121,
            }}
          >
          {newResult}
          </MapView>
            <Button
            onPress={() => {
              this.props.navigation.navigate('Home')
            }}
            title='Back'
            />
        </View>
      );
    }
    else{
      return (
        <Text>Loading Map...</Text>
      )
    }
  }
}

