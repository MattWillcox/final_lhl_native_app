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
  }

  componentDidMount(){
    this.setState({favorite: this.props.navigation.state.params.favorite})
  }


  render(){
    if(this.props.navigation.state.params.favorite){
      const { favorite } = this.state;
      const lat = favorite.latitude;
      const lng = favorite.longitude;

      return(
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Button
            onPress={() => {
              this.props.navigation.goBack()
            }}
            title='Back'
            />
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}
          >
            <MapView.Marker
              coordinate={{latitude: lat, longitude: lng}}
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

