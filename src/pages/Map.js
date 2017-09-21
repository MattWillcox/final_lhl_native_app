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
  AsyncStorage
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
      let filterNum = 0;
      let newResult;
      for (let filter in this.resultSet) {
        filterNum += 1;
        newResult = this.resultSet[filter].map((place, i) => {
          count += 1;
          let rating = place.rating || '-1';
          return (
            <MapView.Marker
              coordinate={{latitude: place.geometry.location.lat, longitude: place.geometry.location.lng}}
              title={place.name}
              description={rating.toString()}
              key={count}
            />
          )
        })
      }

      return(
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('Home')
            }}
            title='Back'
            />
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          {newResult}
          </MapView>
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

