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

export default class FavMapScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      favorite: {}
    }
    this.lat = 1;
    this.long = 1;
  }

  componentDidMount(){
    this.setState({favorite: this.props.navigation.state.params.favorite})
  }


  render(){
    if(this.props.navigation.state.params.favorite){
      const { favorite } = this.state;
      this.lat = favorite.latitude;
      this.lng = favorite.longitude;

      return(
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <View style={{top: 10, alignSelf: 'center', width: 200, position: 'absolute' }}>
            <Button
              onPress={() => {
                this.props.navigation.goBack()
              }}
              title='Back'
            />
          </View>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.lat,
              longitude: this.lng,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}
          >
            <MapView.Marker
              coordinate={{latitude: this.lat, longitude: this.lng}}
              title={favorite.name}
              description={favorite.rating}
            />
          </MapView>
        </View>
      );
    } else {
      return (<Text>Loading...</Text>)
    }
  }
}

