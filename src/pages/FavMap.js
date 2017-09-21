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
          <StatusBar
               hidden={true}
             />
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.lat || 0,
              longitude: this.lng || 0,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}
          >
            <MapView.Marker
              coordinate={{latitude: this.lat || 0, longitude: this.lng || 0}}
              title={favorite.name}
              description={'Rating: '+ favorite.rating + ' / 5.00'}
            />
          </MapView>
            <Button
              onPress={() => {
                this.props.navigation.goBack()
              }}
              title='Back'
            />
        </View>
      );
    } else {
      return (
        <View>
          <StatusBar
               hidden={true}
             />
        <Text>Loading...</Text>
        </View>)
    }
  }
}

